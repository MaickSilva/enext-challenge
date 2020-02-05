"use strict";function getAllBreeds(){fetch("https://dog.ceo/api/breeds/list/all").then(function(e){return e.json()}).then(function(e){return populateOptions(e.message)})}function populateOptions(e){var t=Object.keys(e).map(function(e){return"<option data-breed='".concat(e,"' value='").concat(e,"'>").concat(e,"</option>")}).join("");document.getElementById("select-breeds").innerHTML=t,getDatalStorage(),getBreed()}function getBreed(){var t=dogList.options[dogList.selectedIndex].value,e="https://dog.ceo/api/breed/".concat(t,"/images/random");fetch(e).then(function(e){return e.json()}).then(function(e){return createGrid(e.message,t.toUpperCase())})}function createGrid(e,t){var a=document.querySelector("#card-wrapper .card"),o="\n    <div class='card__header'>\n      <span>".concat(t,"</span>\n    </div>\n    <div class='card__box'>\n      <div class='card__image'>\n        <img src='").concat(e,"' alt='").concat(t,"' class='image'/>\n        <span class='image__overlay'>").concat(t,"</span>\n        <div class='card__overlay'></div>\n      </div>\n    </div>\n  ");a.innerHTML=o,setOptionsStorage()}var dogList=document.getElementById("select-breeds"),colorSelect=document.querySelector("#select-color"),fontSelect=document.querySelector("#select-font"),btnSalvar=document.querySelector(".preferencias__btn");function changeOptionsWebsite(){var e=document.querySelector("#card-wrapper .card__image .image__overlay"),t=this.options[this.selectedIndex].value;"select-color"===this.id?e.style.color=t:e.style.fontFamily=t}function setDataStorage(){var e=colorSelect.options[colorSelect.selectedIndex].value,t=fontSelect.options[fontSelect.selectedIndex].value,a=dogList.options[dogList.selectedIndex].value;localStorage.setItem("Color",e),localStorage.setItem("Fonte",t),localStorage.setItem("Raça",a),localStorage.setItem("Data atual",getTimeCurrent())}function getDatalStorage(){var e=localStorage.getItem("Raça"),t=localStorage.getItem("Color"),a=localStorage.getItem("Fonte");localStorage.getItem("Raça")&&(document.querySelector("[data-breed='".concat(e,"']")).selected="true"),localStorage.getItem("Color")&&(document.querySelector("[data-color='".concat(t,"']")).selected="true"),localStorage.getItem("Fonte")&&(document.querySelector("[data-font='".concat(a,"']")).selected="true")}function setOptionsStorage(){var e=document.querySelector("#card-wrapper .card__image .image__overlay");e.style.color=localStorage.getItem("Color"),e.style.fontFamily=localStorage.getItem("Fonte")}function getTimeCurrent(){var e=new Date;return e.getDate()+"/"+(e.getMonth()+1)+"/"+e.getFullYear()+" "+e.getHours()+":"+e.getMinutes()}function saveMsg(){var e=document.querySelector(".preferencias .toast");setTimeout(function(){btnSalvar.classList.add("animate-circle")},300),setTimeout(function(){btnSalvar.classList.remove("animate-circle"),e.classList.add("show")},2e3),setTimeout(function(){e.classList.remove("show")},5e3)}window.addEventListener("load",getAllBreeds),fontSelect.addEventListener("load",changeOptionsWebsite),dogList.addEventListener("change",getBreed),colorSelect.addEventListener("change",changeOptionsWebsite),fontSelect.addEventListener("change",changeOptionsWebsite),btnSalvar.addEventListener("click",setDataStorage),btnSalvar.addEventListener("click",saveMsg);