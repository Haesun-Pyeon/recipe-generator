console.log("레시피창 띄워주기");

//레시피 창 띄워주는 함수
//main에서 추천받은 결과 내용 볼 때(tf===true)와,
//불러오기에서 저장된 내용 볼 때(tf===false) 호출됨
function makeRecipeHTML(title, ingredient, recipe, $answer, tf) {
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

  //파라미터가 처음 받아온 추천결과일 때 데이터 정제
  if (tf === true) {
    ingredient = ingredient.replace("<br>", "");
    ingredient = ingredient.replaceAll("<br>", ", ");
    ingredient = ingredient.replaceAll("-", "");

    recipe = recipe.replaceAll("<br>", "</li><li>");
    recipe = recipe.replace(/\d{1,3}. /g, "");
  }

  const $ingredient = document.createElement("div");
  $ingredient.setAttribute("class", "ingredient");
  $ingredient.innerHTML += "<h3>필요한 재료</h3>";
  $ingredient.innerHTML += `<p>${ingredient}</p>`;

  const $recipe = document.createElement("div");
  $recipe.setAttribute("class", "recipe");
  $recipe.innerHTML += "<h3>만드는 방법</h3>";
  $recipe.innerHTML += `<ol><li>${recipe}</ol></li>`;

  $contents.appendChild($title);
  $contents.appendChild($ingredient);
  $contents.appendChild($recipe);

  //메인에서 추천받은 레시피 -> 저장하기/다시하기
  //저장했던 레시피 목록에서 조회-> 삭제하기/돌아가기
  const $btn1 = document.createElement("button");
  $btn1.setAttribute("type", "button");
  const $btn2 = document.createElement("button");
  $btn2.setAttribute("type", "button");
  $btn2.setAttribute("onclick", "location.reload()");

  if (tf === true) {
    $btn1.innerText = "저장하기";
    $btn1.setAttribute("onclick", `saveResult("${title}", "${ingredient}", "${recipe}");`);
    $btn2.innerText = "다시하기";
  } else {
    $btn1.innerText = "삭제하기";
    $btn1.setAttribute("onclick", `deleteResult("${title}", "${ingredient}", "${recipe}");`);
    $btn2.innerText = "돌아가기";
  }
  $buttons.appendChild($btn1);
  $buttons.appendChild($btn2);
}

export { makeRecipeHTML };
