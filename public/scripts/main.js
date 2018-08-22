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
foodApp.getAllRecipes = function (ingredients, courseType, cuisineType, dietary) {
    $.ajax({
        url: '' + foodApp.allRecipiesApiURL + foodApp.apiKey + courseType + cuisineType + dietary,
        method: 'GET',
        dataType: 'json',
        data: {
            q: ingredients,
            maxResult: 21,
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
        var courses = "";
        if (result.attributes.course) {
            courses = result.attributes.course.join(', ');
        }
        var cuisines = "";
        if (result.attributes.cuisine) {
            cuisines = result.attributes.cuisine.join(', ');
        }
        var showRecipe = '<div class="recipe-container">\n        <div class="img-container"><img src=\'' + result.images[0].hostedLargeUrl + '\'></div>\n        <h2>' + result.name + '</h2>\n        <h3>Total Time to Prepare: ' + result.totalTime + '</h3>\n        <h3>Number of Servings: ' + result.numberOfServings + '</h3>\n        <h3>Course Types: ' + courses + '</h3>\n        <h3>Cuisine Types: ' + cuisines + '</h3>\n        </div>';
        $('.recipeList').append(showRecipe);
    });
};

//  the displayRecipes method takes the recipes and breaks them down to be displayed on screen
foodApp.displayRecipes = function (recipes) {
    $('.recipeList').empty();
    recipes.forEach(function (item) {
        foodApp.getSingleRecipe(item.id);
    });
};

//  the events method will hold general event listeners for the site
foodApp.events = function () {
    $('.recipe-search').on('submit', function (e) {
        e.preventDefault();
        var ingredients = $('input[type=text]').val();
        var courseType = $('input[name=course-type]:checked').val();
        var cuisineType = $('input[name=cuisine-type]:checked').map(function () {
            return $(this).val();
        }).get().join('');
        var dietary = $('input[name=dietary-restrictions]:checked').val();
        foodApp.getAllRecipes(ingredients, courseType, cuisineType, dietary);
        $('form').trigger('reset');
    });
};

//  the init method initializes all the necessary methods when the page loads
foodApp.init = function () {
    foodApp.events();
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

//  values to grab when displaying recipe to the page:
//  .images.hostedLargeUrl
//  .name
//  .source.sourceRecipeUrl
//  .totalTime
//  .numberOfServings
//  .attributes.course
//  .attributes.cuisine

//  Pratik current task: styling search form / display area
//  Chris current task - pagination

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0k7QUFDQTtBQUNKO0FBQ0k7O0FBRUosSUFBTSxVQUFVLEVBQWhCOztBQUVBLFFBQVEsS0FBUixHQUFnQixtQkFBaEI7QUFDQSxRQUFRLE1BQVIsR0FBaUIsNENBQWpCO0FBQ0EsUUFBUSxpQkFBUiw0Q0FBbUUsUUFBUSxLQUEzRTtBQUNBLFFBQVEsa0JBQVIsR0FBNkIsc0NBQTdCO0FBQ0EsUUFBUSxVQUFSLEdBQXFCLEVBQXJCOztBQUdBO0FBQ0EsUUFBUSxhQUFSLEdBQXdCLFVBQUMsV0FBRCxFQUFjLFVBQWQsRUFBMEIsV0FBMUIsRUFBdUMsT0FBdkMsRUFBbUQ7QUFDdkUsTUFBRSxJQUFGLENBQVE7QUFDSixrQkFBUSxRQUFRLGlCQUFoQixHQUFvQyxRQUFRLE1BQTVDLEdBQXFELFVBQXJELEdBQWtFLFdBQWxFLEdBQWdGLE9BRDVFO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVLE1BSE47QUFJSixjQUFNO0FBQ0YsZUFBRyxXQUREO0FBRUYsdUJBQVcsRUFGVDtBQUdGLG1CQUFPO0FBSEw7QUFKRixLQUFSLEVBVUMsSUFWRCxDQVVNLFVBQUMsTUFBRCxFQUFZO0FBQ2QsZ0JBQVEsY0FBUixDQUF1QixPQUFPLE9BQTlCO0FBQ0gsS0FaRDtBQWFILENBZEQ7O0FBZ0JBO0FBQ0EsUUFBUSxlQUFSLEdBQTBCLFVBQUMsUUFBRCxFQUFjO0FBQ3BDLE1BQUUsSUFBRixDQUFRO0FBQ0osa0JBQVEsUUFBUSxrQkFBaEIsR0FBcUMsUUFBckMsR0FBZ0QsUUFBUSxLQUF4RCxHQUFnRSxRQUFRLE1BRHBFO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVO0FBSE4sS0FBUixFQUtDLElBTEQsQ0FLTSxVQUFDLE1BQUQsRUFBWTtBQUNkLGdCQUFRLFVBQVIsQ0FBbUIsSUFBbkIsQ0FBd0IsTUFBeEI7QUFDQSxnQkFBUSxHQUFSLENBQVksTUFBWjtBQUNBLFlBQUksVUFBVSxFQUFkO0FBQ0EsWUFBRyxPQUFPLFVBQVAsQ0FBa0IsTUFBckIsRUFBNkI7QUFDekIsc0JBQVUsT0FBTyxVQUFQLENBQWtCLE1BQWxCLENBQXlCLElBQXpCLENBQThCLElBQTlCLENBQVY7QUFDSDtBQUNELFlBQUksV0FBVyxFQUFmO0FBQ0EsWUFBSSxPQUFPLFVBQVAsQ0FBa0IsT0FBdEIsRUFBK0I7QUFDM0IsdUJBQVcsT0FBTyxVQUFQLENBQWtCLE9BQWxCLENBQTBCLElBQTFCLENBQStCLElBQS9CLENBQVg7QUFDSDtBQUNELFlBQU0sZ0dBQ2lDLE9BQU8sTUFBUCxDQUFjLENBQWQsRUFBaUIsY0FEbEQsK0JBRUEsT0FBTyxJQUZQLGtEQUd1QixPQUFPLFNBSDlCLCtDQUlvQixPQUFPLGdCQUozQix5Q0FLYyxPQUxkLDBDQU1lLFFBTmYsMEJBQU47QUFRQSxVQUFFLGFBQUYsRUFBaUIsTUFBakIsQ0FBd0IsVUFBeEI7QUFDSCxLQXpCRDtBQTBCSCxDQTNCRDs7QUE2QkE7QUFDQSxRQUFRLGNBQVIsR0FBeUIsVUFBQyxPQUFELEVBQWE7QUFDbEMsTUFBRSxhQUFGLEVBQWlCLEtBQWpCO0FBQ0EsWUFBUSxPQUFSLENBQWdCLFVBQUMsSUFBRCxFQUFVO0FBQ3RCLGdCQUFRLGVBQVIsQ0FBd0IsS0FBSyxFQUE3QjtBQUNILEtBRkQ7QUFHSCxDQUxEOztBQU9BO0FBQ0EsUUFBUSxNQUFSLEdBQWlCLFlBQU07QUFDbkIsTUFBRSxnQkFBRixFQUFvQixFQUFwQixDQUF1QixRQUF2QixFQUFpQyxVQUFTLENBQVQsRUFBWTtBQUN6QyxVQUFFLGNBQUY7QUFDQSxZQUFNLGNBQWMsRUFBRSxrQkFBRixFQUFzQixHQUF0QixFQUFwQjtBQUNBLFlBQU0sYUFBYSxFQUFFLGlDQUFGLEVBQXFDLEdBQXJDLEVBQW5CO0FBQ0EsWUFBTSxjQUFjLEVBQUUsa0NBQUYsRUFBc0MsR0FBdEMsQ0FBMEMsWUFBVztBQUNyRSxtQkFBTyxFQUFFLElBQUYsRUFBUSxHQUFSLEVBQVA7QUFDSCxTQUZtQixFQUVqQixHQUZpQixHQUVYLElBRlcsQ0FFTixFQUZNLENBQXBCO0FBR0EsWUFBTSxVQUFVLEVBQUUsMENBQUYsRUFBOEMsR0FBOUMsRUFBaEI7QUFDQSxnQkFBUSxhQUFSLENBQXNCLFdBQXRCLEVBQW1DLFVBQW5DLEVBQStDLFdBQS9DLEVBQTRELE9BQTVEO0FBQ0EsVUFBRSxNQUFGLEVBQVUsT0FBVixDQUFrQixPQUFsQjtBQUNILEtBVkQ7QUFXSCxDQVpEOztBQWNBO0FBQ0EsUUFBUSxJQUFSLEdBQWUsWUFBTTtBQUNqQixZQUFRLE1BQVI7QUFDSCxDQUZEOztBQUlBO0FBQ0EsRUFBRSxZQUFXO0FBQ1QsWUFBUSxJQUFSO0FBQ0gsQ0FGRDs7QUFNQTs7O0FBR0E7Ozs7QUFJQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gIEN1c3RvbWVyIGVudGVycyB0aGVpciByZXF1aXJlZCBzZWFyY2ggcGFyYW1ldGVycyAoaW5ncmVkaWVudHMsIGNvdXJzZSB0eXBlLCBjdXNpc2luZSB0eXBlLCBkaWV0YXJ5IHJlc3RyaWN0aW9ucylcclxuICAgIC8vICBFeGFtcGxlIG9mIGEgc2VhcmNoIGZvciBjaGlja2VuIGFuZCBicm9jY29saSAvIE1haW4gZGlzaCAvIEl0YWxpYW4gLyBObyBkaWV0YXJ5IHJlc3RyaWN0aW9uXHJcbiAgICAgICAgLy8gIERvIGFuIEFQSSBjYWxsIGZvciBhbGwgcmVjaXBlcyB3aXRoIGNoaWNrZW4gYW5kIGJyb2Njb2xpXHJcbiAgICAgICAgLy8gIFRoZW4gZmlsdGVyIHRoZSByZXN1bHRzIGJhc2VkIG9uIHRoZSBvdGhlciBjcml0ZXJpYSAtIHN0YXJ0aW5nIHdpdGggY291cnNlIHR5cGUgLSB0aGVuIGN1aXNpbmUgdHlwZSAtIHRoZW4gZGlldGFyeSByZXN0cmNpdGlvbnNcclxuLy8gIFRoZSBkYXRhIGlzIHB1bGxlZCBmcm9tIHRoZSBBUEkgYW5kIGRpc3BsYXllZCBvbnRvIHRoZSBwYWdlIGluIGEgbGlzdFxyXG4gICAgLy8gIFRoZSBmaWx0ZXJlZCByZXN1bHRzIHdpbGwgdGhlbiBiZSBicm9rZW4gZG93biBpbnRvIGluZGl2aWR1YWwgcmVjaXBlcyAtIGRpc3BsYXlpbmcgYW4gaW1hZ2Ugb2YgdGhlIGRpc2gsIHRoZSBuYW1lIG9mIHRoZSBkaXNoIGFuZCBhIGRlc2NyaXB0aW9uIG9mIGl0XHJcbiAgICAvLyAgbmVlZCB0byBzdG9yZSByZWNpcGUgaWQgZnJvbSBlYWNoIGZpbHRlcmVkIHJlc3VsdCBhbmQgZG8gYSBzZXBhcmF0ZSBwdWxsIHRvIGdldCB0aGUgaW5mbyBmcm9tIHRoZXJlXHJcbi8vICBUaGUgcmVjaXBlcyB3aWxsIGJlIGNsaWNrYWJsZSB0byB0YWtlIHRoZW0gdG8gYSBmdWxsIHZpZXcgb2YgdGhlbVxyXG4gICAgLy8gIFRoZSByZWNpcGVzIHdpbGwgYmUgb3BlbmVkIGluIGEgbmV3IHRhYlxyXG5cclxuY29uc3QgZm9vZEFwcCA9IHt9O1xyXG5cclxuZm9vZEFwcC5hcGlJRCA9ICc/X2FwcF9pZD03MWVjM2UwNCdcclxuZm9vZEFwcC5hcGlLZXkgPSAnJl9hcHBfa2V5PWNjMWZkNGY2Y2UxNjdjMTE5OGZlYmQxNjJmZWE4MzkyJztcclxuZm9vZEFwcC5hbGxSZWNpcGllc0FwaVVSTCA9IGBodHRwOi8vYXBpLnl1bW1seS5jb20vdjEvYXBpL3JlY2lwZXMke2Zvb2RBcHAuYXBpSUR9YDtcclxuZm9vZEFwcC5zaW5nbGVSZWNpcGVBcGlVUkwgPSAnaHR0cDovL2FwaS55dW1tbHkuY29tL3YxL2FwaS9yZWNpcGUvJztcclxuZm9vZEFwcC5yZWNpcGVMaXN0ID0gW107XHJcblxyXG5cclxuLy8gIHRoZSBnZXRBbGxSZWNpcGVzIG1ldGhvZCB0YWtlcyBpbiB0aGUgcGFyYW1ldGVycyBmcm9tIHRoZSBzZWFyY2ggZm9ybSBhbmQgZ2V0cyB0aGUgbWF0Y2hpbmcgZGF0YSBmcm9tIHRoZSBBUElcclxuZm9vZEFwcC5nZXRBbGxSZWNpcGVzID0gKGluZ3JlZGllbnRzLCBjb3Vyc2VUeXBlLCBjdWlzaW5lVHlwZSwgZGlldGFyeSkgPT4ge1xyXG4gICAgJC5hamF4ICh7XHJcbiAgICAgICAgdXJsOiBgJHtmb29kQXBwLmFsbFJlY2lwaWVzQXBpVVJMfSR7Zm9vZEFwcC5hcGlLZXl9JHtjb3Vyc2VUeXBlfSR7Y3Vpc2luZVR5cGV9JHtkaWV0YXJ5fWAsXHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgcTogaW5ncmVkaWVudHMsXHJcbiAgICAgICAgICAgIG1heFJlc3VsdDogMjEsXHJcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgZm9vZEFwcC5kaXNwbGF5UmVjaXBlcyhyZXN1bHQubWF0Y2hlcyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gIHRoZSBnZXRTaW5nbGVSZWNpcGUgbWV0aG9kIHRha2VzIGluIGEgcmVjaXBlSUQgYW5kIHB1bGxzIHRoZSBpbmZvIGZvciB0aGF0IHNwZWNpZmljIHJlY2lwZVxyXG5mb29kQXBwLmdldFNpbmdsZVJlY2lwZSA9IChyZWNpcGVJRCkgPT4ge1xyXG4gICAgJC5hamF4ICh7XHJcbiAgICAgICAgdXJsOiBgJHtmb29kQXBwLnNpbmdsZVJlY2lwZUFwaVVSTH0ke3JlY2lwZUlEfSR7Zm9vZEFwcC5hcGlJRH0ke2Zvb2RBcHAuYXBpS2V5fWAsXHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgfSlcclxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICBmb29kQXBwLnJlY2lwZUxpc3QucHVzaChyZXN1bHQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcclxuICAgICAgICBsZXQgY291cnNlcyA9IFwiXCI7XHJcbiAgICAgICAgaWYocmVzdWx0LmF0dHJpYnV0ZXMuY291cnNlKSB7XHJcbiAgICAgICAgICAgIGNvdXJzZXMgPSByZXN1bHQuYXR0cmlidXRlcy5jb3Vyc2Uuam9pbignLCAnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY3Vpc2luZXMgPSBcIlwiO1xyXG4gICAgICAgIGlmIChyZXN1bHQuYXR0cmlidXRlcy5jdWlzaW5lKSB7XHJcbiAgICAgICAgICAgIGN1aXNpbmVzID0gcmVzdWx0LmF0dHJpYnV0ZXMuY3Vpc2luZS5qb2luKCcsICcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzaG93UmVjaXBlID0gYDxkaXYgY2xhc3M9XCJyZWNpcGUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImltZy1jb250YWluZXJcIj48aW1nIHNyYz0nJHtyZXN1bHQuaW1hZ2VzWzBdLmhvc3RlZExhcmdlVXJsfSc+PC9kaXY+XHJcbiAgICAgICAgPGgyPiR7cmVzdWx0Lm5hbWV9PC9oMj5cclxuICAgICAgICA8aDM+VG90YWwgVGltZSB0byBQcmVwYXJlOiAke3Jlc3VsdC50b3RhbFRpbWV9PC9oMz5cclxuICAgICAgICA8aDM+TnVtYmVyIG9mIFNlcnZpbmdzOiAke3Jlc3VsdC5udW1iZXJPZlNlcnZpbmdzfTwvaDM+XHJcbiAgICAgICAgPGgzPkNvdXJzZSBUeXBlczogJHtjb3Vyc2VzfTwvaDM+XHJcbiAgICAgICAgPGgzPkN1aXNpbmUgVHlwZXM6ICR7Y3Vpc2luZXN9PC9oMz5cclxuICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgJCgnLnJlY2lwZUxpc3QnKS5hcHBlbmQoc2hvd1JlY2lwZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gIHRoZSBkaXNwbGF5UmVjaXBlcyBtZXRob2QgdGFrZXMgdGhlIHJlY2lwZXMgYW5kIGJyZWFrcyB0aGVtIGRvd24gdG8gYmUgZGlzcGxheWVkIG9uIHNjcmVlblxyXG5mb29kQXBwLmRpc3BsYXlSZWNpcGVzID0gKHJlY2lwZXMpID0+IHtcclxuICAgICQoJy5yZWNpcGVMaXN0JykuZW1wdHkoKTtcclxuICAgIHJlY2lwZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGZvb2RBcHAuZ2V0U2luZ2xlUmVjaXBlKGl0ZW0uaWQpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vICB0aGUgZXZlbnRzIG1ldGhvZCB3aWxsIGhvbGQgZ2VuZXJhbCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBzaXRlXHJcbmZvb2RBcHAuZXZlbnRzID0gKCkgPT4ge1xyXG4gICAgJCgnLnJlY2lwZS1zZWFyY2gnKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCBpbmdyZWRpZW50cyA9ICQoJ2lucHV0W3R5cGU9dGV4dF0nKS52YWwoKTtcclxuICAgICAgICBjb25zdCBjb3Vyc2VUeXBlID0gJCgnaW5wdXRbbmFtZT1jb3Vyc2UtdHlwZV06Y2hlY2tlZCcpLnZhbCgpO1xyXG4gICAgICAgIGNvbnN0IGN1aXNpbmVUeXBlID0gJCgnaW5wdXRbbmFtZT1jdWlzaW5lLXR5cGVdOmNoZWNrZWQnKS5tYXAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgIH0pLmdldCgpLmpvaW4oJycpO1xyXG4gICAgICAgIGNvbnN0IGRpZXRhcnkgPSAkKCdpbnB1dFtuYW1lPWRpZXRhcnktcmVzdHJpY3Rpb25zXTpjaGVja2VkJykudmFsKClcclxuICAgICAgICBmb29kQXBwLmdldEFsbFJlY2lwZXMoaW5ncmVkaWVudHMsIGNvdXJzZVR5cGUsIGN1aXNpbmVUeXBlLCBkaWV0YXJ5KTtcclxuICAgICAgICAkKCdmb3JtJykudHJpZ2dlcigncmVzZXQnKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyAgdGhlIGluaXQgbWV0aG9kIGluaXRpYWxpemVzIGFsbCB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgd2hlbiB0aGUgcGFnZSBsb2Fkc1xyXG5mb29kQXBwLmluaXQgPSAoKSA9PiB7XHJcbiAgICBmb29kQXBwLmV2ZW50cygpO1xyXG59O1xyXG5cclxuLy8gIGRvY3VtZW50LnJlYWR5IHRvIGNhbGwgdGhlIGluaXQgbWV0aG9kIG9uY2UgdGhlIHBhZ2UgaXMgZmluaXNoZWQgbG9hZGluZ1xyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgZm9vZEFwcC5pbml0KCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG4vLyAgRXhhbXBsZSBmb3IgcGFnaW5hdGlvbiBsYXRlciBvblxyXG5cclxuXHJcbi8qIG1heFJlc3VsdCwgc3RhcnQgOiBUaGUgbWF4UmVzdWx0IGFuZCBzdGFydCBwYXJhbWV0ZXJzIGFsbG93IHBhZ2luYXRpb24gYW5kICMgb2YgcmVzdWx0cyBjb250cm9sLiBCeSBkZWZhdWx0IDYgcmVjaXBlcyBhcmUgcmV0dXJuZWQgYnkgdGhlIHNlYXJjaCBBUEkuXHJcbkZvciBleGFtcGxlLCBpZiB5b3Ugd2FudCAxMCByZWNpcGVzIHBlciBwYWdlIGFuZCB3YW50IHRvIHNlZSB0aGUgc2Vjb25kIHBhZ2Ugb2YgcmVzdWx0cywgeW91IHdvdWxkIGFwcGVuZCAmbWF4UmVzdWx0PTEwJnN0YXJ0PTEwLiBTdGFydCBpcyBzZXQgdG8gMTAgdmVyc3VzIGJlY2F1c2UgdGhlIG51bWJlcmluZyBmb3IgcmVzdWx0cyBzdGFydHMgYXQgMCAodmVyc3VzIDEpLlxyXG5Gb3IgZXhhbXBsZTogaHR0cDovL2FwaS55dW1tbHkuY29tL3YxL2FwaS9yZWNpcGVzP19hcHBfaWQ9WU9VUl9JRCZfYXBwX2tleT1ZT1VSX0FQUF9LRVkmcT1vbmlvbitzb3VwXHJcbiZtYXhSZXN1bHQ9MjAmc3RhcnQ9MTAgKi9cclxuLy8gIGNhbiBoYXZlIGEgdmFyaWFibGUgaW4gcGxhY2Ugb2YgdGhlIDEwIGZvciBzdGFydCB0aGF0IHdvdWxkIGluY3JlYXNlIG9uIGVhY2ggTG9hZCBNb3JlIGJ1dHRvbiBjbGljay5cclxuXHJcblxyXG4vLyAgdmFsdWVzIGZvciBjdWlzaW5lcyBoYXZlIHRvIGFsbCBiZSBpbiBsb3dlciBjYXNlIC0gYWxsIHNob3VsZCBzdGFydCB3aXRoICZhbGxvd2VkQ3Vpc2luZVtdPVxyXG4vLyAgJmFsbG93ZWRDdWlzaW5lW109Y3Vpc2luZV5jdWlzaW5lLWFtZXJpY2FuXHJcbi8vICAmYWxsb3dlZEN1aXNpbmVbXT1jdWlzaW5lXmN1aXNpbmUta2lkLWZyaWVuZGx5XHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtaXRhbGlhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWFzaWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtbWV4aWNhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXNvdXRoZXJuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtZnJlbmNoXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtc291dGh3ZXN0ZXJuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtYmFyYmVjdWUtYmJxXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtaW5kaWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtY2hpbmVzZVxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWNhanVuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtbWVkaXRlcnJhbmVhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWdyZWVrXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtZW5nbGlzaFxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXNwYW5pc2hcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS10aGFpXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtZ2VybWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtbW9yb2NjYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1pcmlzaFxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWphcGFuZXNlXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtY3ViYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1oYXdhaWlhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXN3ZWRpc2hcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1odW5nYXJpYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1wb3J0dWd1ZXNlXHJcblxyXG4vLyAgdmFsdWVzIGZvciBkaWV0YXJ5IGFyZSBhcyBmb2xsb3dzOiAtIGFsbCBzaG91bGQgc3RhcnQgd2l0aCAmYWxsb3dlZERpZXRbXT1cclxuLy8gIDM4Nl5WZWdhblxyXG4vLyAgMzg3XkxhY3RvLW92byB2ZWdldGFyaWFuXHJcbi8vICAzODheTGFjdG8gdmVnZXRhcmlhblxyXG4vLyAgMzg5Xk92byB2ZWdldGFyaWFuXHJcbi8vICAzOTBeUGVzY2V0YXJpYW5cclxuLy8gIDQwM15QYWxlb1xyXG5cclxuLy8gIHZhbHVlcyBmb3IgY291cnNlIHR5cGVzIGFyZSBhcyBmb2xsb3dzOiAtIGFsbCBzaG91bGQgc3RhcnQgd2l0aCAmYWxsb3dlZENvdXJzZVtdPVxyXG4vLyAgY291cnNlXmNvdXJzZS1NYWluIERpc2hlc1xyXG4vLyAgY291cnNlXmNvdXJzZS1EZXNzZXJ0c1xyXG4vLyAgY291cnNlXmNvdXJzZS1TaWRlIERpc2hlc1xyXG4vLyAgY291cnNlXmNvdXJzZS1BcHBldGl6ZXJzXHJcbi8vICBjb3Vyc2VeY291cnNlLVNhbGFkc1xyXG4vLyAgY291cnNlXmNvdXJzZS1CcmVha2Zhc3QgYW5kIEJydW5jaFxyXG4vLyAgY291cnNlXmNvdXJzZS1CcmVhZHNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtU291cHNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQmV2ZXJhZ2VzXHJcbi8vICBjb3Vyc2VeY291cnNlLUNvbmRpbWVudHMgYW5kIFNhdWNlc1xyXG4vLyAgY291cnNlXmNvdXJzZS1Db2NrdGFpbHNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtU25hY2tzXHJcbi8vICBjb3Vyc2VeY291cnNlLUx1bmNoXHJcblxyXG4vLyAgdmFsdWVzIHRvIGdyYWIgd2hlbiBkaXNwbGF5aW5nIHJlY2lwZSB0byB0aGUgcGFnZTpcclxuLy8gIC5pbWFnZXMuaG9zdGVkTGFyZ2VVcmxcclxuLy8gIC5uYW1lXHJcbi8vICAuc291cmNlLnNvdXJjZVJlY2lwZVVybFxyXG4vLyAgLnRvdGFsVGltZVxyXG4vLyAgLm51bWJlck9mU2VydmluZ3NcclxuLy8gIC5hdHRyaWJ1dGVzLmNvdXJzZVxyXG4vLyAgLmF0dHJpYnV0ZXMuY3Vpc2luZVxyXG5cclxuLy8gIFByYXRpayBjdXJyZW50IHRhc2s6IHN0eWxpbmcgc2VhcmNoIGZvcm0gLyBkaXNwbGF5IGFyZWFcclxuLy8gIENocmlzIGN1cnJlbnQgdGFzayAtIHBhZ2luYXRpb25cclxuIl19
