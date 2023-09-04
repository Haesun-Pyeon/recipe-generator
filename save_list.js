console.log("정상 연결");

const $mainDiv = document.querySelector("#main-div");
const $answer = document.querySelector("#answer");
const num = parseInt(localStorage.length / 4);
let inputs = [];
let titles = [];
let ingredients = [];
let recipes = [];

//저장값들 불러와서 배열에 저장
for (let i = 0; i < num; i++) {
  const input = localStorage.getItem(i + "input");
  const title = localStorage.getItem(i + "title");
  const ingredient = localStorage.getItem(i + "ingredient");
  const recipe = localStorage.getItem(i + "recipe");

  inputs.push(input);
  titles.push(title);
  ingredients.push(ingredient);
  recipes.push(recipe);
}

//저장된 항목이 있을 때
if (inputs.length !== 0) {
  const $none = document.getElementById("none");
  $none.setAttribute("style", "display:none;");
}

//목록테이블에 추가하기
const $tbody = document.querySelector("tbody");
for (let i = 0; i < num; i++) {
  const $tr = document.createElement("tr");
  $tr.setAttribute("class", "click-tr");
  $tr.setAttribute("id", i);
  $tr.addEventListener("click", (event) => showContent(event, i));
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

import { makeRecipeHTML } from "./makeRecipe.js";

//행 클릭시 레시피 내용 보여주기
function showContent(event, i) {
  makeRecipeHTML(titles[i], ingredients[i], recipes[i], $answer, false);
  $mainDiv.setAttribute("style", "display:none;");
  $answer.setAttribute("style", "display:flex;");
}

//전체삭제버튼
const $deleteAll = document.querySelector(".delete-all");
$deleteAll.onclick = () => {
  localStorage.clear();
  alert("전체 삭제되었습니다.");
  location.reload();
};
