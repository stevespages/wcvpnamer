<!DOCTYPE html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <link rel="stylesheet" href="./css/main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>wcvpNamer</title>
  </head>
  <body>

    <h1 id="home-page"><a href="https://wcvp.science.kew.org/">wcvp</a>Namer</h1>

    <div id="form-d">
      <!-- <button id="new-search-btn">New Search</button> -->
      <form 
        method="GET"
        action="./" onkeydown="return event.key != 'Enter';"
      >
        <input 
          id="search-input"
          type="text"
          name="q"
          size="14"
          autocomplete="off"
        >
      </form>
      
      <span id="menu">menu</span>

      <p id="family-genus-species">
        <span id="family-span"></span>
        <span id="genus-span"></span>
        <span id="species-span"></span>
      </p>
    </div>

    <div id="menu-d" style="display:none">
      <button id="close-menu-btn">Close</button>
      <h2>Menu</h2>
      <p><a href="./about/">About</a></p>
<?php
// If user supplied the myurl query parameter display this.
// If user can not find a name for the tree they can return 'unsure'.
    if($_GET['myurl']){
?>
    <p>
        Return 
        <a href='<?= $_GET['myurl'] ?>?kew_id=none&taxon_name=unsure'>
            Unsure
        </a>
        for name.
    </p>
<?php
    }
?>
      <h3>key</h3>
      <p id="key-acc">Accepted</p>
      <p id="key-art-hyb">Artificial Hybrid</p>
      <p id="key-syn">Synonym</p>
      <p id="key-h-syn">Homotypic Synonym</p>
      <p id="key-unp">Unplaced</p>
    </div>

    <div id="sugg-d">
      <p id="sugg-summary-p"></p>
      <ul id="sugg-ul"></ul>
    </div>

    <div id="return-d">
    </div>

    <script type="module" src="./javascript/main.js"></script>

  </body>
</html>

