import { makeRecipeHTML } from "./makeRecipe.js";
console.log("정상 연결");

//저장된 항목이 있을 때
if (localStorage.length !== 0) {
  const $mainDiv = document.querySelector("#main-div");
  const $answer = document.querySelector("#answer");
  const inputs = JSON.parse(localStorage["input"]);
  const titles = JSON.parse(localStorage["title"]);
  const ingredients = JSON.parse(localStorage["ingredient"]);
  const recipes = JSON.parse(localStorage["recipe"]);

  const $none = document.getElementById("none");
  $none.setAttribute("style", "display:none;");

  //목록테이블에 추가하기
  const $tbody = document.querySelector("tbody");
  for (let i = 0; i < inputs.length; i++) {
    const $tr = document.createElement("tr");
    $tr.setAttribute("class", "click-tr");

    //행 클릭 시 레시피 내용 보여주기
    $tr.addEventListener("click", (event) => {
      makeRecipeHTML(titles[i], ingredients[i], recipes[i], $answer, false);
      $mainDiv.setAttribute("style", "display:none;");
      $answer.setAttribute("style", "display:flex;");
      const $delBtn = document.getElementById("del");
      $delBtn.setAttribute("onclick", `deleteResult(${i});`);
    });

    $tbody.appendChild($tr);
    const $td1 = document.createElement("td");
    $td1.innerText = i + 1;
    const $td2 = document.createElement("td");
    $td2.setAttribute("class", "tal");
    $td2.innerText = inputs[i];
    const $td3 = document.createElement("td");
    $td3.setAttribute("class", "tal");
    $td3.innerText = titles[i];
    $tr.appendChild($td1);
    $tr.appendChild($td2);
    $tr.appendChild($td3);
  }
}

//전체삭제버튼
const $deleteAll = document.querySelector(".delete-all");
$deleteAll.onclick = () => {
  localStorage.clear();
  alert("전체 삭제되었습니다.");
  location.reload();
};
