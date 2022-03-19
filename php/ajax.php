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
      
      if(!$_GET["genus"] AND !$_GET["species"]){
 
        $taxonSearchedFor = "genus";

        $sql =
          "SELECT kew_id, taxon_name, taxonomic_status, rank, family, genus, species, infraspecies, accepted_kew_id, accepted_name, acc_tax_stat, acc_tax_rank, acc_family, acc_genus, acc_species, acc_infraspecies
          FROM genuses_v6
          WHERE genus LIKE '" . $_GET['q'] . "%'";
      }
      if($_GET["genus"] AND !$_GET["species"]){
 
        $taxonSearchedFor = "species";

        $sql =
          "SELECT kew_id, taxon_name, taxonomic_status, rank, family, genus, species, infraspecies, accepted_kew_id, accepted_name, acc_tax_stat, acc_tax_rank, acc_family, acc_genus, acc_species, acc_infraspecies, no_ifs_acc, no_ifs_art_hyb, no_ifs_syn, no_ifs_h_syn, no_ifs_unp
          FROM species_v6
          WHERE genus = '" . $_GET['genus'] . "'
          AND species != ''
          AND species LIKE '" . $_GET['q'] . "%'";
      }
      if($_GET["genus"] AND $_GET["species"]){
 
        $taxonSearchedFor = "infraspecies";

        $sql =
          "SELECT kew_id, taxon_name, taxonomic_status, rank, family, genus, species, infraspecies, accepted_kew_id, accepted_name, acc_tax_stat, acc_tax_rank, acc_family, acc_genus, acc_species, acc_infraspecies
          FROM infraspecies_v6
          WHERE genus = '" . $_GET['genus'] . "'
          AND species = '" . $_GET['species'] . "'
          AND infraspecies != ''
          AND infraspecies LIKE '" . $_GET['q'] . "%'";
      }
      // find and return search suggestions as JSON
      function findGenusSuggestions($db, $sql, $taxonSearchedFor){
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $suggestionsTaxonAndNumber = (object)[];
        $suggestionsTaxonAndNumber->taxon = $taxonSearchedFor;
        $suggestionsTaxonAndNumber->number = count($result);
        if(count($result) < 40){
          $suggestionsTaxonAndNumber->suggestions = $result;
        }
        return json_encode($suggestionsTaxonAndNumber);
      }
      echo findGenusSuggestions($db, $sql, $taxonSearchedFor);
      // echo $sql;
      exit();
    }

    if($_GET["calling-function"] === "return-taxon"){
      $sql = "SELECT * FROM wcvp_v6_sep_2021
        WHERE kew_id = '" . $_GET['kew-id'] . "'";
      $stmt = $db->prepare($sql);
      $stmt->execute();
      $result = $stmt->fetch(PDO::FETCH_ASSOC);
      $jsonString = json_encode($result);
      echo $jsonString;
      exit();
    }

  }

