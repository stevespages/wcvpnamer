function openMenu(){

  const formD = document.querySelector("#form-d");

  const suggD = document.querySelector("#sugg-d");

  const menuD = document.querySelector("#menu-d");

  formD.setAttribute("style", "display:none");

  suggD.setAttribute("style", "display:none");

  menuD.setAttribute("style", "display:block");

  const closeMenuBtn = document.querySelector("#close-menu-btn");

  closeMenuBtn.addEventListener("click", function(){

    formD.setAttribute("style", "display:block");
    
    suggD.setAttribute("style", "display:block");

    menuD.setAttribute("style", "display:none");
    
  });

}

export default openMenu;
