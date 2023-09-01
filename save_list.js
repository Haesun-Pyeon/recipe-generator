console.log("정상 연결");

const num = parseInt(localStorage.length / 4);
let inputs = [];
let titles = [];
let ingredients = [];
let recipes = [];

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
  $tr.setAttribute("onclick", "location.href='./js_recipe.html';"); //함수로 변경예정
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

const $answer = document.querySelector("#answer");
//불러오기로 들어간 페이지에서는 저장하기 다시하기 버튼을 없애고 거기에 삭제하기/돌아가기 버튼 만들기
import { makeRecipeHTML } from "./makeRecipe.js";
makeRecipeHTML(titles[0], ingredients[0], recipes[0], $answer, false);
$answer.setAttribute("style", "display:flex;");
