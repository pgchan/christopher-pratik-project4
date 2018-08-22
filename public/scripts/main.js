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
        var courses = result.attributes.course.join(', ');
        var cuisine = "";
        if (result.attributes.cuisine) {
            cuisine = result.attributes.cuisine.join(', ');
        }
        var showRecipe = '<div class="recipe-container">\n        <div class="img-container"><img src=\'' + result.images[0].hostedLargeUrl + '\'></div>\n        <h2>' + result.name + '</h2>\n        <h3>Total Time to Prepare: ' + result.totalTime + '</h3>\n        <h3>Number of Servings: ' + result.numberOfServings + '</h3>\n        <h3>Course Types: ' + courses + '</h3>\n        <h3>Cuisine Types: ' + cuisine + '</h3>\n        </div>';
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

//  Pratik current task: starting on form layout for searching
//  Chris current task - work on getting data from API and filtering

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTSxVQUFVLEVBQWhCOztBQUVBLFFBQVEsS0FBUixHQUFnQixtQkFBaEI7QUFDQSxRQUFRLE1BQVIsR0FBaUIsNENBQWpCO0FBQ0EsUUFBUSxpQkFBUiw0Q0FBbUUsUUFBUSxLQUEzRTtBQUNBLFFBQVEsa0JBQVIsR0FBNkIsc0NBQTdCO0FBQ0EsUUFBUSxVQUFSLEdBQXFCLEVBQXJCOztBQUdBO0FBQ0EsUUFBUSxhQUFSLEdBQXdCLFVBQUMsV0FBRCxFQUFjLFVBQWQsRUFBMEIsV0FBMUIsRUFBdUMsT0FBdkMsRUFBbUQ7QUFDdkUsTUFBRSxJQUFGLENBQVE7QUFDSixrQkFBUSxRQUFRLGlCQUFoQixHQUFvQyxRQUFRLE1BQTVDLEdBQXFELFVBQXJELEdBQWtFLFdBQWxFLEdBQWdGLE9BRDVFO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVLE1BSE47QUFJSixjQUFNO0FBQ0YsZUFBRyxXQUREO0FBRUYsdUJBQVcsRUFGVDtBQUdGLG1CQUFPO0FBSEw7QUFKRixLQUFSLEVBVUMsSUFWRCxDQVVNLFVBQUMsTUFBRCxFQUFZO0FBQ2QsZ0JBQVEsY0FBUixDQUF1QixPQUFPLE9BQTlCO0FBQ0gsS0FaRDtBQWFILENBZEQ7O0FBZ0JBO0FBQ0EsUUFBUSxlQUFSLEdBQTBCLFVBQUMsUUFBRCxFQUFjO0FBQ3BDLE1BQUUsSUFBRixDQUFRO0FBQ0osa0JBQVEsUUFBUSxrQkFBaEIsR0FBcUMsUUFBckMsR0FBZ0QsUUFBUSxLQUF4RCxHQUFnRSxRQUFRLE1BRHBFO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVO0FBSE4sS0FBUixFQUtDLElBTEQsQ0FLTSxVQUFDLE1BQUQsRUFBWTtBQUNkLGdCQUFRLFVBQVIsQ0FBbUIsSUFBbkIsQ0FBd0IsTUFBeEI7QUFDQSxnQkFBUSxHQUFSLENBQVksTUFBWjtBQUNBLFlBQU0sVUFBVSxPQUFPLFVBQVAsQ0FBa0IsTUFBbEIsQ0FBeUIsSUFBekIsQ0FBOEIsSUFBOUIsQ0FBaEI7QUFDQSxZQUFJLFVBQVUsRUFBZDtBQUNBLFlBQUksT0FBTyxVQUFQLENBQWtCLE9BQXRCLEVBQStCO0FBQzNCLHNCQUFVLE9BQU8sVUFBUCxDQUFrQixPQUFsQixDQUEwQixJQUExQixDQUErQixJQUEvQixDQUFWO0FBQ0g7QUFDRCxZQUFNLGdHQUNpQyxPQUFPLE1BQVAsQ0FBYyxDQUFkLEVBQWlCLGNBRGxELCtCQUVBLE9BQU8sSUFGUCxrREFHdUIsT0FBTyxTQUg5QiwrQ0FJb0IsT0FBTyxnQkFKM0IseUNBS2MsT0FMZCwwQ0FNZSxPQU5mLDBCQUFOO0FBUUEsVUFBRSxhQUFGLEVBQWlCLE1BQWpCLENBQXdCLFVBQXhCO0FBQ0E7QUFDSCxLQXZCRDtBQXdCSCxDQXpCRDs7QUEyQkE7QUFDQSxRQUFRLGNBQVIsR0FBeUIsVUFBQyxPQUFELEVBQWE7QUFDbEMsTUFBRSxhQUFGLEVBQWlCLEtBQWpCO0FBQ0EsWUFBUSxPQUFSLENBQWdCLFVBQUMsSUFBRCxFQUFVO0FBQ3RCLGdCQUFRLGVBQVIsQ0FBd0IsS0FBSyxFQUE3QjtBQUNILEtBRkQ7QUFHSCxDQUxEOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLE1BQVIsR0FBaUIsWUFBTTtBQUNuQixNQUFFLGdCQUFGLEVBQW9CLEVBQXBCLENBQXVCLFFBQXZCLEVBQWlDLFVBQVMsQ0FBVCxFQUFZO0FBQ3pDLFVBQUUsY0FBRjtBQUNBLFlBQU0sY0FBYyxFQUFFLGtCQUFGLEVBQXNCLEdBQXRCLEVBQXBCO0FBQ0EsWUFBTSxhQUFhLEVBQUUsaUNBQUYsRUFBcUMsR0FBckMsRUFBbkI7QUFDQSxZQUFNLGNBQWMsRUFBRSxrQ0FBRixFQUFzQyxHQUF0QyxDQUEwQyxZQUFXO0FBQ3JFLG1CQUFPLEVBQUUsSUFBRixFQUFRLEdBQVIsRUFBUDtBQUNILFNBRm1CLEVBRWpCLEdBRmlCLEdBRVgsSUFGVyxDQUVOLEVBRk0sQ0FBcEI7QUFHQSxZQUFNLFVBQVUsRUFBRSwwQ0FBRixFQUE4QyxHQUE5QyxFQUFoQjtBQUNBLGdCQUFRLGFBQVIsQ0FBc0IsV0FBdEIsRUFBbUMsVUFBbkMsRUFBK0MsV0FBL0MsRUFBNEQsT0FBNUQ7QUFDQSxVQUFFLE1BQUYsRUFBVSxPQUFWLENBQWtCLE9BQWxCO0FBQ0gsS0FWRDtBQVdILENBWkQ7O0FBY0E7QUFDQSxRQUFRLElBQVIsR0FBZSxZQUFNO0FBQ2pCLFlBQVEsTUFBUjtBQUNILENBRkQ7O0FBSUE7QUFDQSxFQUFFLFlBQVc7QUFDVCxZQUFRLElBQVI7QUFDSCxDQUZEOztBQU1BOzs7QUFHQTs7OztBQUlBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gIEN1c3RvbWVyIGVudGVycyB0aGVpciByZXF1aXJlZCBzZWFyY2ggcGFyYW1ldGVycyAoaW5ncmVkaWVudHMsIGNvdXJzZSB0eXBlLCBjdXNpc2luZSB0eXBlLCBkaWV0YXJ5IHJlc3RyaWN0aW9ucylcbi8vICBFeGFtcGxlIG9mIGEgc2VhcmNoIGZvciBjaGlja2VuIGFuZCBicm9jY29saSAvIE1haW4gZGlzaCAvIEl0YWxpYW4gLyBObyBkaWV0YXJ5IHJlc3RyaWN0aW9uXG4vLyAgRG8gYW4gQVBJIGNhbGwgZm9yIGFsbCByZWNpcGVzIHdpdGggY2hpY2tlbiBhbmQgYnJvY2NvbGlcbi8vICBUaGVuIGZpbHRlciB0aGUgcmVzdWx0cyBiYXNlZCBvbiB0aGUgb3RoZXIgY3JpdGVyaWEgLSBzdGFydGluZyB3aXRoIGNvdXJzZSB0eXBlIC0gdGhlbiBjdWlzaW5lIHR5cGUgLSB0aGVuIGRpZXRhcnkgcmVzdHJjaXRpb25zXG4vLyAgVGhlIGRhdGEgaXMgcHVsbGVkIGZyb20gdGhlIEFQSSBhbmQgZGlzcGxheWVkIG9udG8gdGhlIHBhZ2UgaW4gYSBsaXN0XG4vLyAgVGhlIGZpbHRlcmVkIHJlc3VsdHMgd2lsbCB0aGVuIGJlIGJyb2tlbiBkb3duIGludG8gaW5kaXZpZHVhbCByZWNpcGVzIC0gZGlzcGxheWluZyBhbiBpbWFnZSBvZiB0aGUgZGlzaCwgdGhlIG5hbWUgb2YgdGhlIGRpc2ggYW5kIGEgZGVzY3JpcHRpb24gb2YgaXRcbi8vICBuZWVkIHRvIHN0b3JlIHJlY2lwZSBpZCBmcm9tIGVhY2ggZmlsdGVyZWQgcmVzdWx0IGFuZCBkbyBhIHNlcGFyYXRlIHB1bGwgdG8gZ2V0IHRoZSBpbmZvIGZyb20gdGhlcmVcbi8vICBUaGUgcmVjaXBlcyB3aWxsIGJlIGNsaWNrYWJsZSB0byB0YWtlIHRoZW0gdG8gYSBmdWxsIHZpZXcgb2YgdGhlbVxuLy8gIFRoZSByZWNpcGVzIHdpbGwgYmUgb3BlbmVkIGluIGEgbmV3IHRhYlxuXG5jb25zdCBmb29kQXBwID0ge307XG5cbmZvb2RBcHAuYXBpSUQgPSAnP19hcHBfaWQ9NzFlYzNlMDQnXG5mb29kQXBwLmFwaUtleSA9ICcmX2FwcF9rZXk9Y2MxZmQ0ZjZjZTE2N2MxMTk4ZmViZDE2MmZlYTgzOTInO1xuZm9vZEFwcC5hbGxSZWNpcGllc0FwaVVSTCA9IGBodHRwOi8vYXBpLnl1bW1seS5jb20vdjEvYXBpL3JlY2lwZXMke2Zvb2RBcHAuYXBpSUR9YDtcbmZvb2RBcHAuc2luZ2xlUmVjaXBlQXBpVVJMID0gJ2h0dHA6Ly9hcGkueXVtbWx5LmNvbS92MS9hcGkvcmVjaXBlLyc7XG5mb29kQXBwLnJlY2lwZUxpc3QgPSBbXTtcblxuXG4vLyAgdGhlIGdldEFsbFJlY2lwZXMgbWV0aG9kIHRha2VzIGluIHRoZSBwYXJhbWV0ZXJzIGZyb20gdGhlIHNlYXJjaCBmb3JtIGFuZCBnZXRzIHRoZSBtYXRjaGluZyBkYXRhIGZyb20gdGhlIEFQSVxuZm9vZEFwcC5nZXRBbGxSZWNpcGVzID0gKGluZ3JlZGllbnRzLCBjb3Vyc2VUeXBlLCBjdWlzaW5lVHlwZSwgZGlldGFyeSkgPT4ge1xuICAgICQuYWpheCAoe1xuICAgICAgICB1cmw6IGAke2Zvb2RBcHAuYWxsUmVjaXBpZXNBcGlVUkx9JHtmb29kQXBwLmFwaUtleX0ke2NvdXJzZVR5cGV9JHtjdWlzaW5lVHlwZX0ke2RpZXRhcnl9YCxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgcTogaW5ncmVkaWVudHMsXG4gICAgICAgICAgICBtYXhSZXN1bHQ6IDIwLFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgZm9vZEFwcC5kaXNwbGF5UmVjaXBlcyhyZXN1bHQubWF0Y2hlcyk7XG4gICAgfSk7XG59XG5cbi8vICB0aGUgZ2V0U2luZ2xlUmVjaXBlIG1ldGhvZCB0YWtlcyBpbiBhIHJlY2lwZUlEIGFuZCBwdWxscyB0aGUgaW5mbyBmb3IgdGhhdCBzcGVjaWZpYyByZWNpcGVcbmZvb2RBcHAuZ2V0U2luZ2xlUmVjaXBlID0gKHJlY2lwZUlEKSA9PiB7XG4gICAgJC5hamF4ICh7XG4gICAgICAgIHVybDogYCR7Zm9vZEFwcC5zaW5nbGVSZWNpcGVBcGlVUkx9JHtyZWNpcGVJRH0ke2Zvb2RBcHAuYXBpSUR9JHtmb29kQXBwLmFwaUtleX1gLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgIH0pXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBmb29kQXBwLnJlY2lwZUxpc3QucHVzaChyZXN1bHQpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgIGNvbnN0IGNvdXJzZXMgPSByZXN1bHQuYXR0cmlidXRlcy5jb3Vyc2Uuam9pbignLCAnKTtcbiAgICAgICAgbGV0IGN1aXNpbmUgPSBcIlwiO1xuICAgICAgICBpZiAocmVzdWx0LmF0dHJpYnV0ZXMuY3Vpc2luZSkge1xuICAgICAgICAgICAgY3Vpc2luZSA9IHJlc3VsdC5hdHRyaWJ1dGVzLmN1aXNpbmUuam9pbignLCAnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzaG93UmVjaXBlID0gYDxkaXYgY2xhc3M9XCJyZWNpcGUtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbWctY29udGFpbmVyXCI+PGltZyBzcmM9JyR7cmVzdWx0LmltYWdlc1swXS5ob3N0ZWRMYXJnZVVybH0nPjwvZGl2PlxuICAgICAgICA8aDI+JHtyZXN1bHQubmFtZX08L2gyPlxuICAgICAgICA8aDM+VG90YWwgVGltZSB0byBQcmVwYXJlOiAke3Jlc3VsdC50b3RhbFRpbWV9PC9oMz5cbiAgICAgICAgPGgzPk51bWJlciBvZiBTZXJ2aW5nczogJHtyZXN1bHQubnVtYmVyT2ZTZXJ2aW5nc308L2gzPlxuICAgICAgICA8aDM+Q291cnNlIFR5cGVzOiAke2NvdXJzZXN9PC9oMz5cbiAgICAgICAgPGgzPkN1aXNpbmUgVHlwZXM6ICR7Y3Vpc2luZX08L2gzPlxuICAgICAgICA8L2Rpdj5gXG4gICAgICAgICQoJy5yZWNpcGVMaXN0JykuYXBwZW5kKHNob3dSZWNpcGUpO1xuICAgICAgICAvLyAgY2FuIHVzZSBhIGZvciBpbiBsb29wIHRvIGdvIHRocm91Z2ggdGhlIG9iamVjdFxuICAgIH0pO1xufVxuXG4vLyAgdGhlIGRpc3BsYXlSZWNpcGVzIG1ldGhvZCB0YWtlcyB0aGUgcmVjaXBlcyBhbmQgYnJlYWtzIHRoZW0gZG93biB0byBiZSBkaXNwbGF5ZWQgb24gc2NyZWVuXG5mb29kQXBwLmRpc3BsYXlSZWNpcGVzID0gKHJlY2lwZXMpID0+IHtcbiAgICAkKCcucmVjaXBlTGlzdCcpLmVtcHR5KCk7XG4gICAgcmVjaXBlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGZvb2RBcHAuZ2V0U2luZ2xlUmVjaXBlKGl0ZW0uaWQpO1xuICAgIH0pO1xufVxuXG4vLyAgdmFsdWVzIHRvIGdyYWIgd2hlbiBkaXNwbGF5aW5nIHJlY2lwZSB0byB0aGUgcGFnZTpcbi8vICAuaW1hZ2VzLmhvc3RlZExhcmdlVXJsXG4vLyAgLm5hbWVcbi8vICAuc291cmNlLnNvdXJjZVJlY2lwZVVybFxuLy8gIC50b3RhbFRpbWVcbi8vICAubnVtYmVyT2ZTZXJ2aW5nc1xuLy8gIC5hdHRyaWJ1dGVzLmNvdXJzZVxuLy8gIC5hdHRyaWJ1dGVzLmN1aXNpbmVcblxuLy8gIHRoZSBldmVudHMgbWV0aG9kIHdpbGwgaG9sZCBnZW5lcmFsIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHNpdGVcbmZvb2RBcHAuZXZlbnRzID0gKCkgPT4ge1xuICAgICQoJy5yZWNpcGUtc2VhcmNoJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBpbmdyZWRpZW50cyA9ICQoJ2lucHV0W3R5cGU9dGV4dF0nKS52YWwoKTtcbiAgICAgICAgY29uc3QgY291cnNlVHlwZSA9ICQoJ2lucHV0W25hbWU9Y291cnNlLXR5cGVdOmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgY29uc3QgY3Vpc2luZVR5cGUgPSAkKCdpbnB1dFtuYW1lPWN1aXNpbmUtdHlwZV06Y2hlY2tlZCcpLm1hcChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLnZhbCgpO1xuICAgICAgICB9KS5nZXQoKS5qb2luKCcnKTtcbiAgICAgICAgY29uc3QgZGlldGFyeSA9ICQoJ2lucHV0W25hbWU9ZGlldGFyeS1yZXN0cmljdGlvbnNdOmNoZWNrZWQnKS52YWwoKVxuICAgICAgICBmb29kQXBwLmdldEFsbFJlY2lwZXMoaW5ncmVkaWVudHMsIGNvdXJzZVR5cGUsIGN1aXNpbmVUeXBlLCBkaWV0YXJ5KTtcbiAgICAgICAgJCgnZm9ybScpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG4gICAgfSk7XG59XG5cbi8vICB0aGUgaW5pdCBtZXRob2QgaW5pdGlhbGl6ZXMgYWxsIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyB3aGVuIHRoZSBwYWdlIGxvYWRzXG5mb29kQXBwLmluaXQgPSAoKSA9PiB7XG4gICAgZm9vZEFwcC5ldmVudHMoKTtcbn07XG5cbi8vICBkb2N1bWVudC5yZWFkeSB0byBjYWxsIHRoZSBpbml0IG1ldGhvZCBvbmNlIHRoZSBwYWdlIGlzIGZpbmlzaGVkIGxvYWRpbmdcbiQoZnVuY3Rpb24oKSB7XG4gICAgZm9vZEFwcC5pbml0KCk7XG59KTtcblxuXG5cbi8vICBFeGFtcGxlIGZvciBwYWdpbmF0aW9uIGxhdGVyIG9uXG5cblxuLyogbWF4UmVzdWx0LCBzdGFydCA6IFRoZSBtYXhSZXN1bHQgYW5kIHN0YXJ0IHBhcmFtZXRlcnMgYWxsb3cgcGFnaW5hdGlvbiBhbmQgIyBvZiByZXN1bHRzIGNvbnRyb2wuIEJ5IGRlZmF1bHQgNiByZWNpcGVzIGFyZSByZXR1cm5lZCBieSB0aGUgc2VhcmNoIEFQSS5cbkZvciBleGFtcGxlLCBpZiB5b3Ugd2FudCAxMCByZWNpcGVzIHBlciBwYWdlIGFuZCB3YW50IHRvIHNlZSB0aGUgc2Vjb25kIHBhZ2Ugb2YgcmVzdWx0cywgeW91IHdvdWxkIGFwcGVuZCAmbWF4UmVzdWx0PTEwJnN0YXJ0PTEwLiBTdGFydCBpcyBzZXQgdG8gMTAgdmVyc3VzIGJlY2F1c2UgdGhlIG51bWJlcmluZyBmb3IgcmVzdWx0cyBzdGFydHMgYXQgMCAodmVyc3VzIDEpLlxuRm9yIGV4YW1wbGU6IGh0dHA6Ly9hcGkueXVtbWx5LmNvbS92MS9hcGkvcmVjaXBlcz9fYXBwX2lkPVlPVVJfSUQmX2FwcF9rZXk9WU9VUl9BUFBfS0VZJnE9b25pb24rc291cFxuJm1heFJlc3VsdD0yMCZzdGFydD0xMCAqL1xuLy8gIGNhbiBoYXZlIGEgdmFyaWFibGUgaW4gcGxhY2Ugb2YgdGhlIDEwIGZvciBzdGFydCB0aGF0IHdvdWxkIGluY3JlYXNlIG9uIGVhY2ggTG9hZCBNb3JlIGJ1dHRvbiBjbGljay5cblxuXG4vLyAgdmFsdWVzIGZvciBjdWlzaW5lcyBoYXZlIHRvIGFsbCBiZSBpbiBsb3dlciBjYXNlIC0gYWxsIHNob3VsZCBzdGFydCB3aXRoICZhbGxvd2VkQ3Vpc2luZVtdPVxuLy8gICZhbGxvd2VkQ3Vpc2luZVtdPWN1aXNpbmVeY3Vpc2luZS1hbWVyaWNhblxuLy8gICZhbGxvd2VkQ3Vpc2luZVtdPWN1aXNpbmVeY3Vpc2luZS1raWQtZnJpZW5kbHlcbi8vICBjdWlzaW5lXmN1aXNpbmUtaXRhbGlhblxuLy8gIGN1aXNpbmVeY3Vpc2luZS1hc2lhblxuLy8gIGN1aXNpbmVeY3Vpc2luZS1tZXhpY2FuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXNvdXRoZXJuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWZyZW5jaFxuLy8gIGN1aXNpbmVeY3Vpc2luZS1zb3V0aHdlc3Rlcm5cbi8vICBjdWlzaW5lXmN1aXNpbmUtYmFyYmVjdWUtYmJxXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWluZGlhblxuLy8gIGN1aXNpbmVeY3Vpc2luZS1jaGluZXNlXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWNhanVuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLW1lZGl0ZXJyYW5lYW5cbi8vICBjdWlzaW5lXmN1aXNpbmUtZ3JlZWtcbi8vICBjdWlzaW5lXmN1aXNpbmUtZW5nbGlzaFxuLy8gIGN1aXNpbmVeY3Vpc2luZS1zcGFuaXNoXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXRoYWlcbi8vICBjdWlzaW5lXmN1aXNpbmUtZ2VybWFuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLW1vcm9jY2FuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWlyaXNoXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWphcGFuZXNlXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWN1YmFuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWhhd2FpaWFuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXN3ZWRpc2hcbi8vICBjdWlzaW5lXmN1aXNpbmUtaHVuZ2FyaWFuXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXBvcnR1Z3Vlc2VcblxuLy8gIHZhbHVlcyBmb3IgZGlldGFyeSBhcmUgYXMgZm9sbG93czogLSBhbGwgc2hvdWxkIHN0YXJ0IHdpdGggJmFsbG93ZWREaWV0W109XG4vLyAgMzg2XlZlZ2FuXG4vLyAgMzg3XkxhY3RvLW92byB2ZWdldGFyaWFuXG4vLyAgMzg4XkxhY3RvIHZlZ2V0YXJpYW5cbi8vICAzODleT3ZvIHZlZ2V0YXJpYW5cbi8vICAzOTBeUGVzY2V0YXJpYW5cbi8vICA0MDNeUGFsZW9cblxuLy8gIHZhbHVlcyBmb3IgY291cnNlIHR5cGVzIGFyZSBhcyBmb2xsb3dzOiAtIGFsbCBzaG91bGQgc3RhcnQgd2l0aCAmYWxsb3dlZENvdXJzZVtdPVxuLy8gIGNvdXJzZV5jb3Vyc2UtTWFpbiBEaXNoZXNcbi8vICBjb3Vyc2VeY291cnNlLURlc3NlcnRzXG4vLyAgY291cnNlXmNvdXJzZS1TaWRlIERpc2hlc1xuLy8gIGNvdXJzZV5jb3Vyc2UtQXBwZXRpemVyc1xuLy8gIGNvdXJzZV5jb3Vyc2UtU2FsYWRzXG4vLyAgY291cnNlXmNvdXJzZS1CcmVha2Zhc3QgYW5kIEJydW5jaFxuLy8gIGNvdXJzZV5jb3Vyc2UtQnJlYWRzXG4vLyAgY291cnNlXmNvdXJzZS1Tb3Vwc1xuLy8gIGNvdXJzZV5jb3Vyc2UtQmV2ZXJhZ2VzXG4vLyAgY291cnNlXmNvdXJzZS1Db25kaW1lbnRzIGFuZCBTYXVjZXNcbi8vICBjb3Vyc2VeY291cnNlLUNvY2t0YWlsc1xuLy8gIGNvdXJzZV5jb3Vyc2UtU25hY2tzXG4vLyAgY291cnNlXmNvdXJzZS1MdW5jaFxuXG4vLyAgUHJhdGlrIGN1cnJlbnQgdGFzazogc3RhcnRpbmcgb24gZm9ybSBsYXlvdXQgZm9yIHNlYXJjaGluZ1xuLy8gIENocmlzIGN1cnJlbnQgdGFzayAtIHdvcmsgb24gZ2V0dGluZyBkYXRhIGZyb20gQVBJIGFuZCBmaWx0ZXJpbmdcbiJdfQ==
