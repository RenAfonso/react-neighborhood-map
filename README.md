# Lisbon's Museums

This is a single page web application that allows the user to search for the location of Lisbon's museums. Using the React framework and the Google Maps API, a searchable list of Lisbon's museums is displayed to the user who can then search their location on the map or the museums address and coordinates. Further information about each museum will be added once such information is made available in the Foursquare API.

This is also the final project for Udacity's Front-End Nanodegree, thus this project follows Udacity's project rubric.

### Features

1. Input a museum's name on the search field to get a list of matching venues. The markers on the map will update automatically, according to the query results. Mobile users will have to open the sidebar by tapping the search icon on top left.
2. Click on any element of the list to display a small window on the map with the museum's name, address and coordinates. The map will automatically focus on that museum's marker (removing all other markers) and highlight the selection. Mobile users will have to close the museums list by tapping the left arrow icon in order to display the map.
3. Clicking back on the search field will deselect a museum, causing all venues to reappear on the list according to the existing query. An empty query always returns the full venue list when the search field is clicked.
4. Clicking on a location marker will pop an infowindow with the museum's name and address.
5. Clicking anywhere on the map will close the infowindow.


### Development

This project was built using Node.js and the Create-React-App starter code. However, due to a limitation on some libraries also used, the Ract version used was 15.6.1 and not the current one. If you choose to download or clone this repository at [GitHub](https://github.com/RenAfonso/react-neighborhood-map.git), the package.json file contains all necessary info to run this app successfully.

To install this app you must first install Node.js, if you haven't yet, and download or clone this [repository](https://github.com/RenAfonso/react-neighborhood-map.git) to any folder you want. On that folder, run `npm install` and wait for the installation to complete. This will install all dependencies you need.

Once everything is installed, run `npm start`. A browser tab displaying the app should load. If no errors are logged and the browser doesn't open, open a new browser tab and go to [http://localhost:3000/](http://localhost:3000/).

This app's service worker will not work in development stage.

#### Libraries

* **create-react-app** - the base framework upon which this React app is built
* **google-maps-react** - a library that easily allows the use of Google Maps API in a React app
* **escape-string-regexp** - uses regexp to facilitate the museums' query
* **sort-by** - allows the museums list to be displayed
* **@fortawesome/react-fontawesome** - to provide two icons that are displayed in mobile version
* **prop-types** - to confirm that inherited props are of the necessary type

### Build

This app is still in development stage. to create a production build, from this app's folder type `npm run build`. Only in production mode will the service worker cache data.
