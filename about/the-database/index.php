<html lang=en>
  <head>
    <meta charset=utf-8>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>The Database</title>
  </head>
  <body>
    <h1>The Database</h1>
    <nav>
      <ul>
        <li><a href="../../">wcvpNamer</a></li>
        <li><a href="../">About</a></li>
        <li><a href="./the-database/">The database</a></li>
      </ul>
    </nav>
    <p>
      The database is available as a csv file from the WCVP website. Several times a year an updated version becomes available. The csv file is compressed into a .zip file and the most recent one is 38MB file size. Each of the over one million rows has 18 columns. These are shown in Fig 1 which is the result of querying the schema of the SQL table derived from the WCVP csv file. 
    </p>
    <figure>
    <pre><code>
CREATE TABLE wcvp_v6_sep_2021(
  "kew_id" TEXT,
  "family" TEXT,
  "genus" TEXT,
  "species" TEXT,
  "infraspecies" TEXT,
  "taxon_name" TEXT,
  "authors" TEXT,
  "rank" TEXT,
  "taxonomic_status" TEXT,
  "accepted_kew_id" TEXT,
  "accepted_name" TEXT,
  "accepted_authors" TEXT,
  "parent_kew_id" TEXT,
  "parent_name" TEXT,
  "parent_authors" TEXT,
  "reviewed" TEXT,
  "publication" TEXT,
  "original_name_id" TEXT
);
    </code></pre>
    <figcaption>Fig 1</figcaption>
    </figure>
    <h2>kew_id, <a href="https://www.ipni.org/about">IPNI</a> and <a href=https://en.wikipedia.org/wiki/LSID>LSID</a></h2>
    <p>
      It can be seen from Fig 1 that the first column in the WCVP database is called kew_id. This is a unique identifier for the plant name in that row of the table. It comes from the International Plant Names Index. The WCVP only contains plant names which are in the IPNI and the IPNI Life Sciences Identifier (LSID) is recorded in the kew_id field of the WCVP. 
    </p>
    <p>
      A search of WCVP specifying that "genus" = "Quercus", "species" = "robur" and "infraspecies" = "" reveals there is only one row satisfying these conditions. The value of the kew_id field in this row is 304293-2. If we search the IPNI web site for "Quercus robur" we get 32 results as there are many infraspecies listed. If we filter the results using the "Specific" filter the results are reduced to three. One of these is Quercus robur L., Sp. Pl. 2: 996 (1753) and has the "IPNI Life Sciences Identifier": urn:lsid:ipni.org:names:304293-2
    </p>
    <p>
      The intention is to retain the same LSID for the same entity (in this case a plant name) so that the LSID can be used as a shorthand for the entity. The LSID can be derived from the kew_id. It is a more convenient identifier than the name itself when recording data relating to the name. A query to the WCVP can be made to gather other data such as the taxonomic_status relating to the plant name.
    </p>
</html>


