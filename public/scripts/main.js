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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0k7QUFDQTtBQUNKO0FBQ0k7O0FBRUosSUFBTSxVQUFVLEVBQWhCOztBQUVBLFFBQVEsS0FBUixHQUFnQixtQkFBaEI7QUFDQSxRQUFRLE1BQVIsR0FBaUIsNENBQWpCO0FBQ0EsUUFBUSxpQkFBUiw0Q0FBbUUsUUFBUSxLQUEzRTtBQUNBLFFBQVEsa0JBQVIsR0FBNkIsc0NBQTdCO0FBQ0EsUUFBUSxVQUFSLEdBQXFCLEVBQXJCOztBQUdBO0FBQ0EsUUFBUSxhQUFSLEdBQXdCLFVBQUMsV0FBRCxFQUFjLE9BQWQsRUFBdUIsV0FBdkIsRUFBdUM7QUFDM0QsTUFBRSxJQUFGLENBQVE7QUFDSixrQkFBUSxRQUFRLGlCQUFoQixHQUFvQyxRQUFRLE1BQTVDLEdBQXFELE9BQXJELEdBQStELFdBRDNEO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVLE1BSE47QUFJSixjQUFNO0FBQ0YsZUFBRyxXQUREO0FBRUYsdUJBQVcsRUFGVDtBQUdGLG1CQUFPO0FBSEw7QUFKRixLQUFSLEVBVUMsSUFWRCxDQVVNLFVBQUMsTUFBRCxFQUFZO0FBQ2QsZ0JBQVEsY0FBUixDQUF1QixPQUFPLE9BQTlCO0FBQ0gsS0FaRDtBQWFILENBZEQ7O0FBZ0JBO0FBQ0EsUUFBUSxlQUFSLEdBQTBCLFVBQUMsUUFBRCxFQUFXLFdBQVgsRUFBMkI7QUFDakQsTUFBRSxJQUFGLENBQVE7QUFDSixrQkFBUSxRQUFRLGtCQUFoQixHQUFxQyxRQUFyQyxHQUFnRCxRQUFRLEtBQXhELEdBQWdFLFFBQVEsTUFEcEU7QUFFSixnQkFBUSxLQUZKO0FBR0osa0JBQVU7QUFITixLQUFSLEVBS0MsSUFMRCxDQUtNLFVBQUMsTUFBRCxFQUFZO0FBQ2QsZ0JBQVEsVUFBUixDQUFtQixXQUFuQixJQUFrQyxNQUFsQztBQUNILEtBUEQ7QUFRSCxDQVREOztBQVdBO0FBQ0EsUUFBUSxjQUFSLEdBQXlCLFVBQUMsT0FBRCxFQUFhO0FBQ2xDLFFBQUksY0FBYyxDQUFsQjtBQUNBLFlBQVEsT0FBUixDQUFnQixVQUFDLElBQUQsRUFBVTtBQUN0QixnQkFBUSxlQUFSLENBQXdCLEtBQUssRUFBN0IsRUFBaUMsV0FBakM7QUFDQTtBQUNILEtBSEQ7QUFJQSxZQUFRLEdBQVIsQ0FBWSxRQUFRLFVBQXBCO0FBQ0gsQ0FQRDs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxNQUFSLEdBQWlCLFlBQU0sQ0FFdEIsQ0FGRDs7QUFJQTtBQUNBLFFBQVEsSUFBUixHQUFlLFlBQU07QUFDakIsWUFBUSxhQUFSLENBQXNCLGFBQXRCLEVBQXFDLEVBQXJDLEVBQXlDLDJIQUF6QztBQUNILENBRkQ7O0FBSUE7QUFDQSxFQUFFLFlBQVc7QUFDVCxZQUFRLElBQVI7QUFDSCxDQUZEOztBQU1BOzs7QUFHQTs7OztBQUlBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gIEN1c3RvbWVyIGVudGVycyB0aGVpciByZXF1aXJlZCBzZWFyY2ggcGFyYW1ldGVycyAoaW5ncmVkaWVudHMsIGNvdXJzZSB0eXBlLCBjdXNpc2luZSB0eXBlLCBkaWV0YXJ5IHJlc3RyaWN0aW9ucylcbiAgICAvLyAgRXhhbXBsZSBvZiBhIHNlYXJjaCBmb3IgY2hpY2tlbiBhbmQgYnJvY2NvbGkgLyBNYWluIGRpc2ggLyBJdGFsaWFuIC8gTm8gZGlldGFyeSByZXN0cmljdGlvblxuICAgICAgICAvLyAgRG8gYW4gQVBJIGNhbGwgZm9yIGFsbCByZWNpcGVzIHdpdGggY2hpY2tlbiBhbmQgYnJvY2NvbGlcbiAgICAgICAgLy8gIFRoZW4gZmlsdGVyIHRoZSByZXN1bHRzIGJhc2VkIG9uIHRoZSBvdGhlciBjcml0ZXJpYSAtIHN0YXJ0aW5nIHdpdGggY291cnNlIHR5cGUgLSB0aGVuIGN1aXNpbmUgdHlwZSAtIHRoZW4gZGlldGFyeSByZXN0cmNpdGlvbnNcbi8vICBUaGUgZGF0YSBpcyBwdWxsZWQgZnJvbSB0aGUgQVBJIGFuZCBkaXNwbGF5ZWQgb250byB0aGUgcGFnZSBpbiBhIGxpc3RcbiAgICAvLyAgVGhlIGZpbHRlcmVkIHJlc3VsdHMgd2lsbCB0aGVuIGJlIGJyb2tlbiBkb3duIGludG8gaW5kaXZpZHVhbCByZWNpcGVzIC0gZGlzcGxheWluZyBhbiBpbWFnZSBvZiB0aGUgZGlzaCwgdGhlIG5hbWUgb2YgdGhlIGRpc2ggYW5kIGEgZGVzY3JpcHRpb24gb2YgaXRcbiAgICAvLyAgbmVlZCB0byBzdG9yZSByZWNpcGUgaWQgZnJvbSBlYWNoIGZpbHRlcmVkIHJlc3VsdCBhbmQgZG8gYSBzZXBhcmF0ZSBwdWxsIHRvIGdldCB0aGUgaW5mbyBmcm9tIHRoZXJlXG4vLyAgVGhlIHJlY2lwZXMgd2lsbCBiZSBjbGlja2FibGUgdG8gdGFrZSB0aGVtIHRvIGEgZnVsbCB2aWV3IG9mIHRoZW1cbiAgICAvLyAgVGhlIHJlY2lwZXMgd2lsbCBiZSBvcGVuZWQgaW4gYSBuZXcgdGFiXG5cbmNvbnN0IGZvb2RBcHAgPSB7fTtcblxuZm9vZEFwcC5hcGlJRCA9ICc/X2FwcF9pZD03MWVjM2UwNCdcbmZvb2RBcHAuYXBpS2V5ID0gJyZfYXBwX2tleT1jYzFmZDRmNmNlMTY3YzExOThmZWJkMTYyZmVhODM5Mic7XG5mb29kQXBwLmFsbFJlY2lwaWVzQXBpVVJMID0gYGh0dHA6Ly9hcGkueXVtbWx5LmNvbS92MS9hcGkvcmVjaXBlcyR7Zm9vZEFwcC5hcGlJRH1gO1xuZm9vZEFwcC5zaW5nbGVSZWNpcGVBcGlVUkwgPSAnaHR0cDovL2FwaS55dW1tbHkuY29tL3YxL2FwaS9yZWNpcGUvJztcbmZvb2RBcHAucmVjaXBlTGlzdCA9IFtdO1xuXG5cbi8vICB0aGUgZ2V0QWxsUmVjaXBlcyBtZXRob2QgdGFrZXMgaW4gdGhlIHBhcmFtZXRlcnMgZnJvbSB0aGUgc2VhcmNoIGZvcm0gYW5kIGdldHMgdGhlIG1hdGNoaW5nIGRhdGEgZnJvbSB0aGUgQVBJXG5mb29kQXBwLmdldEFsbFJlY2lwZXMgPSAoaW5ncmVkaWVudHMsIGRpZXRhcnksIGN1aXNpbmVUeXBlKSA9PiB7XG4gICAgJC5hamF4ICh7XG4gICAgICAgIHVybDogYCR7Zm9vZEFwcC5hbGxSZWNpcGllc0FwaVVSTH0ke2Zvb2RBcHAuYXBpS2V5fSR7ZGlldGFyeX0ke2N1aXNpbmVUeXBlfWAsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHE6IGluZ3JlZGllbnRzLFxuICAgICAgICAgICAgbWF4UmVzdWx0OiAyMCxcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICB9XG4gICAgfSlcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGZvb2RBcHAuZGlzcGxheVJlY2lwZXMocmVzdWx0Lm1hdGNoZXMpO1xuICAgIH0pO1xufVxuXG4vLyAgdGhlIGdldFNpbmdsZVJlY2lwZSBtZXRob2QgdGFrZXMgaW4gYSByZWNpcGVJRCBhbmQgcHVsbHMgdGhlIGluZm8gZm9yIHRoYXQgc3BlY2lmaWMgcmVjaXBlXG5mb29kQXBwLmdldFNpbmdsZVJlY2lwZSA9IChyZWNpcGVJRCwgcmVjaXBlSW5kZXgpID0+IHtcbiAgICAkLmFqYXggKHtcbiAgICAgICAgdXJsOiBgJHtmb29kQXBwLnNpbmdsZVJlY2lwZUFwaVVSTH0ke3JlY2lwZUlEfSR7Zm9vZEFwcC5hcGlJRH0ke2Zvb2RBcHAuYXBpS2V5fWAsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgfSlcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGZvb2RBcHAucmVjaXBlTGlzdFtyZWNpcGVJbmRleF0gPSByZXN1bHQ7XG4gICAgfSk7XG59XG5cbi8vICB0aGUgZGlzcGxheVJlY2lwZXMgbWV0aG9kIHRha2VzIHRoZSByZWNpcGVzIGFuZCBicmVha3MgdGhlbSBkb3duIHRvIGJlIGRpc3BsYXllZCBvbiBzY3JlZW5cbmZvb2RBcHAuZGlzcGxheVJlY2lwZXMgPSAocmVjaXBlcykgPT4ge1xuICAgIGxldCByZWNpcGVJbmRleCA9IDA7XG4gICAgcmVjaXBlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGZvb2RBcHAuZ2V0U2luZ2xlUmVjaXBlKGl0ZW0uaWQsIHJlY2lwZUluZGV4KTtcbiAgICAgICAgcmVjaXBlSW5kZXgrKztcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhmb29kQXBwLnJlY2lwZUxpc3QpO1xufVxuXG4vLyAgdmFsdWVzIHRvIGdyYWIgd2hlbiBkaXNwbGF5aW5nIHJlY2lwZSB0byB0aGUgcGFnZTpcbi8vICAuaW1hZ2VzLmhvc3RlZExhcmdlVXJsXG4vLyAgLm5hbWVcbi8vICAuc291cmNlLnNvdXJjZVJlY2lwZVVybFxuLy8gIC50b3RhbFRpbWVcbi8vICAubnVtYmVyT2ZTZXJ2aW5nc1xuLy8gIC5hdHRyaWJ1dGVzLmNvdXJzZVxuLy8gIC5hdHRyaWJ1dGVzLmN1aXNpbmVcblxuLy8gIHRoZSBldmVudHMgbWV0aG9kIHdpbGwgaG9sZCBnZW5lcmFsIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHNpdGVcbmZvb2RBcHAuZXZlbnRzID0gKCkgPT4ge1xuXG59XG5cbi8vICB0aGUgaW5pdCBtZXRob2QgaW5pdGlhbGl6ZXMgYWxsIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyB3aGVuIHRoZSBwYWdlIGxvYWRzXG5mb29kQXBwLmluaXQgPSAoKSA9PiB7XG4gICAgZm9vZEFwcC5nZXRBbGxSZWNpcGVzKCdncm91bmQgYmVlZicsICcnLCAnJmFsbG93ZWRDdWlzaW5lW109Y3Vpc2luZV5jdWlzaW5lLWl0YWxpYW4mYWxsb3dlZEN1aXNpbmVbXT1jdWlzaW5lXmN1aXNpbmUtbWV4aWNhbiZhbGxvd2VkQ3Vpc2luZVtdPWN1aXNpbmVeY3Vpc2luZS1jdWJhbicpO1xufTtcblxuLy8gIGRvY3VtZW50LnJlYWR5IHRvIGNhbGwgdGhlIGluaXQgbWV0aG9kIG9uY2UgdGhlIHBhZ2UgaXMgZmluaXNoZWQgbG9hZGluZ1xuJChmdW5jdGlvbigpIHtcbiAgICBmb29kQXBwLmluaXQoKTtcbn0pO1xuXG5cblxuLy8gIEV4YW1wbGUgZm9yIHBhZ2luYXRpb24gbGF0ZXIgb25cblxuXG4vKiBtYXhSZXN1bHQsIHN0YXJ0IDogVGhlIG1heFJlc3VsdCBhbmQgc3RhcnQgcGFyYW1ldGVycyBhbGxvdyBwYWdpbmF0aW9uIGFuZCAjIG9mIHJlc3VsdHMgY29udHJvbC4gQnkgZGVmYXVsdCA2IHJlY2lwZXMgYXJlIHJldHVybmVkIGJ5IHRoZSBzZWFyY2ggQVBJLlxuRm9yIGV4YW1wbGUsIGlmIHlvdSB3YW50IDEwIHJlY2lwZXMgcGVyIHBhZ2UgYW5kIHdhbnQgdG8gc2VlIHRoZSBzZWNvbmQgcGFnZSBvZiByZXN1bHRzLCB5b3Ugd291bGQgYXBwZW5kICZtYXhSZXN1bHQ9MTAmc3RhcnQ9MTAuIFN0YXJ0IGlzIHNldCB0byAxMCB2ZXJzdXMgYmVjYXVzZSB0aGUgbnVtYmVyaW5nIGZvciByZXN1bHRzIHN0YXJ0cyBhdCAwICh2ZXJzdXMgMSkuXG5Gb3IgZXhhbXBsZTogaHR0cDovL2FwaS55dW1tbHkuY29tL3YxL2FwaS9yZWNpcGVzP19hcHBfaWQ9WU9VUl9JRCZfYXBwX2tleT1ZT1VSX0FQUF9LRVkmcT1vbmlvbitzb3VwXG4mbWF4UmVzdWx0PTIwJnN0YXJ0PTEwICovXG4vLyAgY2FuIGhhdmUgYSB2YXJpYWJsZSBpbiBwbGFjZSBvZiB0aGUgMTAgZm9yIHN0YXJ0IHRoYXQgd291bGQgaW5jcmVhc2Ugb24gZWFjaCBMb2FkIE1vcmUgYnV0dG9uIGNsaWNrLlxuXG5cbi8vICB2YWx1ZXMgZm9yIGN1aXNpbmVzIGhhdmUgdG8gYWxsIGJlIGluIGxvd2VyIGNhc2UgLSBhbGwgc2hvdWxkIHN0YXJ0IHdpdGggJmFsbG93ZWRDdWlzaW5lW109XG4vLyAgJmFsbG93ZWRDdWlzaW5lW109Y3Vpc2luZV5jdWlzaW5lLWFtZXJpY2FuXG4vLyAgJmFsbG93ZWRDdWlzaW5lW109Y3Vpc2luZV5jdWlzaW5lLWtpZC1mcmllbmRseVxuLy8gIGN1aXNpbmVeY3Vpc2luZS1pdGFsaWFuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWFzaWFuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLW1leGljYW5cbi8vICBjdWlzaW5lXmN1aXNpbmUtc291dGhlcm5cbi8vICBjdWlzaW5lXmN1aXNpbmUtZnJlbmNoXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXNvdXRod2VzdGVyblxuLy8gIGN1aXNpbmVeY3Vpc2luZS1iYXJiZWN1ZS1iYnFcbi8vICBjdWlzaW5lXmN1aXNpbmUtaW5kaWFuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWNoaW5lc2Vcbi8vICBjdWlzaW5lXmN1aXNpbmUtY2FqdW5cbi8vICBjdWlzaW5lXmN1aXNpbmUtbWVkaXRlcnJhbmVhblxuLy8gIGN1aXNpbmVeY3Vpc2luZS1ncmVla1xuLy8gIGN1aXNpbmVeY3Vpc2luZS1lbmdsaXNoXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXNwYW5pc2hcbi8vICBjdWlzaW5lXmN1aXNpbmUtdGhhaVxuLy8gIGN1aXNpbmVeY3Vpc2luZS1nZXJtYW5cbi8vICBjdWlzaW5lXmN1aXNpbmUtbW9yb2NjYW5cbi8vICBjdWlzaW5lXmN1aXNpbmUtaXJpc2hcbi8vICBjdWlzaW5lXmN1aXNpbmUtamFwYW5lc2Vcbi8vICBjdWlzaW5lXmN1aXNpbmUtY3ViYW5cbi8vICBjdWlzaW5lXmN1aXNpbmUtaGF3YWlpYW5cbi8vICBjdWlzaW5lXmN1aXNpbmUtc3dlZGlzaFxuLy8gIGN1aXNpbmVeY3Vpc2luZS1odW5nYXJpYW5cbi8vICBjdWlzaW5lXmN1aXNpbmUtcG9ydHVndWVzZVxuXG4vLyAgdmFsdWVzIGZvciBkaWV0YXJ5IGFyZSBhcyBmb2xsb3dzOiAtIGFsbCBzaG91bGQgc3RhcnQgd2l0aCAmYWxsb3dlZERpZXRbXT1cbi8vICAzODZeVmVnYW5cbi8vICAzODdeTGFjdG8tb3ZvIHZlZ2V0YXJpYW5cbi8vICAzODheTGFjdG8gdmVnZXRhcmlhblxuLy8gIDM4OV5Pdm8gdmVnZXRhcmlhblxuLy8gIDM5MF5QZXNjZXRhcmlhblxuLy8gIDQwM15QYWxlb1xuXG4vLyAgdmFsdWVzIGZvciBjb3Vyc2UgdHlwZXMgYXJlIGFzIGZvbGxvd3M6IC0gYWxsIHNob3VsZCBzdGFydCB3aXRoICZhbGxvd2VkQ291cnNlW109XG4vLyAgY291cnNlXmNvdXJzZS1NYWluIERpc2hlc1xuLy8gIGNvdXJzZV5jb3Vyc2UtRGVzc2VydHNcbi8vICBjb3Vyc2VeY291cnNlLVNpZGUgRGlzaGVzXG4vLyAgY291cnNlXmNvdXJzZS1BcHBldGl6ZXJzXG4vLyAgY291cnNlXmNvdXJzZS1TYWxhZHNcbi8vICBjb3Vyc2VeY291cnNlLUJyZWFrZmFzdCBhbmQgQnJ1bmNoXG4vLyAgY291cnNlXmNvdXJzZS1CcmVhZHNcbi8vICBjb3Vyc2VeY291cnNlLVNvdXBzXG4vLyAgY291cnNlXmNvdXJzZS1CZXZlcmFnZXNcbi8vICBjb3Vyc2VeY291cnNlLUNvbmRpbWVudHMgYW5kIFNhdWNlc1xuLy8gIGNvdXJzZV5jb3Vyc2UtQ29ja3RhaWxzXG4vLyAgY291cnNlXmNvdXJzZS1TbmFja3Ncbi8vICBjb3Vyc2VeY291cnNlLUx1bmNoXG5cbi8vICBQcmF0aWsgY3VycmVudCB0YXNrOiBzdGFydGluZyBvbiBmb3JtIGxheW91dCBmb3Igc2VhcmNoaW5nXG4vLyAgQ2hyaXMgY3VycmVudCB0YXNrIC0gd29yayBvbiBnZXR0aW5nIGRhdGEgZnJvbSBBUEkgYW5kIGZpbHRlcmluZ1xuIl19
