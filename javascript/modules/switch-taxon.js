/*
 * 1. Update search.genus and search.species with the values
 * in data-genus and data-species. Note that data-genus should
 * have a value while data-species may or may not. If data-species
 * does not have a value then search.species should be assigned
 * to 0. This is important for PHP Ajax handler.
 *
 * 2. Update the placeholder (must be AFTER 1.) using:
 * search.input.setAttribute("placeholder", search.placeholder());
 *
 * 3. Run getSuggestions(search, displaySuggestions);
 */

function switchTaxon(event, search, getSuggestions, displaySuggestions){
  // consider copying search object or bits of it for going back
  console.log("switchTaxon event: ", event);
  console.log("beginning search: ", search); 
  if(event.target.parentElement.dataset.genus){
    search.genus = event.target.parentElement.dataset.genus;
    console.log("genus seems to have a value");
  } else {
    console.log("genus does not seem to have a value");
    search.genus = 0;
  }
  if(event.target.parentElement.dataset.species){
    console.log("species seems to have a value");
    search.species = event.target.parentElement.dataset.species;
  } else {
    console.log("species does not seem to have a value");
    search.species = 0;
  }
  search.input.setAttribute("placeholder", search.placeholder());
  search.input.value = "";
  search.input.focus();
  const familySpan = document.querySelector("#family-span");
  const genusSpan = document.querySelector("#genus-span");
  const speciesSpan = document.querySelector("#species-span");
  familySpan.innerHTML = event.target.parentElement.dataset.family + ",";
  genusSpan.innerHTML = event.target.parentElement.dataset.genus;
  speciesSpan.innerHTML = event.target.parentElement.dataset.species;
  getSuggestions(search, displaySuggestions);
  console.log("end search: ", search);
}

export default switchTaxon;

