# WCVPNamer v1.0.0

This website is at stevespages.org.uk/wcvpnamer/. It enables users to search for the scientific name of a plant starting with its genus. As the user types, the number of hits is displayed. When that number is less than about 25 the names are displayed. Once a genus has been selected the user can move on to search for species and then infraspecies. For any taxon the user can drill down for more information about that taxon and copy the information to their clipboard. If they are using the site as an API they can return to the site they came from with the selected data appended to their URL as query parameters.

The website uses the `World Checklist of Vascular Plants` to provide accepted names and other data for plants. For more information about the aims of the site and how to use it visit the site and click on *menu* then *about*.

The data is available at https://powo.science.kew.org/. Follow the *DATA* link.

WCVPNamer can be browsed and data extracted by copy and pasting. Alternatively, the website can be used as an API by other software, eg. websites, where accepted plant names are required. Currently the `trees` website, also made by `StevesPages` uses `WCVPNamer` in this way.

This website has been uploaded to `GitHub` without the `SQLite` database because the database is over 100Mb. Ideally the database with some representative data should be uploaded as a useful backup of the database schema.



## Release Notes for v1.0.0

After months of inactivity the project was cloned from GitHub and some minor changes that had been made to the version on the server were committed.