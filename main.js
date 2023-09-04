console.log("연결완료");

import { makeRecipeHTML } from "./makeRecipe.js";

const $textarea = document.querySelector("textarea");
const $tools = document.getElementsByName("tools");
const $radios = document.getElementsByName("add-more");
const $button = document.querySelector("[type='submit']");

const $loading = document.querySelector("#loading");
const $mainDiv = document.querySelector("#main-div");
const $answer = document.querySelector("#answer");

const data = [];
data.push({
  role: "system",
  content: "assistant는 여러가지 요리 레시피에 대해 잘 아는 요리사입니다.",
});
const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

$button.addEventListener("click", async function (e) {
  e.preventDefault();
  let selects = []; //체크박스, 라디오버튼 체크된 내용이 담길 예정
  getCheckedValue($tools, selects);
  getCheckedValue($radios, selects);
  const contents = makeContents($textarea.value, selects);
  console.log(contents);

  data.push({
    role: "user",
    content: contents,
  });

  $mainDiv.setAttribute("style", "display:none;");
  $loading.setAttribute("style", "display:block;");

  let result = await chatGPTAPI();
  result = result.replaceAll("\n", "<br>");
  console.log(result);

  //데이터정제과정//
  let [title, ingredient] = result.split("재료:");

  if (title.indexOf(":") !== -1) {
    title = title.split(": ")[1];
  }
  title = title.replaceAll("<br>", "");

  let recipe;
  [ingredient, recipe] = ingredient.split("요리방법:<br>");

  if (ingredient.includes("<br>-")) {
    ingredient = ingredient.replace("<br>-", "");
    ingredient = ingredient.replaceAll("<br>-", ", ");
  }
  if (ingredient.includes("<br><br>")) {
    ingredient = ingredient.replace("<br><br>", "");
  }

  if (recipe.includes("<br><br>")) {
    recipe = recipe.split("<br><br>")[0];
  }
  if ("<br>" === recipe.slice(0, 4)) {
    recipe = recipe.replace("<br>", "");
  }
  recipe = recipe.replaceAll("<br>", "</li><li>");
  recipe = recipe.replace(/\d{1,3}. /g, "");

  makeRecipeHTML(title, ingredient, recipe, $answer, true);
  $loading.setAttribute("style", "display:none;");
  $answer.setAttribute("style", "display:flex;");
});

// 체크박스와 라디오버튼의 체크된 값 가져오는 함수
function getCheckedValue(inputs, resultArr) {
  inputs.forEach((input) => {
    if (input.checked) {
      resultArr.push(input.defaultValue);
    }
  });
}

//챗GPT에 질문할 내용을 만들어주는 함수
function makeContents(ingredients, selects) {
  let content = `${ingredients}을/를 이용한 요리의 레시피를 한 가지 알려줘. 가열할 수 있는 기구는 `;
  selects.forEach((select) => {
    if (selects.length === 1) {
      //라디오버튼값만 있음
      content += "없어. ";
    } else if (select !== "true" && select !== "false") {
      //체크박스 선택한 내용
      content += select + ", ";
    } else {
      content = content.slice(0, -2);
      content += "만 있어. ";
    }
    if (select === "false") {
      content += "추가재료는 안들어갔으면 좋겠어. ";
    }
  });
  content += "레피시명:, 재료:, 요리방법: 순서로 알려주고 다른 말은 하지 말아줘.";
  return content;
  // ex) 감자, 대파, 버섯, 소세지, 밥을/를 이용한 요리의 레시피를 한 가지 알려줘. 가열할 수 있는 기구는 가스레인지, 에어프라이어만 있어. 추가재료는 안들어갔으면 좋겠어. 레피시명:, 재료:, 요리방법: 순서로 알려주고 다른 말은 하지 말아줘.
}

//챗GPT와 통신하여 값 받아오기
async function chatGPTAPI() {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    });
    const json = await response.json();
    console.log(json);
    const result = json.choices[0].message.content;
    return result;
  } catch {
    alert("잠시 후 다시 시도해 주십시오.");
  }
}
