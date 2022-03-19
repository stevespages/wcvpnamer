<?php
  require "./db-functions.php"; 

  // You can simulate a slow server with sleep
  // sleep(2);
  function is_ajax_request() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
      $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
  }
     
  if(is_ajax_request()) {

    if($_GET["calling-function"] === "get-suggestions"){

      //necessary?
      //$query = isset($_GET['q']) ? $_GET['q'] : '';
      
      if($_GET["search-for"] === "Family"){
        $sql =
          "SELECT family, taxonomic_status
          FROM wcvp_v6_sep_2021
          WHERE family LIKE '" . $_GET['q'] . "%'
          GROUP BY family";
      }
      if($_GET["search-for"] === "Genus"){
        if($_GET["where-family"] === "No-Value"){
          $sql =
            "SELECT genus, taxonomic_status
            FROM wcvp_v6_sep_2021
            WHERE genus LIKE '" . $_GET['q'] . "%'
              AND species = ''
            GROUP BY genus";
        } else {
          $sql =
            "SELECT genus, taxonomic_status
            FROM wcvp_v6_sep_2021
            WHERE genus LIKE '" . $_GET['q'] . "%'
              AND family = '" . $_GET['where-family'] . "'
            GROUP BY genus";
        }
      }
      if($_GET["search-for"] === "species"){
        $sql =
          "SELECT species, taxonomic_status
          FROM wcvp_v6_sep_2021
          WHERE species LIKE '" . $_GET['q'] . "%'
            AND species != ''
            AND infraspecies = ''
            AND genus = '" . $_GET['where-genus'] . "'";
      }
      if($_GET["search-for"] === "infraspecies"){
        $sql =
          "SELECT infraspecies, taxonomic_status
          FROM wcvp_v6_sep_2021
          WHERE infraspecies LIKE '" . $_GET['q'] . "%'
            AND infraspecies != ''
            AND genus = '" . $_GET['where-genus'] . "'
            AND species = '" . $_GET['where-species'] . "'";
      }
      // find and return search suggestions as JSON
      function findGenusSuggestions($db, $sql){
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $jsonString = json_encode($result);
        return $jsonString;
        //return $sql;
      }
      echo findGenusSuggestions($db, $sql, $query);
      //echo "eeek";
      exit();
    }

    if($_GET["calling-function"] === "return-taxon"){
      $query = isset($_GET['q']) ? $_GET['q'] : '';
      function getTaxonRow($db, $query){
        $sql =
          "SELECT *
          FROM wcvp_v6_sep_2021
          WHERE genus = '" . $query . "'
            AND species = ''";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $jsonString = json_encode($result);
        return $jsonString;
      }
      echo getTaxonRow($db, $query);
      exit();
    }

    if($_GET["calling-function"] === "get-family"){
      function getFamily($db, $genus){
        $sql =
          "SELECT DISTINCT family
          FROM wcvp_v6_sep_2021
          WHERE genus = '" . $genus . "'
            AND species = ''";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $jsonString = json_encode($result);
        return $jsonString;
      }
      echo getFamily($db, $_GET["genus"]);
      exit();
    }

  }

