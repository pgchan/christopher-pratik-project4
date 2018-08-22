(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

//  Customer enters their required search parameters (ingredients, course type, cusisine type, dietary restrictions)
//  Example of a search for chicken and broccoli / Main dish / Italian / No dietary restriction
//  Do an API call for all recipes with chicken and broccoli
//  Then filter the results based on the other criteria - starting with course type - then cuisine type - then dietary restrcitions
//  The data is pulled from the API and displayed onto the page in a list
//  The filtered results will then be broken down into individual recipes - displaying an image of the dish, the name of the dish and a description of it
//  need to store recipe id from each filtered result and do a separate pull to get the info from there
//  The recipes will be clickable to take them to a full view of them
//  The recipes will be opened in a new tab

var foodApp = {};

foodApp.apiID = '?_app_id=71ec3e04';
foodApp.apiKey = '&_app_key=cc1fd4f6ce167c1198febd162fea8392';
foodApp.allRecipiesApiURL = 'http://api.yummly.com/v1/api/recipes' + foodApp.apiID;
foodApp.singleRecipeApiURL = 'http://api.yummly.com/v1/api/recipe/';
foodApp.recipeList = [];

//  the getAllRecipes method takes in the parameters from the search form and gets the matching data from the API
foodApp.getAllRecipes = function (ingredients, dietary, cuisineType) {
    $.ajax({
        url: '' + foodApp.allRecipiesApiURL + foodApp.apiKey + dietary + cuisineType,
        method: 'GET',
        dataType: 'json',
        data: {
            q: ingredients,
            maxResult: 20,
            start: 0
        }
    }).then(function (result) {
        foodApp.displayRecipes(result.matches);
    });
};

//  the getSingleRecipe method takes in a recipeID and pulls the info for that specific recipe
foodApp.getSingleRecipe = function (recipeID) {
    $.ajax({
        url: '' + foodApp.singleRecipeApiURL + recipeID + foodApp.apiID + foodApp.apiKey,
        method: 'GET',
        dataType: 'json'
    }).then(function (result) {
        foodApp.recipeList.push(result);
        console.log(result);
        var showRecipe = '<div>\n        <img src=\'' + result.images[0].hostedLargeUrl + '\'>\n        <h2>' + result.name + '</h2>\n        <h3>Total Time to Prepare: ' + result.totalTime + '</h3>\n        <h3>Number of Servings: ' + result.numberOfServings + '</h3>\n        <h3>Course Types: ' + result.attributes.course + '</h3>\n        <h3>Cuisine Types: ' + result.attributes.cuisine + '</h3>\n        </div>';
        $('.recipeList').append(showRecipe);
        //  can use a for in loop to go through the object
    });
};

//  the displayRecipes method takes the recipes and breaks them down to be displayed on screen
foodApp.displayRecipes = function (recipes) {
    $('.recipeList').empty();
    recipes.forEach(function (item) {
        foodApp.getSingleRecipe(item.id);
    });
};

//  values to grab when displaying recipe to the page:
//  .images.hostedLargeUrl
//  .name
//  .source.sourceRecipeUrl
//  .totalTime
//  .numberOfServings
//  .attributes.course
//  .attributes.cuisine

//  the events method will hold general event listeners for the site
foodApp.events = function () {};

//  the init method initializes all the necessary methods when the page loads
foodApp.init = function () {
    foodApp.getAllRecipes('ground beef', '', '&allowedCuisine[]=cuisine^cuisine-italian&allowedCuisine[]=cuisine^cuisine-mexican&allowedCuisine[]=cuisine^cuisine-cuban');
};

//  document.ready to call the init method once the page is finished loading
$(function () {
    foodApp.init();
});

//  Example for pagination later on


/* maxResult, start : The maxResult and start parameters allow pagination and # of results control. By default 6 recipes are returned by the search API.
For example, if you want 10 recipes per page and want to see the second page of results, you would append &maxResult=10&start=10. Start is set to 10 versus because the numbering for results starts at 0 (versus 1).
For example: http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup
&maxResult=20&start=10 */
//  can have a variable in place of the 10 for start that would increase on each Load More button click.


//  values for cuisines have to all be in lower case - all should start with &allowedCuisine[]=
//  &allowedCuisine[]=cuisine^cuisine-american
//  &allowedCuisine[]=cuisine^cuisine-kid-friendly
//  cuisine^cuisine-italian
//  cuisine^cuisine-asian
//  cuisine^cuisine-mexican
//  cuisine^cuisine-southern
//  cuisine^cuisine-french
//  cuisine^cuisine-southwestern
//  cuisine^cuisine-barbecue-bbq
//  cuisine^cuisine-indian
//  cuisine^cuisine-chinese
//  cuisine^cuisine-cajun
//  cuisine^cuisine-mediterranean
//  cuisine^cuisine-greek
//  cuisine^cuisine-english
//  cuisine^cuisine-spanish
//  cuisine^cuisine-thai
//  cuisine^cuisine-german
//  cuisine^cuisine-moroccan
//  cuisine^cuisine-irish
//  cuisine^cuisine-japanese
//  cuisine^cuisine-cuban
//  cuisine^cuisine-hawaiian
//  cuisine^cuisine-swedish
//  cuisine^cuisine-hungarian
//  cuisine^cuisine-portuguese

//  values for dietary are as follows: - all should start with &allowedDiet[]=
//  386^Vegan
//  387^Lacto-ovo vegetarian
//  388^Lacto vegetarian
//  389^Ovo vegetarian
//  390^Pescetarian
//  403^Paleo

//  values for course types are as follows: - all should start with &allowedCourse[]=
//  course^course-Main Dishes
//  course^course-Desserts
//  course^course-Side Dishes
//  course^course-Appetizers
//  course^course-Salads
//  course^course-Breakfast and Brunch
//  course^course-Breads
//  course^course-Soups
//  course^course-Beverages
//  course^course-Condiments and Sauces
//  course^course-Cocktails
//  course^course-Snacks
//  course^course-Lunch

//  Pratik current task: starting on form layout for searching
//  Chris current task - work on getting data from API and filtering

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0k7QUFDQTtBQUNKO0FBQ0k7O0FBRUosSUFBTSxVQUFVLEVBQWhCOztBQUVBLFFBQVEsS0FBUixHQUFnQixtQkFBaEI7QUFDQSxRQUFRLE1BQVIsR0FBaUIsNENBQWpCO0FBQ0EsUUFBUSxpQkFBUiw0Q0FBbUUsUUFBUSxLQUEzRTtBQUNBLFFBQVEsa0JBQVIsR0FBNkIsc0NBQTdCO0FBQ0EsUUFBUSxVQUFSLEdBQXFCLEVBQXJCOztBQUdBO0FBQ0EsUUFBUSxhQUFSLEdBQXdCLFVBQUMsV0FBRCxFQUFjLE9BQWQsRUFBdUIsV0FBdkIsRUFBdUM7QUFDM0QsTUFBRSxJQUFGLENBQVE7QUFDSixrQkFBUSxRQUFRLGlCQUFoQixHQUFvQyxRQUFRLE1BQTVDLEdBQXFELE9BQXJELEdBQStELFdBRDNEO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVLE1BSE47QUFJSixjQUFNO0FBQ0YsZUFBRyxXQUREO0FBRUYsdUJBQVcsRUFGVDtBQUdGLG1CQUFPO0FBSEw7QUFKRixLQUFSLEVBVUMsSUFWRCxDQVVNLFVBQUMsTUFBRCxFQUFZO0FBQ2QsZ0JBQVEsY0FBUixDQUF1QixPQUFPLE9BQTlCO0FBQ0gsS0FaRDtBQWFILENBZEQ7O0FBZ0JBO0FBQ0EsUUFBUSxlQUFSLEdBQTBCLFVBQUMsUUFBRCxFQUFjO0FBQ3BDLE1BQUUsSUFBRixDQUFRO0FBQ0osa0JBQVEsUUFBUSxrQkFBaEIsR0FBcUMsUUFBckMsR0FBZ0QsUUFBUSxLQUF4RCxHQUFnRSxRQUFRLE1BRHBFO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVO0FBSE4sS0FBUixFQUtDLElBTEQsQ0FLTSxVQUFDLE1BQUQsRUFBWTtBQUNkLGdCQUFRLFVBQVIsQ0FBbUIsSUFBbkIsQ0FBd0IsTUFBeEI7QUFDQSxnQkFBUSxHQUFSLENBQVksTUFBWjtBQUNBLFlBQU0sNENBQ00sT0FBTyxNQUFQLENBQWMsQ0FBZCxFQUFpQixjQUR2Qix5QkFFQSxPQUFPLElBRlAsa0RBR3VCLE9BQU8sU0FIOUIsK0NBSW9CLE9BQU8sZ0JBSjNCLHlDQUtjLE9BQU8sVUFBUCxDQUFrQixNQUxoQywwQ0FNZSxPQUFPLFVBQVAsQ0FBa0IsT0FOakMsMEJBQU47QUFRQSxVQUFFLGFBQUYsRUFBaUIsTUFBakIsQ0FBd0IsVUFBeEI7QUFDQTtBQUNILEtBbEJEO0FBbUJILENBcEJEOztBQXNCQTtBQUNBLFFBQVEsY0FBUixHQUF5QixVQUFDLE9BQUQsRUFBYTtBQUNsQyxNQUFFLGFBQUYsRUFBaUIsS0FBakI7QUFDQSxZQUFRLE9BQVIsQ0FBZ0IsVUFBQyxJQUFELEVBQVU7QUFDdEIsZ0JBQVEsZUFBUixDQUF3QixLQUFLLEVBQTdCO0FBQ0gsS0FGRDtBQUdILENBTEQ7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsTUFBUixHQUFpQixZQUFNLENBRXRCLENBRkQ7O0FBSUE7QUFDQSxRQUFRLElBQVIsR0FBZSxZQUFNO0FBQ2pCLFlBQVEsYUFBUixDQUFzQixhQUF0QixFQUFxQyxFQUFyQyxFQUF5QywySEFBekM7QUFDSCxDQUZEOztBQUlBO0FBQ0EsRUFBRSxZQUFXO0FBQ1QsWUFBUSxJQUFSO0FBQ0gsQ0FGRDs7QUFNQTs7O0FBR0E7Ozs7QUFJQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vICBDdXN0b21lciBlbnRlcnMgdGhlaXIgcmVxdWlyZWQgc2VhcmNoIHBhcmFtZXRlcnMgKGluZ3JlZGllbnRzLCBjb3Vyc2UgdHlwZSwgY3VzaXNpbmUgdHlwZSwgZGlldGFyeSByZXN0cmljdGlvbnMpXG4gICAgLy8gIEV4YW1wbGUgb2YgYSBzZWFyY2ggZm9yIGNoaWNrZW4gYW5kIGJyb2Njb2xpIC8gTWFpbiBkaXNoIC8gSXRhbGlhbiAvIE5vIGRpZXRhcnkgcmVzdHJpY3Rpb25cbiAgICAgICAgLy8gIERvIGFuIEFQSSBjYWxsIGZvciBhbGwgcmVjaXBlcyB3aXRoIGNoaWNrZW4gYW5kIGJyb2Njb2xpXG4gICAgICAgIC8vICBUaGVuIGZpbHRlciB0aGUgcmVzdWx0cyBiYXNlZCBvbiB0aGUgb3RoZXIgY3JpdGVyaWEgLSBzdGFydGluZyB3aXRoIGNvdXJzZSB0eXBlIC0gdGhlbiBjdWlzaW5lIHR5cGUgLSB0aGVuIGRpZXRhcnkgcmVzdHJjaXRpb25zXG4vLyAgVGhlIGRhdGEgaXMgcHVsbGVkIGZyb20gdGhlIEFQSSBhbmQgZGlzcGxheWVkIG9udG8gdGhlIHBhZ2UgaW4gYSBsaXN0XG4gICAgLy8gIFRoZSBmaWx0ZXJlZCByZXN1bHRzIHdpbGwgdGhlbiBiZSBicm9rZW4gZG93biBpbnRvIGluZGl2aWR1YWwgcmVjaXBlcyAtIGRpc3BsYXlpbmcgYW4gaW1hZ2Ugb2YgdGhlIGRpc2gsIHRoZSBuYW1lIG9mIHRoZSBkaXNoIGFuZCBhIGRlc2NyaXB0aW9uIG9mIGl0XG4gICAgLy8gIG5lZWQgdG8gc3RvcmUgcmVjaXBlIGlkIGZyb20gZWFjaCBmaWx0ZXJlZCByZXN1bHQgYW5kIGRvIGEgc2VwYXJhdGUgcHVsbCB0byBnZXQgdGhlIGluZm8gZnJvbSB0aGVyZVxuLy8gIFRoZSByZWNpcGVzIHdpbGwgYmUgY2xpY2thYmxlIHRvIHRha2UgdGhlbSB0byBhIGZ1bGwgdmlldyBvZiB0aGVtXG4gICAgLy8gIFRoZSByZWNpcGVzIHdpbGwgYmUgb3BlbmVkIGluIGEgbmV3IHRhYlxuXG5jb25zdCBmb29kQXBwID0ge307XG5cbmZvb2RBcHAuYXBpSUQgPSAnP19hcHBfaWQ9NzFlYzNlMDQnXG5mb29kQXBwLmFwaUtleSA9ICcmX2FwcF9rZXk9Y2MxZmQ0ZjZjZTE2N2MxMTk4ZmViZDE2MmZlYTgzOTInO1xuZm9vZEFwcC5hbGxSZWNpcGllc0FwaVVSTCA9IGBodHRwOi8vYXBpLnl1bW1seS5jb20vdjEvYXBpL3JlY2lwZXMke2Zvb2RBcHAuYXBpSUR9YDtcbmZvb2RBcHAuc2luZ2xlUmVjaXBlQXBpVVJMID0gJ2h0dHA6Ly9hcGkueXVtbWx5LmNvbS92MS9hcGkvcmVjaXBlLyc7XG5mb29kQXBwLnJlY2lwZUxpc3QgPSBbXTtcblxuXG4vLyAgdGhlIGdldEFsbFJlY2lwZXMgbWV0aG9kIHRha2VzIGluIHRoZSBwYXJhbWV0ZXJzIGZyb20gdGhlIHNlYXJjaCBmb3JtIGFuZCBnZXRzIHRoZSBtYXRjaGluZyBkYXRhIGZyb20gdGhlIEFQSVxuZm9vZEFwcC5nZXRBbGxSZWNpcGVzID0gKGluZ3JlZGllbnRzLCBkaWV0YXJ5LCBjdWlzaW5lVHlwZSkgPT4ge1xuICAgICQuYWpheCAoe1xuICAgICAgICB1cmw6IGAke2Zvb2RBcHAuYWxsUmVjaXBpZXNBcGlVUkx9JHtmb29kQXBwLmFwaUtleX0ke2RpZXRhcnl9JHtjdWlzaW5lVHlwZX1gLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBxOiBpbmdyZWRpZW50cyxcbiAgICAgICAgICAgIG1heFJlc3VsdDogMjAsXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBmb29kQXBwLmRpc3BsYXlSZWNpcGVzKHJlc3VsdC5tYXRjaGVzKTtcbiAgICB9KTtcbn1cblxuLy8gIHRoZSBnZXRTaW5nbGVSZWNpcGUgbWV0aG9kIHRha2VzIGluIGEgcmVjaXBlSUQgYW5kIHB1bGxzIHRoZSBpbmZvIGZvciB0aGF0IHNwZWNpZmljIHJlY2lwZVxuZm9vZEFwcC5nZXRTaW5nbGVSZWNpcGUgPSAocmVjaXBlSUQpID0+IHtcbiAgICAkLmFqYXggKHtcbiAgICAgICAgdXJsOiBgJHtmb29kQXBwLnNpbmdsZVJlY2lwZUFwaVVSTH0ke3JlY2lwZUlEfSR7Zm9vZEFwcC5hcGlJRH0ke2Zvb2RBcHAuYXBpS2V5fWAsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgfSlcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGZvb2RBcHAucmVjaXBlTGlzdC5wdXNoKHJlc3VsdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgY29uc3Qgc2hvd1JlY2lwZSA9IGA8ZGl2PlxuICAgICAgICA8aW1nIHNyYz0nJHtyZXN1bHQuaW1hZ2VzWzBdLmhvc3RlZExhcmdlVXJsfSc+XG4gICAgICAgIDxoMj4ke3Jlc3VsdC5uYW1lfTwvaDI+XG4gICAgICAgIDxoMz5Ub3RhbCBUaW1lIHRvIFByZXBhcmU6ICR7cmVzdWx0LnRvdGFsVGltZX08L2gzPlxuICAgICAgICA8aDM+TnVtYmVyIG9mIFNlcnZpbmdzOiAke3Jlc3VsdC5udW1iZXJPZlNlcnZpbmdzfTwvaDM+XG4gICAgICAgIDxoMz5Db3Vyc2UgVHlwZXM6ICR7cmVzdWx0LmF0dHJpYnV0ZXMuY291cnNlfTwvaDM+XG4gICAgICAgIDxoMz5DdWlzaW5lIFR5cGVzOiAke3Jlc3VsdC5hdHRyaWJ1dGVzLmN1aXNpbmV9PC9oMz5cbiAgICAgICAgPC9kaXY+YFxuICAgICAgICAkKCcucmVjaXBlTGlzdCcpLmFwcGVuZChzaG93UmVjaXBlKTtcbiAgICAgICAgLy8gIGNhbiB1c2UgYSBmb3IgaW4gbG9vcCB0byBnbyB0aHJvdWdoIHRoZSBvYmplY3RcbiAgICB9KTtcbn1cblxuLy8gIHRoZSBkaXNwbGF5UmVjaXBlcyBtZXRob2QgdGFrZXMgdGhlIHJlY2lwZXMgYW5kIGJyZWFrcyB0aGVtIGRvd24gdG8gYmUgZGlzcGxheWVkIG9uIHNjcmVlblxuZm9vZEFwcC5kaXNwbGF5UmVjaXBlcyA9IChyZWNpcGVzKSA9PiB7XG4gICAgJCgnLnJlY2lwZUxpc3QnKS5lbXB0eSgpO1xuICAgIHJlY2lwZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBmb29kQXBwLmdldFNpbmdsZVJlY2lwZShpdGVtLmlkKTtcbiAgICB9KTtcbn1cblxuLy8gIHZhbHVlcyB0byBncmFiIHdoZW4gZGlzcGxheWluZyByZWNpcGUgdG8gdGhlIHBhZ2U6XG4vLyAgLmltYWdlcy5ob3N0ZWRMYXJnZVVybFxuLy8gIC5uYW1lXG4vLyAgLnNvdXJjZS5zb3VyY2VSZWNpcGVVcmxcbi8vICAudG90YWxUaW1lXG4vLyAgLm51bWJlck9mU2VydmluZ3Ncbi8vICAuYXR0cmlidXRlcy5jb3Vyc2Vcbi8vICAuYXR0cmlidXRlcy5jdWlzaW5lXG5cbi8vICB0aGUgZXZlbnRzIG1ldGhvZCB3aWxsIGhvbGQgZ2VuZXJhbCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBzaXRlXG5mb29kQXBwLmV2ZW50cyA9ICgpID0+IHtcblxufVxuXG4vLyAgdGhlIGluaXQgbWV0aG9kIGluaXRpYWxpemVzIGFsbCB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgd2hlbiB0aGUgcGFnZSBsb2Fkc1xuZm9vZEFwcC5pbml0ID0gKCkgPT4ge1xuICAgIGZvb2RBcHAuZ2V0QWxsUmVjaXBlcygnZ3JvdW5kIGJlZWYnLCAnJywgJyZhbGxvd2VkQ3Vpc2luZVtdPWN1aXNpbmVeY3Vpc2luZS1pdGFsaWFuJmFsbG93ZWRDdWlzaW5lW109Y3Vpc2luZV5jdWlzaW5lLW1leGljYW4mYWxsb3dlZEN1aXNpbmVbXT1jdWlzaW5lXmN1aXNpbmUtY3ViYW4nKTtcbn07XG5cbi8vICBkb2N1bWVudC5yZWFkeSB0byBjYWxsIHRoZSBpbml0IG1ldGhvZCBvbmNlIHRoZSBwYWdlIGlzIGZpbmlzaGVkIGxvYWRpbmdcbiQoZnVuY3Rpb24oKSB7XG4gICAgZm9vZEFwcC5pbml0KCk7XG59KTtcblxuXG5cbi8vICBFeGFtcGxlIGZvciBwYWdpbmF0aW9uIGxhdGVyIG9uXG5cblxuLyogbWF4UmVzdWx0LCBzdGFydCA6IFRoZSBtYXhSZXN1bHQgYW5kIHN0YXJ0IHBhcmFtZXRlcnMgYWxsb3cgcGFnaW5hdGlvbiBhbmQgIyBvZiByZXN1bHRzIGNvbnRyb2wuIEJ5IGRlZmF1bHQgNiByZWNpcGVzIGFyZSByZXR1cm5lZCBieSB0aGUgc2VhcmNoIEFQSS5cbkZvciBleGFtcGxlLCBpZiB5b3Ugd2FudCAxMCByZWNpcGVzIHBlciBwYWdlIGFuZCB3YW50IHRvIHNlZSB0aGUgc2Vjb25kIHBhZ2Ugb2YgcmVzdWx0cywgeW91IHdvdWxkIGFwcGVuZCAmbWF4UmVzdWx0PTEwJnN0YXJ0PTEwLiBTdGFydCBpcyBzZXQgdG8gMTAgdmVyc3VzIGJlY2F1c2UgdGhlIG51bWJlcmluZyBmb3IgcmVzdWx0cyBzdGFydHMgYXQgMCAodmVyc3VzIDEpLlxuRm9yIGV4YW1wbGU6IGh0dHA6Ly9hcGkueXVtbWx5LmNvbS92MS9hcGkvcmVjaXBlcz9fYXBwX2lkPVlPVVJfSUQmX2FwcF9rZXk9WU9VUl9BUFBfS0VZJnE9b25pb24rc291cFxuJm1heFJlc3VsdD0yMCZzdGFydD0xMCAqL1xuLy8gIGNhbiBoYXZlIGEgdmFyaWFibGUgaW4gcGxhY2Ugb2YgdGhlIDEwIGZvciBzdGFydCB0aGF0IHdvdWxkIGluY3JlYXNlIG9uIGVhY2ggTG9hZCBNb3JlIGJ1dHRvbiBjbGljay5cblxuXG4vLyAgdmFsdWVzIGZvciBjdWlzaW5lcyBoYXZlIHRvIGFsbCBiZSBpbiBsb3dlciBjYXNlIC0gYWxsIHNob3VsZCBzdGFydCB3aXRoICZhbGxvd2VkQ3Vpc2luZVtdPVxuLy8gICZhbGxvd2VkQ3Vpc2luZVtdPWN1aXNpbmVeY3Vpc2luZS1hbWVyaWNhblxuLy8gICZhbGxvd2VkQ3Vpc2luZVtdPWN1aXNpbmVeY3Vpc2luZS1raWQtZnJpZW5kbHlcbi8vICBjdWlzaW5lXmN1aXNpbmUtaXRhbGlhblxuLy8gIGN1aXNpbmVeY3Vpc2luZS1hc2lhblxuLy8gIGN1aXNpbmVeY3Vpc2luZS1tZXhpY2FuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXNvdXRoZXJuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWZyZW5jaFxuLy8gIGN1aXNpbmVeY3Vpc2luZS1zb3V0aHdlc3Rlcm5cbi8vICBjdWlzaW5lXmN1aXNpbmUtYmFyYmVjdWUtYmJxXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWluZGlhblxuLy8gIGN1aXNpbmVeY3Vpc2luZS1jaGluZXNlXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWNhanVuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLW1lZGl0ZXJyYW5lYW5cbi8vICBjdWlzaW5lXmN1aXNpbmUtZ3JlZWtcbi8vICBjdWlzaW5lXmN1aXNpbmUtZW5nbGlzaFxuLy8gIGN1aXNpbmVeY3Vpc2luZS1zcGFuaXNoXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXRoYWlcbi8vICBjdWlzaW5lXmN1aXNpbmUtZ2VybWFuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLW1vcm9jY2FuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWlyaXNoXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWphcGFuZXNlXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWN1YmFuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWhhd2FpaWFuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXN3ZWRpc2hcbi8vICBjdWlzaW5lXmN1aXNpbmUtaHVuZ2FyaWFuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXBvcnR1Z3Vlc2VcblxuLy8gIHZhbHVlcyBmb3IgZGlldGFyeSBhcmUgYXMgZm9sbG93czogLSBhbGwgc2hvdWxkIHN0YXJ0IHdpdGggJmFsbG93ZWREaWV0W109XG4vLyAgMzg2XlZlZ2FuXG4vLyAgMzg3XkxhY3RvLW92byB2ZWdldGFyaWFuXG4vLyAgMzg4XkxhY3RvIHZlZ2V0YXJpYW5cbi8vICAzODleT3ZvIHZlZ2V0YXJpYW5cbi8vICAzOTBeUGVzY2V0YXJpYW5cbi8vICA0MDNeUGFsZW9cblxuLy8gIHZhbHVlcyBmb3IgY291cnNlIHR5cGVzIGFyZSBhcyBmb2xsb3dzOiAtIGFsbCBzaG91bGQgc3RhcnQgd2l0aCAmYWxsb3dlZENvdXJzZVtdPVxuLy8gIGNvdXJzZV5jb3Vyc2UtTWFpbiBEaXNoZXNcbi8vICBjb3Vyc2VeY291cnNlLURlc3NlcnRzXG4vLyAgY291cnNlXmNvdXJzZS1TaWRlIERpc2hlc1xuLy8gIGNvdXJzZV5jb3Vyc2UtQXBwZXRpemVyc1xuLy8gIGNvdXJzZV5jb3Vyc2UtU2FsYWRzXG4vLyAgY291cnNlXmNvdXJzZS1CcmVha2Zhc3QgYW5kIEJydW5jaFxuLy8gIGNvdXJzZV5jb3Vyc2UtQnJlYWRzXG4vLyAgY291cnNlXmNvdXJzZS1Tb3Vwc1xuLy8gIGNvdXJzZV5jb3Vyc2UtQmV2ZXJhZ2VzXG4vLyAgY291cnNlXmNvdXJzZS1Db25kaW1lbnRzIGFuZCBTYXVjZXNcbi8vICBjb3Vyc2VeY291cnNlLUNvY2t0YWlsc1xuLy8gIGNvdXJzZV5jb3Vyc2UtU25hY2tzXG4vLyAgY291cnNlXmNvdXJzZS1MdW5jaFxuXG4vLyAgUHJhdGlrIGN1cnJlbnQgdGFzazogc3RhcnRpbmcgb24gZm9ybSBsYXlvdXQgZm9yIHNlYXJjaGluZ1xuLy8gIENocmlzIGN1cnJlbnQgdGFzayAtIHdvcmsgb24gZ2V0dGluZyBkYXRhIGZyb20gQVBJIGFuZCBmaWx0ZXJpbmdcbiJdfQ==
