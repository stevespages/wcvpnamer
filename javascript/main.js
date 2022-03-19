// main.js

import search from "./modules/search.js";

import getSuggestions from "./modules/get-suggestions.js";

import displaySuggestions from "./modules/display-suggestions.js";

import showTaxonMenu from "./modules/show-taxon-menu.js";

import returnTaxon from "./modules/return-taxon.js";

import switchTaxon from "./modules/switch-taxon.js";

import openMenu from "./modules/open-menu.js";

const suggUl = document.querySelector("#sugg-ul");

const menu = document.querySelector("#menu");

// const newSearchBtn = document.querySelector("#new-search-btn");

search.input.setAttribute("placeholder", search.placeholder());

search.input.focus();

// newSearchBtn.addEventListener("click", function(){
//   location.reload();
// });

// Do an initial search. Values of search object's properties should
// all be as they were initially assigned in .../modules/search.js.
getSuggestions(search, displaySuggestions);

search.input.addEventListener("input", function(){
  getSuggestions(search, displaySuggestions);
});

suggUl.addEventListener("click", function(event){
  if(event.target.classList.contains("taxon-name")){
  showTaxonMenu(event);
  }
  if(event.target.classList.contains("return")){
    returnTaxon(event);
  }
  if(event.target.classList.contains("switch")){
    switchTaxon(event, search, getSuggestions, displaySuggestions);
  }
});

menu.addEventListener("click", function(){
  openMenu();
});
