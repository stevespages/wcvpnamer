function displaySuggestions(suggestionsTaxonAndNumber) {
  
/*
 * A variable, taxon is assigned suggestionsTaxonAndNumber.taxon.
 * This is the taxon rank (genus, species or infraspecies) that was
 * searched for. taxon is used to create a span element class
 * attribute for returned results. For this case span.innerHTML = 
 * suggestion[taxon].
 *
 * Note that the taxon and number properties of the 
 * suggestionsTaxonAndNumber object are required because if
 * there were more than 40 matches the suggestions property will
 * not be sent from the Ajax PHP handler. In this case the taxon
 * and number properties are the only source of information
 * for populating the P element's (#sugg-summary-p) innerHTML.
 *
 * Note that for results where taxonomic_status = "Synonym"
 * or "Homotypic_Synonym", a second span element is created.
 * This span has the additional class value of "accepted_name".
 * Note that this span's innerHTML = suggestion.accepted_name
 */

  const taxon = suggestionsTaxonAndNumber.taxon;
  const number = suggestionsTaxonAndNumber.number;

  const suggSummaryP = document.querySelector("#sugg-summary-p");
  const suggUl = document.querySelector("#sugg-ul");
  suggUl.innerHTML = "";
  suggSummaryP.innerHTML = number;

  if(taxon === "genus"){
    if(number === 1){
      suggSummaryP.innerHTML += " genus matches";
    } else {
      suggSummaryP.innerHTML += " genuses match";
    }
  }
  if(taxon === "species"){
    if(number === 1){
      suggSummaryP.innerHTML += " species matches";
    } else {
      suggSummaryP.innerHTML += " species match";
    }
  }
  if(taxon === "infraspecies"){
    if(number === 1){
      suggSummaryP.innerHTML += " infraspecies matches";
    } else {
      suggSummaryP.innerHTML += " infraspecies match";
    }
  }
  function createTaxStatClassName(taxStat){
    if(taxStat === "Accepted"){
      return "accepted";
    }
    if(taxStat === "Synonym"){
      return "synonym";
    }
    if(taxStat === "Artificial Hybrid"){
      return "artificial_hybrid";
    }
    if(taxStat === "Homotypic_Synonym"){
      return "homotypic_synonym";
    }
    if(taxStat === "Unplaced"){
      return "unplaced";
    }
  }
  
  if(typeof suggestionsTaxonAndNumber.suggestions !== "undefined"){
    const suggestions = suggestionsTaxonAndNumber.suggestions;

 
    function displaySuggestions(suggestion){
    
      let li = document.createElement("li");
      let span = document.createElement("span");
      span.classList.add("taxon-name");
      span.classList.add("one");
      span.setAttribute("data-kew-id", suggestion.kew_id);
      span.setAttribute("data-tax-name", suggestion.taxon_name);
      span.setAttribute("data-tax-stat", createTaxStatClassName(suggestion.taxonomic_status));
      span.setAttribute("data-tax-rank", suggestion.rank);
      span.setAttribute("data-family", suggestion.family);
      span.setAttribute("data-genus", suggestion.genus);
      span.setAttribute("data-species", suggestion.species);
      span.setAttribute("data-infraspecies", suggestion.infraspecies);
      span.innerHTML = suggestion[taxon];
      li.appendChild(span);
      let spanNoIfs = document.createElement("span");
      if(suggestion.no_ifs_acc){
        let spanNoIfsAcc = document.createElement("span");
        spanNoIfsAcc.classList.add("no-ifs-acc");
        spanNoIfsAcc.innerHTML = suggestion.no_ifs_acc;
        spanNoIfs.appendChild(spanNoIfsAcc);
      }
      if(suggestion.no_ifs_art_hyb){
        let spanNoIfsArtHyb = document.createElement("span");
        spanNoIfsArtHyb.classList.add("no-ifs-art-hyb");
        spanNoIfsArtHyb.innerHTML = suggestion.no_ifs_acc;
        spanNoIfs.appendChild(spanNoIfsArtHyb);
      }
      if(suggestion.no_ifs_syn){
        let spanNoIfsSyn = document.createElement("span");
        spanNoIfsSyn.classList.add("no-ifs-syn");
        spanNoIfsSyn.innerHTML = suggestion.no_ifs_syn;
        spanNoIfs.appendChild(spanNoIfsSyn);
      }
      if(suggestion.no_ifs_h_syn){
        let spanNoIfsHSyn = document.createElement("span");
        spanNoIfsHSyn.classList.add("no-ifs-h-syn");
        spanNoIfsHSyn.innerHTML = suggestion.no_ifs_h_syn;
        spanNoIfs.appendChild(spanNoIfsHSyn);
      }
      if(suggestion.no_ifs_unp){
        let spanNoIfsUnp = document.createElement("span");
        spanNoIfsUnp.classList.add("no-ifs-unp");
        spanNoIfsUnp.innerHTML = suggestion.no_ifs_unp;
        spanNoIfs.appendChild(spanNoIfsUnp);
      }
      li.appendChild(spanNoIfs);
      if(suggestion.taxonomic_status !== "Accepted"
        && suggestion.taxonomic_status !== "Artificial Hybrid"
        && suggestion.taxonomic_status !== "Unplaced"){
        let span2 = document.createElement("span");
        span2.classList.add("taxon-name");
        span2.classList.add("two");
        span2.setAttribute("data-kew-id", suggestion.accepted_kew_id);
        span2.setAttribute("data-tax-name", suggestion.accepted_name);
        span2.setAttribute("data-tax-stat", createTaxStatClassName(suggestion.acc_tax_stat));
        span2.setAttribute("data-tax-rank", suggestion.acc_tax_rank);
        span2.setAttribute("data-family", suggestion.acc_family);
        span2.setAttribute("data-genus", suggestion.acc_genus);
        span2.setAttribute("data-species", suggestion.acc_species);
        span2.setAttribute("data-infraspecies", suggestion.acc_infraspecies);
        span2.innerHTML = suggestion.accepted_name;
        li.appendChild(span2);
      }
      suggUl.appendChild(li);
    }

    suggestions.forEach(displaySuggestions); 

  }
}

export default displaySuggestions;

