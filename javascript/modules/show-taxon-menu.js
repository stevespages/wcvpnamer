/*
 * Return should be available for all names.
 * Switch should be available for genus and species names but not infraspecies.
 * Switch should not be available for Synonym, Homotypic_Synonym or Unplaced
 */
function showTaxonMenu(event){
  console.log("switch event: ", event);
  let eventTargetTaxonOptions = event.target.getElementsByClassName("taxon-option");
  if(eventTargetTaxonOptions.length === 0){
    var isEventTargetDisplayingMenu = "no";
  } else {
    var isEventTargetDisplayingMenu = "yes";
  }
  let allTaxonOptions = document.getElementsByClassName("taxon-option");
  while(allTaxonOptions.length){
    allTaxonOptions[0].parentElement.removeChild(allTaxonOptions[0]);
  }
  if(isEventTargetDisplayingMenu === "yes"){
    return;
  }
  const returnBtn = document.createElement("button");
  returnBtn.innerHTML = "Return";
  returnBtn.classList.add("taxon-option", "return");
  event.target.appendChild(returnBtn);
  console.log("event.target.dataset.taxStat", event.target.dataset.taxStat);
  console.log("event.target.dataset.taxRank", event.target.dataset.taxRank);
  if((event.target.dataset.taxStat === "accepted" || event.target.dataset.taxStat === "artificial_hybrid") && event.target.dataset.taxRank !== "SUBSPECIES"){
    const switchBtn = document.createElement("button");
    switchBtn.innerHTML = "Switch";
    switchBtn.classList.add("taxon-option", "switch");
    event.target.appendChild(switchBtn);
  }
}

export default showTaxonMenu;
