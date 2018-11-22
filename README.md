# Pintrospective

#### A Visual Artist-Themed Pinterest Clone

##### See it live [HERE](http://pintrospective.herokuapp.com)

##### Concept:
Pintrospective provides a Pinterest-like UI to visual art exploration.

##### Key Features:
- Simultaneously creates and updates User model and polymorphic Image model using nested attributes and wrapped parameters.
- Hunted down n+1 queries on the index view to keep navigation snappy

##### Under the Hood:
Ruby on Rails, Backbone.js, Bootstrap, Postgresql, Isotope.js, HTML5, CSS

##### Future TODOs:
- Allow Users to enter in a website, scrape images from that site, and let them choose which image to add.
- Infinite Scroll: Consolidate Pins Index from two associations to one ActiveRecord query, using SQL, to enable use of Kaminaru pagination gem.
- Allow for Board sorting, using jQueryUI sortable().
- Add 'Like' functionality.
- DRY up code, specifically form and modal skeletons should go into partials
- Add Repin functionality
- Add tags to pins
- SEARCH
