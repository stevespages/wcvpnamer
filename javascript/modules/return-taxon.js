function returnTaxon(event){



  const params = new URLSearchParams(window.location.search);

  const unvalidatedMyurl = (params.get("myurl"));

  function validateUrl(url){
    try{
      let validUrl = new URL(url);
      return validUrl;
    } catch {
      return false;
    }
  }

  const myurl = validateUrl(unvalidatedMyurl);

  console.log("myurl: ", myurl);

  console.log("event: ", event);

  let kewId = event.target.parentElement.dataset.kewId;
  console.log("kewId: ", kewId);
  const formD = document.querySelector("#form-d");
  formD.setAttribute("style", "display:none");
  const suggD = document.querySelector("#sugg-d");
  suggD.setAttribute("style", "display:none");
  const returnD = document.querySelector("#return-d");
  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("id", "close-btn");
  closeBtn.innerHTML = "Close";
  returnD.appendChild(closeBtn);
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "./php/ajax.php?"
        + "calling-function=return-taxon"
        + "&kew-id=" + kewId,
        true
      );
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
          var result = xhr.responseText;
          var taxon = JSON.parse(result);
          let h2 = document.createElement("h2");
          h2.innerHTML = taxon.taxon_name;
          returnD.appendChild(h2)
          let outerDiv = document.createElement("div");
          for(var key in taxon){
            let div = document.createElement("div");
            let input = document.createElement("input");
            let label = document.createElement("label");
            label.innerHTML = key + ": " + taxon[key];
            input.setAttribute("type", "checkbox");
            input.setAttribute("name", key);
            input.setAttribute("value", taxon[key]);
            input.classList.add("return-checkbox");
            input.setAttribute("id", key);
            if((key === "kew_id") || (key === "taxon_name")){
              input.setAttribute("checked", "checked");
            }
            label.setAttribute("for", key);
            div.appendChild(input);
            div.appendChild(label);
            outerDiv.appendChild(div);
          }
          returnD.appendChild(outerDiv);
          let createReturnBtn = document.createElement("button");
          createReturnBtn.innerHTML = "Create Text and Link";
          returnD.appendChild(createReturnBtn);
          createReturnBtn.addEventListener("click", function(){
              // Remove any existing P elements in returnD
              let existingPs = document.getElementsByClassName("p-in-return-d");
              while(existingPs.length){
                existingPs[0].parentElement.removeChild(existingPs[0]);
              }
                
              let returnCheckboxes = document.getElementsByClassName("return-checkbox");
              let text = "";
              let returnUrl = "";
              let queryString = "?";
              let params = new URLSearchParams();
              for(let i=0; i<returnCheckboxes.length; i++){
                if(returnCheckboxes[i].checked){
                  let name = returnCheckboxes[i].getAttribute("id");
                  let value = returnCheckboxes[i].getAttribute("value");
                  text += name;
                  text += ": ";
                  text += value;
                  text += " | ";
                  params.append(name, value);
                  queryString += name;
                  queryString += "=";
                  queryString += value;
                  queryString += "&";
                  queryString = encodeURI(queryString);
                }
              }
              let returnTextP = document.createElement("p");
              returnTextP.classList.add("p-in-return-d");
              returnTextP.innerHTML = text;
              returnD.appendChild(returnTextP);
              if(myurl){
                let returnLinkP = document.createElement("p");
                returnLinkP.classList.add("p-in-return-d");
                let returnA = document.createElement("a");
                returnUrl = myurl + "?" + params.toString();
                let returnHref =  returnUrl;
                returnA.innerHTML = returnUrl;
                returnA.setAttribute("href", returnHref);
                returnLinkP.appendChild(returnA);
                returnD.appendChild(returnLinkP);
              }
          });
        }
      }
      xhr.send();
  closeBtn.addEventListener("click", function(){
    returnD.innerHTML = "";
    formD.setAttribute("style", "display:block")
    suggD.setAttribute("style", "display:block")
  });
}

export default returnTaxon;
