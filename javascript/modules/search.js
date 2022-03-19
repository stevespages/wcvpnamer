// search.js

const input = document.querySelector("#search-input");

const search = {
  input: input,
  genus: 0,
  species: 0,
  placeholder: function(){
    if(this.genus === 0 && this.species === 0){
      return "Genus";
    }
    if(this.genus !== 0 && this.species === 0){
      return "species";
    }
    if(this.genus !== 0 && this.species !== 0){
      return "infraspecies";
    }
  },
}

export default search;
