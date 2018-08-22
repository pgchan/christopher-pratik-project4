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
foodApp.getSingleRecipe = function (recipeID, recipeIndex) {
    $.ajax({
        url: '' + foodApp.singleRecipeApiURL + recipeID + foodApp.apiID + foodApp.apiKey,
        method: 'GET',
        dataType: 'json'
    }).then(function (result) {
        foodApp.recipeList[recipeIndex] = result;
    });
};

//  the displayRecipes method takes the recipes and breaks them down to be displayed on screen
foodApp.displayRecipes = function (recipes) {
    var recipeIndex = 0;
    recipes.forEach(function (item) {
        foodApp.getSingleRecipe(item.id, recipeIndex);
        recipeIndex++;
    });
    console.log(foodApp.recipeList);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0k7QUFDQTtBQUNKO0FBQ0k7O0FBRUosSUFBTSxVQUFVLEVBQWhCOztBQUVBLFFBQVEsS0FBUixHQUFnQixtQkFBaEI7QUFDQSxRQUFRLE1BQVIsR0FBaUIsNENBQWpCO0FBQ0EsUUFBUSxpQkFBUiw0Q0FBbUUsUUFBUSxLQUEzRTtBQUNBLFFBQVEsa0JBQVIsR0FBNkIsc0NBQTdCO0FBQ0EsUUFBUSxVQUFSLEdBQXFCLEVBQXJCOztBQUdBO0FBQ0EsUUFBUSxhQUFSLEdBQXdCLFVBQUMsV0FBRCxFQUFjLE9BQWQsRUFBdUIsV0FBdkIsRUFBdUM7QUFDM0QsTUFBRSxJQUFGLENBQVE7QUFDSixrQkFBUSxRQUFRLGlCQUFoQixHQUFvQyxRQUFRLE1BQTVDLEdBQXFELE9BQXJELEdBQStELFdBRDNEO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVLE1BSE47QUFJSixjQUFNO0FBQ0YsZUFBRyxXQUREO0FBRUYsdUJBQVcsRUFGVDtBQUdGLG1CQUFPO0FBSEw7QUFKRixLQUFSLEVBVUMsSUFWRCxDQVVNLFVBQUMsTUFBRCxFQUFZO0FBQ2QsZ0JBQVEsY0FBUixDQUF1QixPQUFPLE9BQTlCO0FBQ0gsS0FaRDtBQWFILENBZEQ7O0FBZ0JBO0FBQ0EsUUFBUSxlQUFSLEdBQTBCLFVBQUMsUUFBRCxFQUFXLFdBQVgsRUFBMkI7QUFDakQsTUFBRSxJQUFGLENBQVE7QUFDSixrQkFBUSxRQUFRLGtCQUFoQixHQUFxQyxRQUFyQyxHQUFnRCxRQUFRLEtBQXhELEdBQWdFLFFBQVEsTUFEcEU7QUFFSixnQkFBUSxLQUZKO0FBR0osa0JBQVU7QUFITixLQUFSLEVBS0MsSUFMRCxDQUtNLFVBQUMsTUFBRCxFQUFZO0FBQ2QsZ0JBQVEsVUFBUixDQUFtQixXQUFuQixJQUFrQyxNQUFsQztBQUNILEtBUEQ7QUFRSCxDQVREOztBQVdBO0FBQ0EsUUFBUSxjQUFSLEdBQXlCLFVBQUMsT0FBRCxFQUFhO0FBQ2xDLFFBQUksY0FBYyxDQUFsQjtBQUNBLFlBQVEsT0FBUixDQUFnQixVQUFDLElBQUQsRUFBVTtBQUN0QixnQkFBUSxlQUFSLENBQXdCLEtBQUssRUFBN0IsRUFBaUMsV0FBakM7QUFDQTtBQUNILEtBSEQ7QUFJQSxZQUFRLEdBQVIsQ0FBWSxRQUFRLFVBQXBCO0FBQ0gsQ0FQRDs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxNQUFSLEdBQWlCLFlBQU0sQ0FFdEIsQ0FGRDs7QUFJQTtBQUNBLFFBQVEsSUFBUixHQUFlLFlBQU07QUFDakIsWUFBUSxhQUFSLENBQXNCLGFBQXRCLEVBQXFDLEVBQXJDLEVBQXlDLDJIQUF6QztBQUNILENBRkQ7O0FBSUE7QUFDQSxFQUFFLFlBQVc7QUFDVCxZQUFRLElBQVI7QUFDSCxDQUZEOztBQU1BOzs7QUFHQTs7OztBQUlBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gIEN1c3RvbWVyIGVudGVycyB0aGVpciByZXF1aXJlZCBzZWFyY2ggcGFyYW1ldGVycyAoaW5ncmVkaWVudHMsIGNvdXJzZSB0eXBlLCBjdXNpc2luZSB0eXBlLCBkaWV0YXJ5IHJlc3RyaWN0aW9ucylcclxuICAgIC8vICBFeGFtcGxlIG9mIGEgc2VhcmNoIGZvciBjaGlja2VuIGFuZCBicm9jY29saSAvIE1haW4gZGlzaCAvIEl0YWxpYW4gLyBObyBkaWV0YXJ5IHJlc3RyaWN0aW9uXHJcbiAgICAgICAgLy8gIERvIGFuIEFQSSBjYWxsIGZvciBhbGwgcmVjaXBlcyB3aXRoIGNoaWNrZW4gYW5kIGJyb2Njb2xpXHJcbiAgICAgICAgLy8gIFRoZW4gZmlsdGVyIHRoZSByZXN1bHRzIGJhc2VkIG9uIHRoZSBvdGhlciBjcml0ZXJpYSAtIHN0YXJ0aW5nIHdpdGggY291cnNlIHR5cGUgLSB0aGVuIGN1aXNpbmUgdHlwZSAtIHRoZW4gZGlldGFyeSByZXN0cmNpdGlvbnNcclxuLy8gIFRoZSBkYXRhIGlzIHB1bGxlZCBmcm9tIHRoZSBBUEkgYW5kIGRpc3BsYXllZCBvbnRvIHRoZSBwYWdlIGluIGEgbGlzdFxyXG4gICAgLy8gIFRoZSBmaWx0ZXJlZCByZXN1bHRzIHdpbGwgdGhlbiBiZSBicm9rZW4gZG93biBpbnRvIGluZGl2aWR1YWwgcmVjaXBlcyAtIGRpc3BsYXlpbmcgYW4gaW1hZ2Ugb2YgdGhlIGRpc2gsIHRoZSBuYW1lIG9mIHRoZSBkaXNoIGFuZCBhIGRlc2NyaXB0aW9uIG9mIGl0XHJcbiAgICAvLyAgbmVlZCB0byBzdG9yZSByZWNpcGUgaWQgZnJvbSBlYWNoIGZpbHRlcmVkIHJlc3VsdCBhbmQgZG8gYSBzZXBhcmF0ZSBwdWxsIHRvIGdldCB0aGUgaW5mbyBmcm9tIHRoZXJlXHJcbi8vICBUaGUgcmVjaXBlcyB3aWxsIGJlIGNsaWNrYWJsZSB0byB0YWtlIHRoZW0gdG8gYSBmdWxsIHZpZXcgb2YgdGhlbVxyXG4gICAgLy8gIFRoZSByZWNpcGVzIHdpbGwgYmUgb3BlbmVkIGluIGEgbmV3IHRhYlxyXG5cclxuY29uc3QgZm9vZEFwcCA9IHt9O1xyXG5cclxuZm9vZEFwcC5hcGlJRCA9ICc/X2FwcF9pZD03MWVjM2UwNCdcclxuZm9vZEFwcC5hcGlLZXkgPSAnJl9hcHBfa2V5PWNjMWZkNGY2Y2UxNjdjMTE5OGZlYmQxNjJmZWE4MzkyJztcclxuZm9vZEFwcC5hbGxSZWNpcGllc0FwaVVSTCA9IGBodHRwOi8vYXBpLnl1bW1seS5jb20vdjEvYXBpL3JlY2lwZXMke2Zvb2RBcHAuYXBpSUR9YDtcclxuZm9vZEFwcC5zaW5nbGVSZWNpcGVBcGlVUkwgPSAnaHR0cDovL2FwaS55dW1tbHkuY29tL3YxL2FwaS9yZWNpcGUvJztcclxuZm9vZEFwcC5yZWNpcGVMaXN0ID0gW107XHJcblxyXG5cclxuLy8gIHRoZSBnZXRBbGxSZWNpcGVzIG1ldGhvZCB0YWtlcyBpbiB0aGUgcGFyYW1ldGVycyBmcm9tIHRoZSBzZWFyY2ggZm9ybSBhbmQgZ2V0cyB0aGUgbWF0Y2hpbmcgZGF0YSBmcm9tIHRoZSBBUElcclxuZm9vZEFwcC5nZXRBbGxSZWNpcGVzID0gKGluZ3JlZGllbnRzLCBkaWV0YXJ5LCBjdWlzaW5lVHlwZSkgPT4ge1xyXG4gICAgJC5hamF4ICh7XHJcbiAgICAgICAgdXJsOiBgJHtmb29kQXBwLmFsbFJlY2lwaWVzQXBpVVJMfSR7Zm9vZEFwcC5hcGlLZXl9JHtkaWV0YXJ5fSR7Y3Vpc2luZVR5cGV9YCxcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBxOiBpbmdyZWRpZW50cyxcclxuICAgICAgICAgICAgbWF4UmVzdWx0OiAyMCxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICBmb29kQXBwLmRpc3BsYXlSZWNpcGVzKHJlc3VsdC5tYXRjaGVzKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyAgdGhlIGdldFNpbmdsZVJlY2lwZSBtZXRob2QgdGFrZXMgaW4gYSByZWNpcGVJRCBhbmQgcHVsbHMgdGhlIGluZm8gZm9yIHRoYXQgc3BlY2lmaWMgcmVjaXBlXHJcbmZvb2RBcHAuZ2V0U2luZ2xlUmVjaXBlID0gKHJlY2lwZUlELCByZWNpcGVJbmRleCkgPT4ge1xyXG4gICAgJC5hamF4ICh7XHJcbiAgICAgICAgdXJsOiBgJHtmb29kQXBwLnNpbmdsZVJlY2lwZUFwaVVSTH0ke3JlY2lwZUlEfSR7Zm9vZEFwcC5hcGlJRH0ke2Zvb2RBcHAuYXBpS2V5fWAsXHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgfSlcclxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICBmb29kQXBwLnJlY2lwZUxpc3RbcmVjaXBlSW5kZXhdID0gcmVzdWx0O1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vICB0aGUgZGlzcGxheVJlY2lwZXMgbWV0aG9kIHRha2VzIHRoZSByZWNpcGVzIGFuZCBicmVha3MgdGhlbSBkb3duIHRvIGJlIGRpc3BsYXllZCBvbiBzY3JlZW5cclxuZm9vZEFwcC5kaXNwbGF5UmVjaXBlcyA9IChyZWNpcGVzKSA9PiB7XHJcbiAgICBsZXQgcmVjaXBlSW5kZXggPSAwO1xyXG4gICAgcmVjaXBlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgZm9vZEFwcC5nZXRTaW5nbGVSZWNpcGUoaXRlbS5pZCwgcmVjaXBlSW5kZXgpO1xyXG4gICAgICAgIHJlY2lwZUluZGV4Kys7XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKGZvb2RBcHAucmVjaXBlTGlzdCk7XHJcbn1cclxuXHJcbi8vICB2YWx1ZXMgdG8gZ3JhYiB3aGVuIGRpc3BsYXlpbmcgcmVjaXBlIHRvIHRoZSBwYWdlOlxyXG4vLyAgLmltYWdlcy5ob3N0ZWRMYXJnZVVybFxyXG4vLyAgLm5hbWVcclxuLy8gIC5zb3VyY2Uuc291cmNlUmVjaXBlVXJsXHJcbi8vICAudG90YWxUaW1lXHJcbi8vICAubnVtYmVyT2ZTZXJ2aW5nc1xyXG4vLyAgLmF0dHJpYnV0ZXMuY291cnNlXHJcbi8vICAuYXR0cmlidXRlcy5jdWlzaW5lXHJcblxyXG4vLyAgdGhlIGV2ZW50cyBtZXRob2Qgd2lsbCBob2xkIGdlbmVyYWwgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgc2l0ZVxyXG5mb29kQXBwLmV2ZW50cyA9ICgpID0+IHtcclxuXHJcbn1cclxuXHJcbi8vICB0aGUgaW5pdCBtZXRob2QgaW5pdGlhbGl6ZXMgYWxsIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyB3aGVuIHRoZSBwYWdlIGxvYWRzXHJcbmZvb2RBcHAuaW5pdCA9ICgpID0+IHtcclxuICAgIGZvb2RBcHAuZ2V0QWxsUmVjaXBlcygnZ3JvdW5kIGJlZWYnLCAnJywgJyZhbGxvd2VkQ3Vpc2luZVtdPWN1aXNpbmVeY3Vpc2luZS1pdGFsaWFuJmFsbG93ZWRDdWlzaW5lW109Y3Vpc2luZV5jdWlzaW5lLW1leGljYW4mYWxsb3dlZEN1aXNpbmVbXT1jdWlzaW5lXmN1aXNpbmUtY3ViYW4nKTtcclxufTtcclxuXHJcbi8vICBkb2N1bWVudC5yZWFkeSB0byBjYWxsIHRoZSBpbml0IG1ldGhvZCBvbmNlIHRoZSBwYWdlIGlzIGZpbmlzaGVkIGxvYWRpbmdcclxuJChmdW5jdGlvbigpIHtcclxuICAgIGZvb2RBcHAuaW5pdCgpO1xyXG59KTtcclxuXHJcblxyXG5cclxuLy8gIEV4YW1wbGUgZm9yIHBhZ2luYXRpb24gbGF0ZXIgb25cclxuXHJcblxyXG4vKiBtYXhSZXN1bHQsIHN0YXJ0IDogVGhlIG1heFJlc3VsdCBhbmQgc3RhcnQgcGFyYW1ldGVycyBhbGxvdyBwYWdpbmF0aW9uIGFuZCAjIG9mIHJlc3VsdHMgY29udHJvbC4gQnkgZGVmYXVsdCA2IHJlY2lwZXMgYXJlIHJldHVybmVkIGJ5IHRoZSBzZWFyY2ggQVBJLlxyXG5Gb3IgZXhhbXBsZSwgaWYgeW91IHdhbnQgMTAgcmVjaXBlcyBwZXIgcGFnZSBhbmQgd2FudCB0byBzZWUgdGhlIHNlY29uZCBwYWdlIG9mIHJlc3VsdHMsIHlvdSB3b3VsZCBhcHBlbmQgJm1heFJlc3VsdD0xMCZzdGFydD0xMC4gU3RhcnQgaXMgc2V0IHRvIDEwIHZlcnN1cyBiZWNhdXNlIHRoZSBudW1iZXJpbmcgZm9yIHJlc3VsdHMgc3RhcnRzIGF0IDAgKHZlcnN1cyAxKS5cclxuRm9yIGV4YW1wbGU6IGh0dHA6Ly9hcGkueXVtbWx5LmNvbS92MS9hcGkvcmVjaXBlcz9fYXBwX2lkPVlPVVJfSUQmX2FwcF9rZXk9WU9VUl9BUFBfS0VZJnE9b25pb24rc291cFxyXG4mbWF4UmVzdWx0PTIwJnN0YXJ0PTEwICovXHJcbi8vICBjYW4gaGF2ZSBhIHZhcmlhYmxlIGluIHBsYWNlIG9mIHRoZSAxMCBmb3Igc3RhcnQgdGhhdCB3b3VsZCBpbmNyZWFzZSBvbiBlYWNoIExvYWQgTW9yZSBidXR0b24gY2xpY2suXHJcblxyXG5cclxuLy8gIHZhbHVlcyBmb3IgY3Vpc2luZXMgaGF2ZSB0byBhbGwgYmUgaW4gbG93ZXIgY2FzZSAtIGFsbCBzaG91bGQgc3RhcnQgd2l0aCAmYWxsb3dlZEN1aXNpbmVbXT1cclxuLy8gICZhbGxvd2VkQ3Vpc2luZVtdPWN1aXNpbmVeY3Vpc2luZS1hbWVyaWNhblxyXG4vLyAgJmFsbG93ZWRDdWlzaW5lW109Y3Vpc2luZV5jdWlzaW5lLWtpZC1mcmllbmRseVxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWl0YWxpYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1hc2lhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLW1leGljYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1zb3V0aGVyblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWZyZW5jaFxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXNvdXRod2VzdGVyblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWJhcmJlY3VlLWJicVxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWluZGlhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWNoaW5lc2VcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1jYWp1blxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLW1lZGl0ZXJyYW5lYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1ncmVla1xyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWVuZ2xpc2hcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1zcGFuaXNoXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtdGhhaVxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWdlcm1hblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLW1vcm9jY2FuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtaXJpc2hcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1qYXBhbmVzZVxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWN1YmFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtaGF3YWlpYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1zd2VkaXNoXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtaHVuZ2FyaWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtcG9ydHVndWVzZVxyXG5cclxuLy8gIHZhbHVlcyBmb3IgZGlldGFyeSBhcmUgYXMgZm9sbG93czogLSBhbGwgc2hvdWxkIHN0YXJ0IHdpdGggJmFsbG93ZWREaWV0W109XHJcbi8vICAzODZeVmVnYW5cclxuLy8gIDM4N15MYWN0by1vdm8gdmVnZXRhcmlhblxyXG4vLyAgMzg4XkxhY3RvIHZlZ2V0YXJpYW5cclxuLy8gIDM4OV5Pdm8gdmVnZXRhcmlhblxyXG4vLyAgMzkwXlBlc2NldGFyaWFuXHJcbi8vICA0MDNeUGFsZW9cclxuXHJcbi8vICB2YWx1ZXMgZm9yIGNvdXJzZSB0eXBlcyBhcmUgYXMgZm9sbG93czogLSBhbGwgc2hvdWxkIHN0YXJ0IHdpdGggJmFsbG93ZWRDb3Vyc2VbXT1cclxuLy8gIGNvdXJzZV5jb3Vyc2UtTWFpbiBEaXNoZXNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtRGVzc2VydHNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtU2lkZSBEaXNoZXNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQXBwZXRpemVyc1xyXG4vLyAgY291cnNlXmNvdXJzZS1TYWxhZHNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQnJlYWtmYXN0IGFuZCBCcnVuY2hcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQnJlYWRzXHJcbi8vICBjb3Vyc2VeY291cnNlLVNvdXBzXHJcbi8vICBjb3Vyc2VeY291cnNlLUJldmVyYWdlc1xyXG4vLyAgY291cnNlXmNvdXJzZS1Db25kaW1lbnRzIGFuZCBTYXVjZXNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQ29ja3RhaWxzXHJcbi8vICBjb3Vyc2VeY291cnNlLVNuYWNrc1xyXG4vLyAgY291cnNlXmNvdXJzZS1MdW5jaFxyXG5cclxuLy8gIFByYXRpayBjdXJyZW50IHRhc2s6IHN0YXJ0aW5nIG9uIGZvcm0gbGF5b3V0IGZvciBzZWFyY2hpbmdcclxuLy8gIENocmlzIGN1cnJlbnQgdGFzayAtIHdvcmsgb24gZ2V0dGluZyBkYXRhIGZyb20gQVBJIGFuZCBmaWx0ZXJpbmdcclxuIl19
