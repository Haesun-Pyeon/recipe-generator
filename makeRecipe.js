console.log("레시피창 띄워주기");

//레시피 창 띄워주는 함수
//main에서 추천받은 결과 내용 볼 때, 불러오기에서 저장된 내용 볼 때 사용
function makeRecipeHTML(title, ingredient, recipe, $answer) {
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
  // $saveBtn.onclick = saveResult(title, ingredient, recipe); 자동으로눌림
  // $saveBtn.setAttribute("onclick", `saveResult("${title}", "${ingredient}", "${recipe}");`); 함수정의안됐다고 오류
  $saveBtn.innerText = "저장하기";

  const $retryBtn = document.createElement("button");
  $retryBtn.setAttribute("type", "button");
  $retryBtn.setAttribute("onclick", "location.reload()");
  $retryBtn.innerText = "다시하기";

  $buttons.appendChild($saveBtn);
  $buttons.appendChild($retryBtn);
}

//저장버튼 -> 로컬스토리지에 결과 저장
function saveResult(title, ingredient, recipe) {
  const $textarea = document.querySelector("textarea");
  const i = parseInt(localStorage.length / 4);
  localStorage.setItem(i + "input", $textarea.value);
  localStorage.setItem(i + "title", title);
  localStorage.setItem(i + "ingredient", ingredient);
  localStorage.setItem(i + "recipe", recipe);
  alert("저장되었습니다.");
}

export { makeRecipeHTML };
