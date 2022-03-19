// get-suggestions.js

function getSuggestions(search, displaySuggestions) {
  if(getSuggestionsXhr){
    getSuggestionsXhr.abort();
  }
  var getSuggestionsXhr = new XMLHttpRequest();
  getSuggestionsXhr.open(
    "GET",
    "./php/ajax.php?"
      + "calling-function=get-suggestions"
      + "&genus=" + search.genus
      + "&species=" + search.species
      + "&q=" + search.input.value,
    true
  );
  getSuggestionsXhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  getSuggestionsXhr.onreadystatechange = function(){
    if(getSuggestionsXhr.readyState == 4 && getSuggestionsXhr.status == 200){
      var result = getSuggestionsXhr.responseText;
      console.log(result);
      var suggestionsTaxonAndNumber = JSON.parse(result);
      getSuggestionsXhr = false;
      console.log(suggestionsTaxonAndNumber);
      displaySuggestions(suggestionsTaxonAndNumber);
    }
  }
  getSuggestionsXhr.send();
}

export default getSuggestions;
