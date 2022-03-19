<?php
  /*
   * createSelect($name, $selectOptions)
   * creates a select element with name attribute = $name. Creates option elements with values and content determined by the $selectOptions array.
   */
  function createSelect($name, $selectOptions){
    $select = "<select name='{$name}'>";
    foreach($selectOptions as $selectOption){
      $select .= "<option value='{$selectOption[0]}'>{$selectOption[1]}</option>";
    }
    $select .= "</select>";
    return $select;
  }

  function niceVarDump($variable){
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
  }

  function niceVarDumpExit($variable){
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit();
  }

