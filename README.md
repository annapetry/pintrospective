# Pintrospective

#### A Visual Artist-Themed Pinterest Clone

##### Concept:
Pintrospective provides a Pinterest-like UI to visual art exploration.

##### Key Features:
-  Creates and updates two models simultaneously using nested attributes and wrapped parameters.
-  Reduces number of n + 1 queries by using :includes, which loads model associations using the minimum number of queries.
-  Consumes a RESTful Rails API which also includes custom routes.

##### Under the Hood:
Ruby on Rails, Backbone.js, Bootstrap, Postgresql, Isotope.js, HTML5, CSS

##### Future TODOs:
- Allow Users to enter in a website, scrape images from that site, and let them choose which image to add.
- Infinite Scroll: Consolidate Pins Index from two associations to one ActiveRecord query, using SQL, to enable use of Kaminaru pagination gem.
- Allow for Board sorting, using jQueryUI sortable().
- Add 'Like' functionality.
- DRY up code, specifically form and modal skeletons should go into partials
