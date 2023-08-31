console.log("연결완료");

const $textarea = document.querySelector("textarea");
const $tools = document.getElementsByName("tools");
const $radios = document.getElementsByName("add-more");
const $button = document.querySelector("[type='submit']");

const $loading = document.querySelector("#loading");
const $formDiv = document.querySelector("#form-div");
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

  $formDiv.setAttribute("style", "display:none;");
  $answer.setAttribute("style", "display:none;");
  $loading.setAttribute("style", "display:block;");

  let result = await chatGPTAPI();

  result = result.replaceAll("\n", "<br>");
  localStorage.setItem("result", result);

  let [title, ingredient, recipe] = result.split("<br><br>", 3);
  if (title.indexOf(":") !== -1) {
    title = title.split(": ")[1];
  }
  ingredient = ingredient.split("재료:")[1];
  recipe = recipe.split("1. ")[1];
  makeRecipeHTML(title, ingredient, recipe);
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
  let content = `${ingredients}을/를 이용한 요리의 레시피를 한 가지 알려줘. `;
  selects.forEach((select) => {
    if (selects.length === 1) {
      content += "가열할 수 있는 기구는 없어. ";
    } else if (select !== "true" && select !== "false") {
      content += select + ", ";
    } else {
      content = content.slice(0, -2);
      content += "만을 사용할 수 있어. ";
    }
    if (select === "false") {
      content += "추가재료는 안들어갔으면 좋겠어.";
    }
  });
  content += "레피시명, 재료, 요리방법 순서로 알려주고 다른 말은 하지 말아줘.";
  return content;
  // ex) 토마토, 양파, 소세지을/를 이용한 요리의 레시피를 한 가지 알려줘. 전자레인지, 에어프라이어만을 사용할 수 있어. 추가재료는 안들어갔으면 좋겠어. 레피시명, 재료, 요리방법 순서로 알려주고 다른 말은 하지 말아줘.
}

//챗GPT와 통신하여 값 받아오기
async function chatGPTAPI() {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    redirect: "follow",
  });
  const json = await res.json();
  console.log(json);
  const result = json.choices[0].message.content;
  return result;
}

//받아온 값으로 html 만들어주기
function makeRecipeHTML(title, ingredient, recipe) {
  const $img = document.createElement("img");
  $img.src = "./default.jpg";
  $img.alt = "음식사진";

  const $contents = document.createElement("div");
  $contents.setAttribute("class", "contents");

  const $buttons = document.createElement("div");
  $buttons.setAttribute("class", "buttons");

  $answer.appendChild($img);
  $answer.appendChild($contents);
  $answer.appendChild($buttons);

  const $title = document.createElement("h2");
  $title.innerText = title;

  const $ingredient = document.createElement("div");
  $ingredient.setAttribute("class", "ingredient");
  $ingredient.innerHTML += "<h3>필요한 재료</h3>";
  ingredient = ingredient.replace("<br>", "");
  ingredient = ingredient.replaceAll("<br>", ", ");
  ingredient = ingredient.replaceAll("-", "");
  $ingredient.innerHTML += `<p>${ingredient}</p>`;

  const $recipe = document.createElement("div");
  $recipe.setAttribute("class", "recipe");
  $recipe.innerHTML += "<h3>만드는 방법</h3>";
  recipe = recipe.replace("<br>", "");
  recipe = recipe.replaceAll("<br>", "</li><li>");
  recipe = "<li>" + recipe + "</li>";
  recipe = recipe.replace(/\d{1,2}. /g, "");
  $recipe.innerHTML += `<ol>${recipe}</ol>`;

  $contents.appendChild($title);
  $contents.appendChild($ingredient);
  $contents.appendChild($recipe);

  const $saveBtn = document.createElement("button");
  $saveBtn.setAttribute("type", "button");
  $saveBtn.setAttribute("onclick", 'alert("저장되었습니다.");');
  $saveBtn.innerText = "저장하기";

  const $retryBtn = document.createElement("button");
  $retryBtn.setAttribute("type", "button");
  $retryBtn.setAttribute("onclick", "location.reload()");
  $retryBtn.innerText = "다시하기";

  $buttons.appendChild($saveBtn);
  $buttons.appendChild($retryBtn);
}
