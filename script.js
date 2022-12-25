let responsAsJson;
let firstLetterList = [];

async function init(responsAsJson) {
  renderBundesländer(responsAsJson);
  cutFirstLetter();
  renderFirstLetterButton();
}

async function getBundesland() {
  let source = "bundesland.json";
  let respons = await fetch(source);
  responsAsJson = await respons.json();
  init(responsAsJson);
}

function renderBundesländer(respons) {
  let listHTML = document.getElementById("list");
  let list = respons;
  listHTML.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    listHTML.innerHTML += `<div class="bundeslandbox" onclick="location.href='${element["url"]}'">
        <div class="url d-none" id="box_nr_${i}" ></div>
        <p class="bundesland">${element["name"]}</p>
        <p class="population">${element["population"]} Miliionen</p>
      </div>`;
  }
}

function cutFirstLetter() {
  for (let i = 0; i < responsAsJson.length; i++) {
    const bundesland = responsAsJson[i]["name"];
    let firstLetter = bundesland.charAt(0);
    if (firstLetterList.indexOf(firstLetter) == -1) {
      firstLetterList.push(firstLetter);
    }
  }
}

function renderFirstLetterButton() {
  let buttons = document.getElementById("buttons");
  buttons.innerHTML = "";

  for (let i = 0; i < firstLetterList.length; i++) {
    const firstLetter = firstLetterList[i];

    buttons.innerHTML += `<div class="buttons"  onclick="withJust(${i})">
        <div class="buttonbox">
          <p id="letter${i}" class="button">${firstLetter}</p>
        </div>          
      </div>`;
  }
  editAll();
}

function editAll() {
  document.getElementById(
    "buttons"
  ).innerHTML += `<div class="buttons"  onclick="emulat()">
        <div class="buttonbox">
          <p class="button">All</p>
        </div>          
      </div>`;
}

function showUrl(id) {
  let box = document.getElementById(`box_nr_${id}`);
  box.classList.remove("d-none");
}

function closeUrl(id) {
  let box = document.getElementById(`box_nr_${id}`);
  box.classList.add("d-none");
}

function withJust(position) {
  let newList = [];
  letter = document.getElementById(`letter${position}`).innerHTML;

  for (let i = 0; i < responsAsJson.length; i++) {
    const element = responsAsJson[i]["name"];
    searchedLetter = element.charAt(0);
    if (searchedLetter == letter) {
      newList.push(responsAsJson[i]);
    }
  }
  renderBundesländer(newList);
}

function emulat() {
  init(responsAsJson);
}
