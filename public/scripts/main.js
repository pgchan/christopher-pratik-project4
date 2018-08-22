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
    // foodApp.getAllRecipes('ground beef', '', '&allowedCuisine[]=cuisine^cuisine-italian&allowedCuisine[]=cuisine^cuisine-mexican&allowedCuisine[]=cuisine^cuisine-cuban');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0k7QUFDQTtBQUNKO0FBQ0k7O0FBRUosSUFBTSxVQUFVLEVBQWhCOztBQUVBLFFBQVEsS0FBUixHQUFnQixtQkFBaEI7QUFDQSxRQUFRLE1BQVIsR0FBaUIsNENBQWpCO0FBQ0EsUUFBUSxpQkFBUiw0Q0FBbUUsUUFBUSxLQUEzRTtBQUNBLFFBQVEsa0JBQVIsR0FBNkIsc0NBQTdCO0FBQ0EsUUFBUSxVQUFSLEdBQXFCLEVBQXJCOztBQUdBO0FBQ0EsUUFBUSxhQUFSLEdBQXdCLFVBQUMsV0FBRCxFQUFjLFVBQWQsRUFBMEIsV0FBMUIsRUFBdUMsT0FBdkMsRUFBbUQ7QUFDdkUsTUFBRSxJQUFGLENBQVE7QUFDSixrQkFBUSxRQUFRLGlCQUFoQixHQUFvQyxRQUFRLE1BQTVDLEdBQXFELFVBQXJELEdBQWtFLFdBQWxFLEdBQWdGLE9BRDVFO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVLE1BSE47QUFJSixjQUFNO0FBQ0YsZUFBRyxXQUREO0FBRUYsdUJBQVcsRUFGVDtBQUdGLG1CQUFPO0FBSEw7QUFKRixLQUFSLEVBVUMsSUFWRCxDQVVNLFVBQUMsTUFBRCxFQUFZO0FBQ2QsZ0JBQVEsY0FBUixDQUF1QixPQUFPLE9BQTlCO0FBQ0gsS0FaRDtBQWFILENBZEQ7O0FBZ0JBO0FBQ0EsUUFBUSxlQUFSLEdBQTBCLFVBQUMsUUFBRCxFQUFjO0FBQ3BDLE1BQUUsSUFBRixDQUFRO0FBQ0osa0JBQVEsUUFBUSxrQkFBaEIsR0FBcUMsUUFBckMsR0FBZ0QsUUFBUSxLQUF4RCxHQUFnRSxRQUFRLE1BRHBFO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVO0FBSE4sS0FBUixFQUtDLElBTEQsQ0FLTSxVQUFDLE1BQUQsRUFBWTtBQUNkLGdCQUFRLFVBQVIsQ0FBbUIsSUFBbkIsQ0FBd0IsTUFBeEI7QUFDQSxnQkFBUSxHQUFSLENBQVksTUFBWjtBQUNBLFlBQU0sVUFBVSxPQUFPLFVBQVAsQ0FBa0IsTUFBbEIsQ0FBeUIsSUFBekIsQ0FBOEIsSUFBOUIsQ0FBaEI7QUFDQSxZQUFJLFVBQVUsRUFBZDtBQUNBLFlBQUksT0FBTyxVQUFQLENBQWtCLE9BQXRCLEVBQStCO0FBQzNCLHNCQUFVLE9BQU8sVUFBUCxDQUFrQixPQUFsQixDQUEwQixJQUExQixDQUErQixJQUEvQixDQUFWO0FBQ0g7QUFDRCxZQUFNLDRDQUNNLE9BQU8sTUFBUCxDQUFjLENBQWQsRUFBaUIsY0FEdkIseUJBRUEsT0FBTyxJQUZQLGtEQUd1QixPQUFPLFNBSDlCLCtDQUlvQixPQUFPLGdCQUozQix5Q0FLYyxPQUxkLDBDQU1lLE9BTmYsMEJBQU47QUFRQSxVQUFFLGFBQUYsRUFBaUIsTUFBakIsQ0FBd0IsVUFBeEI7QUFDQTtBQUNILEtBdkJEO0FBd0JILENBekJEOztBQTJCQTtBQUNBLFFBQVEsY0FBUixHQUF5QixVQUFDLE9BQUQsRUFBYTtBQUNsQyxNQUFFLGFBQUYsRUFBaUIsS0FBakI7QUFDQSxZQUFRLE9BQVIsQ0FBZ0IsVUFBQyxJQUFELEVBQVU7QUFDdEIsZ0JBQVEsZUFBUixDQUF3QixLQUFLLEVBQTdCO0FBQ0gsS0FGRDtBQUdILENBTEQ7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsTUFBUixHQUFpQixZQUFNO0FBQ25CLE1BQUUsZ0JBQUYsRUFBb0IsRUFBcEIsQ0FBdUIsUUFBdkIsRUFBaUMsVUFBUyxDQUFULEVBQVk7QUFDekMsVUFBRSxjQUFGO0FBQ0EsWUFBTSxjQUFjLEVBQUUsa0JBQUYsRUFBc0IsR0FBdEIsRUFBcEI7QUFDQSxZQUFNLGFBQWEsRUFBRSxpQ0FBRixFQUFxQyxHQUFyQyxFQUFuQjtBQUNBLFlBQU0sY0FBYyxFQUFFLGtDQUFGLEVBQXNDLEdBQXRDLENBQTBDLFlBQVc7QUFDckUsbUJBQU8sRUFBRSxJQUFGLEVBQVEsR0FBUixFQUFQO0FBQ0gsU0FGbUIsRUFFakIsR0FGaUIsR0FFWCxJQUZXLENBRU4sRUFGTSxDQUFwQjtBQUdBLFlBQU0sVUFBVSxFQUFFLDBDQUFGLEVBQThDLEdBQTlDLEVBQWhCO0FBQ0EsZ0JBQVEsYUFBUixDQUFzQixXQUF0QixFQUFtQyxVQUFuQyxFQUErQyxXQUEvQyxFQUE0RCxPQUE1RDtBQUNBLFVBQUUsTUFBRixFQUFVLE9BQVYsQ0FBa0IsT0FBbEI7QUFDSCxLQVZEO0FBV0gsQ0FaRDs7QUFjQTtBQUNBLFFBQVEsSUFBUixHQUFlLFlBQU07QUFDakIsWUFBUSxNQUFSO0FBQ0E7QUFDSCxDQUhEOztBQUtBO0FBQ0EsRUFBRSxZQUFXO0FBQ1QsWUFBUSxJQUFSO0FBQ0gsQ0FGRDs7QUFNQTs7O0FBR0E7Ozs7QUFJQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vICBDdXN0b21lciBlbnRlcnMgdGhlaXIgcmVxdWlyZWQgc2VhcmNoIHBhcmFtZXRlcnMgKGluZ3JlZGllbnRzLCBjb3Vyc2UgdHlwZSwgY3VzaXNpbmUgdHlwZSwgZGlldGFyeSByZXN0cmljdGlvbnMpXHJcbiAgICAvLyAgRXhhbXBsZSBvZiBhIHNlYXJjaCBmb3IgY2hpY2tlbiBhbmQgYnJvY2NvbGkgLyBNYWluIGRpc2ggLyBJdGFsaWFuIC8gTm8gZGlldGFyeSByZXN0cmljdGlvblxyXG4gICAgICAgIC8vICBEbyBhbiBBUEkgY2FsbCBmb3IgYWxsIHJlY2lwZXMgd2l0aCBjaGlja2VuIGFuZCBicm9jY29saVxyXG4gICAgICAgIC8vICBUaGVuIGZpbHRlciB0aGUgcmVzdWx0cyBiYXNlZCBvbiB0aGUgb3RoZXIgY3JpdGVyaWEgLSBzdGFydGluZyB3aXRoIGNvdXJzZSB0eXBlIC0gdGhlbiBjdWlzaW5lIHR5cGUgLSB0aGVuIGRpZXRhcnkgcmVzdHJjaXRpb25zXHJcbi8vICBUaGUgZGF0YSBpcyBwdWxsZWQgZnJvbSB0aGUgQVBJIGFuZCBkaXNwbGF5ZWQgb250byB0aGUgcGFnZSBpbiBhIGxpc3RcclxuICAgIC8vICBUaGUgZmlsdGVyZWQgcmVzdWx0cyB3aWxsIHRoZW4gYmUgYnJva2VuIGRvd24gaW50byBpbmRpdmlkdWFsIHJlY2lwZXMgLSBkaXNwbGF5aW5nIGFuIGltYWdlIG9mIHRoZSBkaXNoLCB0aGUgbmFtZSBvZiB0aGUgZGlzaCBhbmQgYSBkZXNjcmlwdGlvbiBvZiBpdFxyXG4gICAgLy8gIG5lZWQgdG8gc3RvcmUgcmVjaXBlIGlkIGZyb20gZWFjaCBmaWx0ZXJlZCByZXN1bHQgYW5kIGRvIGEgc2VwYXJhdGUgcHVsbCB0byBnZXQgdGhlIGluZm8gZnJvbSB0aGVyZVxyXG4vLyAgVGhlIHJlY2lwZXMgd2lsbCBiZSBjbGlja2FibGUgdG8gdGFrZSB0aGVtIHRvIGEgZnVsbCB2aWV3IG9mIHRoZW1cclxuICAgIC8vICBUaGUgcmVjaXBlcyB3aWxsIGJlIG9wZW5lZCBpbiBhIG5ldyB0YWJcclxuXHJcbmNvbnN0IGZvb2RBcHAgPSB7fTtcclxuXHJcbmZvb2RBcHAuYXBpSUQgPSAnP19hcHBfaWQ9NzFlYzNlMDQnXHJcbmZvb2RBcHAuYXBpS2V5ID0gJyZfYXBwX2tleT1jYzFmZDRmNmNlMTY3YzExOThmZWJkMTYyZmVhODM5Mic7XHJcbmZvb2RBcHAuYWxsUmVjaXBpZXNBcGlVUkwgPSBgaHR0cDovL2FwaS55dW1tbHkuY29tL3YxL2FwaS9yZWNpcGVzJHtmb29kQXBwLmFwaUlEfWA7XHJcbmZvb2RBcHAuc2luZ2xlUmVjaXBlQXBpVVJMID0gJ2h0dHA6Ly9hcGkueXVtbWx5LmNvbS92MS9hcGkvcmVjaXBlLyc7XHJcbmZvb2RBcHAucmVjaXBlTGlzdCA9IFtdO1xyXG5cclxuXHJcbi8vICB0aGUgZ2V0QWxsUmVjaXBlcyBtZXRob2QgdGFrZXMgaW4gdGhlIHBhcmFtZXRlcnMgZnJvbSB0aGUgc2VhcmNoIGZvcm0gYW5kIGdldHMgdGhlIG1hdGNoaW5nIGRhdGEgZnJvbSB0aGUgQVBJXHJcbmZvb2RBcHAuZ2V0QWxsUmVjaXBlcyA9IChpbmdyZWRpZW50cywgY291cnNlVHlwZSwgY3Vpc2luZVR5cGUsIGRpZXRhcnkpID0+IHtcclxuICAgICQuYWpheCAoe1xyXG4gICAgICAgIHVybDogYCR7Zm9vZEFwcC5hbGxSZWNpcGllc0FwaVVSTH0ke2Zvb2RBcHAuYXBpS2V5fSR7Y291cnNlVHlwZX0ke2N1aXNpbmVUeXBlfSR7ZGlldGFyeX1gLFxyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHE6IGluZ3JlZGllbnRzLFxyXG4gICAgICAgICAgICBtYXhSZXN1bHQ6IDIwLFxyXG4gICAgICAgICAgICBzdGFydDogMCxcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGZvb2RBcHAuZGlzcGxheVJlY2lwZXMocmVzdWx0Lm1hdGNoZXMpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vICB0aGUgZ2V0U2luZ2xlUmVjaXBlIG1ldGhvZCB0YWtlcyBpbiBhIHJlY2lwZUlEIGFuZCBwdWxscyB0aGUgaW5mbyBmb3IgdGhhdCBzcGVjaWZpYyByZWNpcGVcclxuZm9vZEFwcC5nZXRTaW5nbGVSZWNpcGUgPSAocmVjaXBlSUQpID0+IHtcclxuICAgICQuYWpheCAoe1xyXG4gICAgICAgIHVybDogYCR7Zm9vZEFwcC5zaW5nbGVSZWNpcGVBcGlVUkx9JHtyZWNpcGVJRH0ke2Zvb2RBcHAuYXBpSUR9JHtmb29kQXBwLmFwaUtleX1gLFxyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgIH0pXHJcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgZm9vZEFwcC5yZWNpcGVMaXN0LnB1c2gocmVzdWx0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXHJcbiAgICAgICAgY29uc3QgY291cnNlcyA9IHJlc3VsdC5hdHRyaWJ1dGVzLmNvdXJzZS5qb2luKCcsICcpO1xyXG4gICAgICAgIGxldCBjdWlzaW5lID0gXCJcIjtcclxuICAgICAgICBpZiAocmVzdWx0LmF0dHJpYnV0ZXMuY3Vpc2luZSkge1xyXG4gICAgICAgICAgICBjdWlzaW5lID0gcmVzdWx0LmF0dHJpYnV0ZXMuY3Vpc2luZS5qb2luKCcsICcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzaG93UmVjaXBlID0gYDxkaXY+XHJcbiAgICAgICAgPGltZyBzcmM9JyR7cmVzdWx0LmltYWdlc1swXS5ob3N0ZWRMYXJnZVVybH0nPlxyXG4gICAgICAgIDxoMj4ke3Jlc3VsdC5uYW1lfTwvaDI+XHJcbiAgICAgICAgPGgzPlRvdGFsIFRpbWUgdG8gUHJlcGFyZTogJHtyZXN1bHQudG90YWxUaW1lfTwvaDM+XHJcbiAgICAgICAgPGgzPk51bWJlciBvZiBTZXJ2aW5nczogJHtyZXN1bHQubnVtYmVyT2ZTZXJ2aW5nc308L2gzPlxyXG4gICAgICAgIDxoMz5Db3Vyc2UgVHlwZXM6ICR7Y291cnNlc308L2gzPlxyXG4gICAgICAgIDxoMz5DdWlzaW5lIFR5cGVzOiAke2N1aXNpbmV9PC9oMz5cclxuICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgJCgnLnJlY2lwZUxpc3QnKS5hcHBlbmQoc2hvd1JlY2lwZSk7XHJcbiAgICAgICAgLy8gIGNhbiB1c2UgYSBmb3IgaW4gbG9vcCB0byBnbyB0aHJvdWdoIHRoZSBvYmplY3RcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyAgdGhlIGRpc3BsYXlSZWNpcGVzIG1ldGhvZCB0YWtlcyB0aGUgcmVjaXBlcyBhbmQgYnJlYWtzIHRoZW0gZG93biB0byBiZSBkaXNwbGF5ZWQgb24gc2NyZWVuXHJcbmZvb2RBcHAuZGlzcGxheVJlY2lwZXMgPSAocmVjaXBlcykgPT4ge1xyXG4gICAgJCgnLnJlY2lwZUxpc3QnKS5lbXB0eSgpO1xyXG4gICAgcmVjaXBlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgZm9vZEFwcC5nZXRTaW5nbGVSZWNpcGUoaXRlbS5pZCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gIHZhbHVlcyB0byBncmFiIHdoZW4gZGlzcGxheWluZyByZWNpcGUgdG8gdGhlIHBhZ2U6XHJcbi8vICAuaW1hZ2VzLmhvc3RlZExhcmdlVXJsXHJcbi8vICAubmFtZVxyXG4vLyAgLnNvdXJjZS5zb3VyY2VSZWNpcGVVcmxcclxuLy8gIC50b3RhbFRpbWVcclxuLy8gIC5udW1iZXJPZlNlcnZpbmdzXHJcbi8vICAuYXR0cmlidXRlcy5jb3Vyc2VcclxuLy8gIC5hdHRyaWJ1dGVzLmN1aXNpbmVcclxuXHJcbi8vICB0aGUgZXZlbnRzIG1ldGhvZCB3aWxsIGhvbGQgZ2VuZXJhbCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBzaXRlXHJcbmZvb2RBcHAuZXZlbnRzID0gKCkgPT4ge1xyXG4gICAgJCgnLnJlY2lwZS1zZWFyY2gnKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCBpbmdyZWRpZW50cyA9ICQoJ2lucHV0W3R5cGU9dGV4dF0nKS52YWwoKTtcclxuICAgICAgICBjb25zdCBjb3Vyc2VUeXBlID0gJCgnaW5wdXRbbmFtZT1jb3Vyc2UtdHlwZV06Y2hlY2tlZCcpLnZhbCgpO1xyXG4gICAgICAgIGNvbnN0IGN1aXNpbmVUeXBlID0gJCgnaW5wdXRbbmFtZT1jdWlzaW5lLXR5cGVdOmNoZWNrZWQnKS5tYXAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgIH0pLmdldCgpLmpvaW4oJycpO1xyXG4gICAgICAgIGNvbnN0IGRpZXRhcnkgPSAkKCdpbnB1dFtuYW1lPWRpZXRhcnktcmVzdHJpY3Rpb25zXTpjaGVja2VkJykudmFsKClcclxuICAgICAgICBmb29kQXBwLmdldEFsbFJlY2lwZXMoaW5ncmVkaWVudHMsIGNvdXJzZVR5cGUsIGN1aXNpbmVUeXBlLCBkaWV0YXJ5KTtcclxuICAgICAgICAkKCdmb3JtJykudHJpZ2dlcigncmVzZXQnKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyAgdGhlIGluaXQgbWV0aG9kIGluaXRpYWxpemVzIGFsbCB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgd2hlbiB0aGUgcGFnZSBsb2Fkc1xyXG5mb29kQXBwLmluaXQgPSAoKSA9PiB7XHJcbiAgICBmb29kQXBwLmV2ZW50cygpO1xyXG4gICAgLy8gZm9vZEFwcC5nZXRBbGxSZWNpcGVzKCdncm91bmQgYmVlZicsICcnLCAnJmFsbG93ZWRDdWlzaW5lW109Y3Vpc2luZV5jdWlzaW5lLWl0YWxpYW4mYWxsb3dlZEN1aXNpbmVbXT1jdWlzaW5lXmN1aXNpbmUtbWV4aWNhbiZhbGxvd2VkQ3Vpc2luZVtdPWN1aXNpbmVeY3Vpc2luZS1jdWJhbicpO1xyXG59O1xyXG5cclxuLy8gIGRvY3VtZW50LnJlYWR5IHRvIGNhbGwgdGhlIGluaXQgbWV0aG9kIG9uY2UgdGhlIHBhZ2UgaXMgZmluaXNoZWQgbG9hZGluZ1xyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgZm9vZEFwcC5pbml0KCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG4vLyAgRXhhbXBsZSBmb3IgcGFnaW5hdGlvbiBsYXRlciBvblxyXG5cclxuXHJcbi8qIG1heFJlc3VsdCwgc3RhcnQgOiBUaGUgbWF4UmVzdWx0IGFuZCBzdGFydCBwYXJhbWV0ZXJzIGFsbG93IHBhZ2luYXRpb24gYW5kICMgb2YgcmVzdWx0cyBjb250cm9sLiBCeSBkZWZhdWx0IDYgcmVjaXBlcyBhcmUgcmV0dXJuZWQgYnkgdGhlIHNlYXJjaCBBUEkuXHJcbkZvciBleGFtcGxlLCBpZiB5b3Ugd2FudCAxMCByZWNpcGVzIHBlciBwYWdlIGFuZCB3YW50IHRvIHNlZSB0aGUgc2Vjb25kIHBhZ2Ugb2YgcmVzdWx0cywgeW91IHdvdWxkIGFwcGVuZCAmbWF4UmVzdWx0PTEwJnN0YXJ0PTEwLiBTdGFydCBpcyBzZXQgdG8gMTAgdmVyc3VzIGJlY2F1c2UgdGhlIG51bWJlcmluZyBmb3IgcmVzdWx0cyBzdGFydHMgYXQgMCAodmVyc3VzIDEpLlxyXG5Gb3IgZXhhbXBsZTogaHR0cDovL2FwaS55dW1tbHkuY29tL3YxL2FwaS9yZWNpcGVzP19hcHBfaWQ9WU9VUl9JRCZfYXBwX2tleT1ZT1VSX0FQUF9LRVkmcT1vbmlvbitzb3VwXHJcbiZtYXhSZXN1bHQ9MjAmc3RhcnQ9MTAgKi9cclxuLy8gIGNhbiBoYXZlIGEgdmFyaWFibGUgaW4gcGxhY2Ugb2YgdGhlIDEwIGZvciBzdGFydCB0aGF0IHdvdWxkIGluY3JlYXNlIG9uIGVhY2ggTG9hZCBNb3JlIGJ1dHRvbiBjbGljay5cclxuXHJcblxyXG4vLyAgdmFsdWVzIGZvciBjdWlzaW5lcyBoYXZlIHRvIGFsbCBiZSBpbiBsb3dlciBjYXNlIC0gYWxsIHNob3VsZCBzdGFydCB3aXRoICZhbGxvd2VkQ3Vpc2luZVtdPVxyXG4vLyAgJmFsbG93ZWRDdWlzaW5lW109Y3Vpc2luZV5jdWlzaW5lLWFtZXJpY2FuXHJcbi8vICAmYWxsb3dlZEN1aXNpbmVbXT1jdWlzaW5lXmN1aXNpbmUta2lkLWZyaWVuZGx5XHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtaXRhbGlhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWFzaWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtbWV4aWNhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXNvdXRoZXJuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtZnJlbmNoXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtc291dGh3ZXN0ZXJuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtYmFyYmVjdWUtYmJxXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtaW5kaWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtY2hpbmVzZVxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWNhanVuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtbWVkaXRlcnJhbmVhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWdyZWVrXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtZW5nbGlzaFxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXNwYW5pc2hcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS10aGFpXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtZ2VybWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtbW9yb2NjYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1pcmlzaFxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWphcGFuZXNlXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtY3ViYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1oYXdhaWlhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXN3ZWRpc2hcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1odW5nYXJpYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1wb3J0dWd1ZXNlXHJcblxyXG4vLyAgdmFsdWVzIGZvciBkaWV0YXJ5IGFyZSBhcyBmb2xsb3dzOiAtIGFsbCBzaG91bGQgc3RhcnQgd2l0aCAmYWxsb3dlZERpZXRbXT1cclxuLy8gIDM4Nl5WZWdhblxyXG4vLyAgMzg3XkxhY3RvLW92byB2ZWdldGFyaWFuXHJcbi8vICAzODheTGFjdG8gdmVnZXRhcmlhblxyXG4vLyAgMzg5Xk92byB2ZWdldGFyaWFuXHJcbi8vICAzOTBeUGVzY2V0YXJpYW5cclxuLy8gIDQwM15QYWxlb1xyXG5cclxuLy8gIHZhbHVlcyBmb3IgY291cnNlIHR5cGVzIGFyZSBhcyBmb2xsb3dzOiAtIGFsbCBzaG91bGQgc3RhcnQgd2l0aCAmYWxsb3dlZENvdXJzZVtdPVxyXG4vLyAgY291cnNlXmNvdXJzZS1NYWluIERpc2hlc1xyXG4vLyAgY291cnNlXmNvdXJzZS1EZXNzZXJ0c1xyXG4vLyAgY291cnNlXmNvdXJzZS1TaWRlIERpc2hlc1xyXG4vLyAgY291cnNlXmNvdXJzZS1BcHBldGl6ZXJzXHJcbi8vICBjb3Vyc2VeY291cnNlLVNhbGFkc1xyXG4vLyAgY291cnNlXmNvdXJzZS1CcmVha2Zhc3QgYW5kIEJydW5jaFxyXG4vLyAgY291cnNlXmNvdXJzZS1CcmVhZHNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtU291cHNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQmV2ZXJhZ2VzXHJcbi8vICBjb3Vyc2VeY291cnNlLUNvbmRpbWVudHMgYW5kIFNhdWNlc1xyXG4vLyAgY291cnNlXmNvdXJzZS1Db2NrdGFpbHNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtU25hY2tzXHJcbi8vICBjb3Vyc2VeY291cnNlLUx1bmNoXHJcblxyXG4vLyAgUHJhdGlrIGN1cnJlbnQgdGFzazogc3RhcnRpbmcgb24gZm9ybSBsYXlvdXQgZm9yIHNlYXJjaGluZ1xyXG4vLyAgQ2hyaXMgY3VycmVudCB0YXNrIC0gd29yayBvbiBnZXR0aW5nIGRhdGEgZnJvbSBBUEkgYW5kIGZpbHRlcmluZ1xyXG4iXX0=
