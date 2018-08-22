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
        var showRecipe = '<div>\n        <img src=\'' + result.images[0].hostedLargeUrl + '\'>\n        <h2>' + result.name + '</h2>\n        <h3>Total Time to Prepare: ' + result.totalTime + '</h3>\n        <h3>Number of Servings: ' + result.numberOfServings + '</h3>\n        <h3>Course Types: ' + courses + '</h3>\n        <h3>Cuisine Types: ' + cuisine + '</h3>\n        </div>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0k7QUFDQTtBQUNKO0FBQ0k7O0FBRUosSUFBTSxVQUFVLEVBQWhCOztBQUVBLFFBQVEsS0FBUixHQUFnQixtQkFBaEI7QUFDQSxRQUFRLE1BQVIsR0FBaUIsNENBQWpCO0FBQ0EsUUFBUSxpQkFBUiw0Q0FBbUUsUUFBUSxLQUEzRTtBQUNBLFFBQVEsa0JBQVIsR0FBNkIsc0NBQTdCO0FBQ0EsUUFBUSxVQUFSLEdBQXFCLEVBQXJCOztBQUdBO0FBQ0EsUUFBUSxhQUFSLEdBQXdCLFVBQUMsV0FBRCxFQUFjLFVBQWQsRUFBMEIsV0FBMUIsRUFBdUMsT0FBdkMsRUFBbUQ7QUFDdkUsTUFBRSxJQUFGLENBQVE7QUFDSixrQkFBUSxRQUFRLGlCQUFoQixHQUFvQyxRQUFRLE1BQTVDLEdBQXFELFVBQXJELEdBQWtFLFdBQWxFLEdBQWdGLE9BRDVFO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVLE1BSE47QUFJSixjQUFNO0FBQ0YsZUFBRyxXQUREO0FBRUYsdUJBQVcsRUFGVDtBQUdGLG1CQUFPO0FBSEw7QUFKRixLQUFSLEVBVUMsSUFWRCxDQVVNLFVBQUMsTUFBRCxFQUFZO0FBQ2QsZ0JBQVEsY0FBUixDQUF1QixPQUFPLE9BQTlCO0FBQ0gsS0FaRDtBQWFILENBZEQ7O0FBZ0JBO0FBQ0EsUUFBUSxlQUFSLEdBQTBCLFVBQUMsUUFBRCxFQUFjO0FBQ3BDLE1BQUUsSUFBRixDQUFRO0FBQ0osa0JBQVEsUUFBUSxrQkFBaEIsR0FBcUMsUUFBckMsR0FBZ0QsUUFBUSxLQUF4RCxHQUFnRSxRQUFRLE1BRHBFO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVO0FBSE4sS0FBUixFQUtDLElBTEQsQ0FLTSxVQUFDLE1BQUQsRUFBWTtBQUNkLGdCQUFRLFVBQVIsQ0FBbUIsSUFBbkIsQ0FBd0IsTUFBeEI7QUFDQSxnQkFBUSxHQUFSLENBQVksTUFBWjtBQUNBLFlBQU0sVUFBVSxPQUFPLFVBQVAsQ0FBa0IsTUFBbEIsQ0FBeUIsSUFBekIsQ0FBOEIsSUFBOUIsQ0FBaEI7QUFDQSxZQUFJLFVBQVUsRUFBZDtBQUNBLFlBQUksT0FBTyxVQUFQLENBQWtCLE9BQXRCLEVBQStCO0FBQzNCLHNCQUFVLE9BQU8sVUFBUCxDQUFrQixPQUFsQixDQUEwQixJQUExQixDQUErQixJQUEvQixDQUFWO0FBQ0g7QUFDRCxZQUFNLDRDQUNNLE9BQU8sTUFBUCxDQUFjLENBQWQsRUFBaUIsY0FEdkIseUJBRUEsT0FBTyxJQUZQLGtEQUd1QixPQUFPLFNBSDlCLCtDQUlvQixPQUFPLGdCQUozQix5Q0FLYyxPQUxkLDBDQU1lLE9BTmYsMEJBQU47QUFRQSxVQUFFLGFBQUYsRUFBaUIsTUFBakIsQ0FBd0IsVUFBeEI7QUFDQTtBQUNILEtBdkJEO0FBd0JILENBekJEOztBQTJCQTtBQUNBLFFBQVEsY0FBUixHQUF5QixVQUFDLE9BQUQsRUFBYTtBQUNsQyxNQUFFLGFBQUYsRUFBaUIsS0FBakI7QUFDQSxZQUFRLE9BQVIsQ0FBZ0IsVUFBQyxJQUFELEVBQVU7QUFDdEIsZ0JBQVEsZUFBUixDQUF3QixLQUFLLEVBQTdCO0FBQ0gsS0FGRDtBQUdILENBTEQ7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsTUFBUixHQUFpQixZQUFNO0FBQ25CLE1BQUUsZ0JBQUYsRUFBb0IsRUFBcEIsQ0FBdUIsUUFBdkIsRUFBaUMsVUFBUyxDQUFULEVBQVk7QUFDekMsVUFBRSxjQUFGO0FBQ0EsWUFBTSxjQUFjLEVBQUUsa0JBQUYsRUFBc0IsR0FBdEIsRUFBcEI7QUFDQSxZQUFNLGFBQWEsRUFBRSxpQ0FBRixFQUFxQyxHQUFyQyxFQUFuQjtBQUNBLFlBQU0sY0FBYyxFQUFFLGtDQUFGLEVBQXNDLEdBQXRDLENBQTBDLFlBQVc7QUFDckUsbUJBQU8sRUFBRSxJQUFGLEVBQVEsR0FBUixFQUFQO0FBQ0gsU0FGbUIsRUFFakIsR0FGaUIsR0FFWCxJQUZXLENBRU4sRUFGTSxDQUFwQjtBQUdBLFlBQU0sVUFBVSxFQUFFLDBDQUFGLEVBQThDLEdBQTlDLEVBQWhCO0FBQ0EsZ0JBQVEsYUFBUixDQUFzQixXQUF0QixFQUFtQyxVQUFuQyxFQUErQyxXQUEvQyxFQUE0RCxPQUE1RDtBQUNBLFVBQUUsTUFBRixFQUFVLE9BQVYsQ0FBa0IsT0FBbEI7QUFDSCxLQVZEO0FBV0gsQ0FaRDs7QUFjQTtBQUNBLFFBQVEsSUFBUixHQUFlLFlBQU07QUFDakIsWUFBUSxNQUFSO0FBQ0gsQ0FGRDs7QUFJQTtBQUNBLEVBQUUsWUFBVztBQUNULFlBQVEsSUFBUjtBQUNILENBRkQ7O0FBTUE7OztBQUdBOzs7O0FBSUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyAgQ3VzdG9tZXIgZW50ZXJzIHRoZWlyIHJlcXVpcmVkIHNlYXJjaCBwYXJhbWV0ZXJzIChpbmdyZWRpZW50cywgY291cnNlIHR5cGUsIGN1c2lzaW5lIHR5cGUsIGRpZXRhcnkgcmVzdHJpY3Rpb25zKVxyXG4gICAgLy8gIEV4YW1wbGUgb2YgYSBzZWFyY2ggZm9yIGNoaWNrZW4gYW5kIGJyb2Njb2xpIC8gTWFpbiBkaXNoIC8gSXRhbGlhbiAvIE5vIGRpZXRhcnkgcmVzdHJpY3Rpb25cclxuICAgICAgICAvLyAgRG8gYW4gQVBJIGNhbGwgZm9yIGFsbCByZWNpcGVzIHdpdGggY2hpY2tlbiBhbmQgYnJvY2NvbGlcclxuICAgICAgICAvLyAgVGhlbiBmaWx0ZXIgdGhlIHJlc3VsdHMgYmFzZWQgb24gdGhlIG90aGVyIGNyaXRlcmlhIC0gc3RhcnRpbmcgd2l0aCBjb3Vyc2UgdHlwZSAtIHRoZW4gY3Vpc2luZSB0eXBlIC0gdGhlbiBkaWV0YXJ5IHJlc3RyY2l0aW9uc1xyXG4vLyAgVGhlIGRhdGEgaXMgcHVsbGVkIGZyb20gdGhlIEFQSSBhbmQgZGlzcGxheWVkIG9udG8gdGhlIHBhZ2UgaW4gYSBsaXN0XHJcbiAgICAvLyAgVGhlIGZpbHRlcmVkIHJlc3VsdHMgd2lsbCB0aGVuIGJlIGJyb2tlbiBkb3duIGludG8gaW5kaXZpZHVhbCByZWNpcGVzIC0gZGlzcGxheWluZyBhbiBpbWFnZSBvZiB0aGUgZGlzaCwgdGhlIG5hbWUgb2YgdGhlIGRpc2ggYW5kIGEgZGVzY3JpcHRpb24gb2YgaXRcclxuICAgIC8vICBuZWVkIHRvIHN0b3JlIHJlY2lwZSBpZCBmcm9tIGVhY2ggZmlsdGVyZWQgcmVzdWx0IGFuZCBkbyBhIHNlcGFyYXRlIHB1bGwgdG8gZ2V0IHRoZSBpbmZvIGZyb20gdGhlcmVcclxuLy8gIFRoZSByZWNpcGVzIHdpbGwgYmUgY2xpY2thYmxlIHRvIHRha2UgdGhlbSB0byBhIGZ1bGwgdmlldyBvZiB0aGVtXHJcbiAgICAvLyAgVGhlIHJlY2lwZXMgd2lsbCBiZSBvcGVuZWQgaW4gYSBuZXcgdGFiXHJcblxyXG5jb25zdCBmb29kQXBwID0ge307XHJcblxyXG5mb29kQXBwLmFwaUlEID0gJz9fYXBwX2lkPTcxZWMzZTA0J1xyXG5mb29kQXBwLmFwaUtleSA9ICcmX2FwcF9rZXk9Y2MxZmQ0ZjZjZTE2N2MxMTk4ZmViZDE2MmZlYTgzOTInO1xyXG5mb29kQXBwLmFsbFJlY2lwaWVzQXBpVVJMID0gYGh0dHA6Ly9hcGkueXVtbWx5LmNvbS92MS9hcGkvcmVjaXBlcyR7Zm9vZEFwcC5hcGlJRH1gO1xyXG5mb29kQXBwLnNpbmdsZVJlY2lwZUFwaVVSTCA9ICdodHRwOi8vYXBpLnl1bW1seS5jb20vdjEvYXBpL3JlY2lwZS8nO1xyXG5mb29kQXBwLnJlY2lwZUxpc3QgPSBbXTtcclxuXHJcblxyXG4vLyAgdGhlIGdldEFsbFJlY2lwZXMgbWV0aG9kIHRha2VzIGluIHRoZSBwYXJhbWV0ZXJzIGZyb20gdGhlIHNlYXJjaCBmb3JtIGFuZCBnZXRzIHRoZSBtYXRjaGluZyBkYXRhIGZyb20gdGhlIEFQSVxyXG5mb29kQXBwLmdldEFsbFJlY2lwZXMgPSAoaW5ncmVkaWVudHMsIGNvdXJzZVR5cGUsIGN1aXNpbmVUeXBlLCBkaWV0YXJ5KSA9PiB7XHJcbiAgICAkLmFqYXggKHtcclxuICAgICAgICB1cmw6IGAke2Zvb2RBcHAuYWxsUmVjaXBpZXNBcGlVUkx9JHtmb29kQXBwLmFwaUtleX0ke2NvdXJzZVR5cGV9JHtjdWlzaW5lVHlwZX0ke2RpZXRhcnl9YCxcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBxOiBpbmdyZWRpZW50cyxcclxuICAgICAgICAgICAgbWF4UmVzdWx0OiAyMCxcclxuICAgICAgICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICBmb29kQXBwLmRpc3BsYXlSZWNpcGVzKHJlc3VsdC5tYXRjaGVzKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyAgdGhlIGdldFNpbmdsZVJlY2lwZSBtZXRob2QgdGFrZXMgaW4gYSByZWNpcGVJRCBhbmQgcHVsbHMgdGhlIGluZm8gZm9yIHRoYXQgc3BlY2lmaWMgcmVjaXBlXHJcbmZvb2RBcHAuZ2V0U2luZ2xlUmVjaXBlID0gKHJlY2lwZUlEKSA9PiB7XHJcbiAgICAkLmFqYXggKHtcclxuICAgICAgICB1cmw6IGAke2Zvb2RBcHAuc2luZ2xlUmVjaXBlQXBpVVJMfSR7cmVjaXBlSUR9JHtmb29kQXBwLmFwaUlEfSR7Zm9vZEFwcC5hcGlLZXl9YCxcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGZvb2RBcHAucmVjaXBlTGlzdC5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxyXG4gICAgICAgIGNvbnN0IGNvdXJzZXMgPSByZXN1bHQuYXR0cmlidXRlcy5jb3Vyc2Uuam9pbignLCAnKTtcclxuICAgICAgICBsZXQgY3Vpc2luZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5hdHRyaWJ1dGVzLmN1aXNpbmUpIHtcclxuICAgICAgICAgICAgY3Vpc2luZSA9IHJlc3VsdC5hdHRyaWJ1dGVzLmN1aXNpbmUuam9pbignLCAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2hvd1JlY2lwZSA9IGA8ZGl2PlxyXG4gICAgICAgIDxpbWcgc3JjPScke3Jlc3VsdC5pbWFnZXNbMF0uaG9zdGVkTGFyZ2VVcmx9Jz5cclxuICAgICAgICA8aDI+JHtyZXN1bHQubmFtZX08L2gyPlxyXG4gICAgICAgIDxoMz5Ub3RhbCBUaW1lIHRvIFByZXBhcmU6ICR7cmVzdWx0LnRvdGFsVGltZX08L2gzPlxyXG4gICAgICAgIDxoMz5OdW1iZXIgb2YgU2VydmluZ3M6ICR7cmVzdWx0Lm51bWJlck9mU2VydmluZ3N9PC9oMz5cclxuICAgICAgICA8aDM+Q291cnNlIFR5cGVzOiAke2NvdXJzZXN9PC9oMz5cclxuICAgICAgICA8aDM+Q3Vpc2luZSBUeXBlczogJHtjdWlzaW5lfTwvaDM+XHJcbiAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgICQoJy5yZWNpcGVMaXN0JykuYXBwZW5kKHNob3dSZWNpcGUpO1xyXG4gICAgICAgIC8vICBjYW4gdXNlIGEgZm9yIGluIGxvb3AgdG8gZ28gdGhyb3VnaCB0aGUgb2JqZWN0XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gIHRoZSBkaXNwbGF5UmVjaXBlcyBtZXRob2QgdGFrZXMgdGhlIHJlY2lwZXMgYW5kIGJyZWFrcyB0aGVtIGRvd24gdG8gYmUgZGlzcGxheWVkIG9uIHNjcmVlblxyXG5mb29kQXBwLmRpc3BsYXlSZWNpcGVzID0gKHJlY2lwZXMpID0+IHtcclxuICAgICQoJy5yZWNpcGVMaXN0JykuZW1wdHkoKTtcclxuICAgIHJlY2lwZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGZvb2RBcHAuZ2V0U2luZ2xlUmVjaXBlKGl0ZW0uaWQpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vICB2YWx1ZXMgdG8gZ3JhYiB3aGVuIGRpc3BsYXlpbmcgcmVjaXBlIHRvIHRoZSBwYWdlOlxyXG4vLyAgLmltYWdlcy5ob3N0ZWRMYXJnZVVybFxyXG4vLyAgLm5hbWVcclxuLy8gIC5zb3VyY2Uuc291cmNlUmVjaXBlVXJsXHJcbi8vICAudG90YWxUaW1lXHJcbi8vICAubnVtYmVyT2ZTZXJ2aW5nc1xyXG4vLyAgLmF0dHJpYnV0ZXMuY291cnNlXHJcbi8vICAuYXR0cmlidXRlcy5jdWlzaW5lXHJcblxyXG4vLyAgdGhlIGV2ZW50cyBtZXRob2Qgd2lsbCBob2xkIGdlbmVyYWwgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgc2l0ZVxyXG5mb29kQXBwLmV2ZW50cyA9ICgpID0+IHtcclxuICAgICQoJy5yZWNpcGUtc2VhcmNoJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgaW5ncmVkaWVudHMgPSAkKCdpbnB1dFt0eXBlPXRleHRdJykudmFsKCk7XHJcbiAgICAgICAgY29uc3QgY291cnNlVHlwZSA9ICQoJ2lucHV0W25hbWU9Y291cnNlLXR5cGVdOmNoZWNrZWQnKS52YWwoKTtcclxuICAgICAgICBjb25zdCBjdWlzaW5lVHlwZSA9ICQoJ2lucHV0W25hbWU9Y3Vpc2luZS10eXBlXTpjaGVja2VkJykubWFwKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB9KS5nZXQoKS5qb2luKCcnKTtcclxuICAgICAgICBjb25zdCBkaWV0YXJ5ID0gJCgnaW5wdXRbbmFtZT1kaWV0YXJ5LXJlc3RyaWN0aW9uc106Y2hlY2tlZCcpLnZhbCgpXHJcbiAgICAgICAgZm9vZEFwcC5nZXRBbGxSZWNpcGVzKGluZ3JlZGllbnRzLCBjb3Vyc2VUeXBlLCBjdWlzaW5lVHlwZSwgZGlldGFyeSk7XHJcbiAgICAgICAgJCgnZm9ybScpLnRyaWdnZXIoJ3Jlc2V0Jyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gIHRoZSBpbml0IG1ldGhvZCBpbml0aWFsaXplcyBhbGwgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIHdoZW4gdGhlIHBhZ2UgbG9hZHNcclxuZm9vZEFwcC5pbml0ID0gKCkgPT4ge1xyXG4gICAgZm9vZEFwcC5ldmVudHMoKTtcclxufTtcclxuXHJcbi8vICBkb2N1bWVudC5yZWFkeSB0byBjYWxsIHRoZSBpbml0IG1ldGhvZCBvbmNlIHRoZSBwYWdlIGlzIGZpbmlzaGVkIGxvYWRpbmdcclxuJChmdW5jdGlvbigpIHtcclxuICAgIGZvb2RBcHAuaW5pdCgpO1xyXG59KTtcclxuXHJcblxyXG5cclxuLy8gIEV4YW1wbGUgZm9yIHBhZ2luYXRpb24gbGF0ZXIgb25cclxuXHJcblxyXG4vKiBtYXhSZXN1bHQsIHN0YXJ0IDogVGhlIG1heFJlc3VsdCBhbmQgc3RhcnQgcGFyYW1ldGVycyBhbGxvdyBwYWdpbmF0aW9uIGFuZCAjIG9mIHJlc3VsdHMgY29udHJvbC4gQnkgZGVmYXVsdCA2IHJlY2lwZXMgYXJlIHJldHVybmVkIGJ5IHRoZSBzZWFyY2ggQVBJLlxyXG5Gb3IgZXhhbXBsZSwgaWYgeW91IHdhbnQgMTAgcmVjaXBlcyBwZXIgcGFnZSBhbmQgd2FudCB0byBzZWUgdGhlIHNlY29uZCBwYWdlIG9mIHJlc3VsdHMsIHlvdSB3b3VsZCBhcHBlbmQgJm1heFJlc3VsdD0xMCZzdGFydD0xMC4gU3RhcnQgaXMgc2V0IHRvIDEwIHZlcnN1cyBiZWNhdXNlIHRoZSBudW1iZXJpbmcgZm9yIHJlc3VsdHMgc3RhcnRzIGF0IDAgKHZlcnN1cyAxKS5cclxuRm9yIGV4YW1wbGU6IGh0dHA6Ly9hcGkueXVtbWx5LmNvbS92MS9hcGkvcmVjaXBlcz9fYXBwX2lkPVlPVVJfSUQmX2FwcF9rZXk9WU9VUl9BUFBfS0VZJnE9b25pb24rc291cFxyXG4mbWF4UmVzdWx0PTIwJnN0YXJ0PTEwICovXHJcbi8vICBjYW4gaGF2ZSBhIHZhcmlhYmxlIGluIHBsYWNlIG9mIHRoZSAxMCBmb3Igc3RhcnQgdGhhdCB3b3VsZCBpbmNyZWFzZSBvbiBlYWNoIExvYWQgTW9yZSBidXR0b24gY2xpY2suXHJcblxyXG5cclxuLy8gIHZhbHVlcyBmb3IgY3Vpc2luZXMgaGF2ZSB0byBhbGwgYmUgaW4gbG93ZXIgY2FzZSAtIGFsbCBzaG91bGQgc3RhcnQgd2l0aCAmYWxsb3dlZEN1aXNpbmVbXT1cclxuLy8gICZhbGxvd2VkQ3Vpc2luZVtdPWN1aXNpbmVeY3Vpc2luZS1hbWVyaWNhblxyXG4vLyAgJmFsbG93ZWRDdWlzaW5lW109Y3Vpc2luZV5jdWlzaW5lLWtpZC1mcmllbmRseVxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWl0YWxpYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1hc2lhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLW1leGljYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1zb3V0aGVyblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWZyZW5jaFxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXNvdXRod2VzdGVyblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWJhcmJlY3VlLWJicVxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWluZGlhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWNoaW5lc2VcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1jYWp1blxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLW1lZGl0ZXJyYW5lYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1ncmVla1xyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWVuZ2xpc2hcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1zcGFuaXNoXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtdGhhaVxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWdlcm1hblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLW1vcm9jY2FuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtaXJpc2hcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1qYXBhbmVzZVxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWN1YmFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtaGF3YWlpYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1zd2VkaXNoXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtaHVuZ2FyaWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtcG9ydHVndWVzZVxyXG5cclxuLy8gIHZhbHVlcyBmb3IgZGlldGFyeSBhcmUgYXMgZm9sbG93czogLSBhbGwgc2hvdWxkIHN0YXJ0IHdpdGggJmFsbG93ZWREaWV0W109XHJcbi8vICAzODZeVmVnYW5cclxuLy8gIDM4N15MYWN0by1vdm8gdmVnZXRhcmlhblxyXG4vLyAgMzg4XkxhY3RvIHZlZ2V0YXJpYW5cclxuLy8gIDM4OV5Pdm8gdmVnZXRhcmlhblxyXG4vLyAgMzkwXlBlc2NldGFyaWFuXHJcbi8vICA0MDNeUGFsZW9cclxuXHJcbi8vICB2YWx1ZXMgZm9yIGNvdXJzZSB0eXBlcyBhcmUgYXMgZm9sbG93czogLSBhbGwgc2hvdWxkIHN0YXJ0IHdpdGggJmFsbG93ZWRDb3Vyc2VbXT1cclxuLy8gIGNvdXJzZV5jb3Vyc2UtTWFpbiBEaXNoZXNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtRGVzc2VydHNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtU2lkZSBEaXNoZXNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQXBwZXRpemVyc1xyXG4vLyAgY291cnNlXmNvdXJzZS1TYWxhZHNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQnJlYWtmYXN0IGFuZCBCcnVuY2hcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQnJlYWRzXHJcbi8vICBjb3Vyc2VeY291cnNlLVNvdXBzXHJcbi8vICBjb3Vyc2VeY291cnNlLUJldmVyYWdlc1xyXG4vLyAgY291cnNlXmNvdXJzZS1Db25kaW1lbnRzIGFuZCBTYXVjZXNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQ29ja3RhaWxzXHJcbi8vICBjb3Vyc2VeY291cnNlLVNuYWNrc1xyXG4vLyAgY291cnNlXmNvdXJzZS1MdW5jaFxyXG5cclxuLy8gIFByYXRpayBjdXJyZW50IHRhc2s6IHN0YXJ0aW5nIG9uIGZvcm0gbGF5b3V0IGZvciBzZWFyY2hpbmdcclxuLy8gIENocmlzIGN1cnJlbnQgdGFzayAtIHdvcmsgb24gZ2V0dGluZyBkYXRhIGZyb20gQVBJIGFuZCBmaWx0ZXJpbmdcclxuIl19
