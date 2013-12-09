Hellberg
========
Hellberg is a location based "game" that let's you travel from one location to another, accompanied by imagery downloaded from Google Streetview, all while giving you clues about the destination of the trip, very much inspired by the Swedish TV show [På spåret](http://www.svt.se/pa-sparet/).

The app is pretty much a proof of concept, developed by [Gustaf Lindqvist](http://github.com/gstf) & [Simon Fransson](http://github.com/dessibelle) at #locationday 2013 in Malmö, Sweden. Being the product of a 24 h hackathon it is somewhat limited in functionality, and the gaming aspects of it should probably be tweaked a great deal before it has any potential of entertain anyone for more than a few minutes.

As most Swedish people can probably tell, the name "Hellberg" is borrowed from [Björn Hellberg](http://en.wikipedia.org/wiki/Bj%C3%B6rn_Hellberg), who served as judge on the show.

Heard enough already? Go [try it out](http://hobocode.github.com/hellberg/)!

##What does it do?
Hellberg does five things:

* Autocompletes locations using the [Google Place Autocomplete API](https://developers.google.com/places/documentation/autocomplete).
* Calculates a route between two places using the [Google Directions API](https://developers.google.com/maps/documentation/directions/).
* Downloads imagery for the entire trip between two places using the [Google StreetView API](https://developers.google.com/maps/documentation/javascript/streetview).
* Downloads "hints" using location metadata downloaded from [Wikipedia](http://www.mediawiki.org/wiki/API:Main_page) and [Foursquare](https://developer.foursquare.com/).
* Displays the downloaded imagery for the entire route between two place while giving you hints on what the destination might be.

##Installation and setup
Requires [npm](https://npmjs.org), [bower](https://github.com/bower/bower) and [grunt](http://gruntjs.com/) (not really required simplifies things).

1. Checkout the repo.  
  `git clone git@github.com:hobocode/hellberg`
2. Install dependencies.  
   `cd hellberg`  
   `npm install`
   `bower install`
3. Run the application.  
   `grunt server`  
   
##Known limitations
* The imagery downloaded from Google StreetView might feel choppy. This is essentially due to a compromise between load time, trip time and bandwith/memory/api-request consumption.
* If no Wikipedia page exists / was found for your destination, things will fail. 
* Phrasing of generated hints might be a bit off at times, grammatically.
* Figuring out the destination when you supplied it to the app yourself isn't all that exciting, so the hints will be pretty much useless in that case.

Logo and graphics created by [Carl Hagerling](http://hagerling.se/).

[Live demo](http://bambuser.com/v/4163746) recorded at the #locationday hackathon.
