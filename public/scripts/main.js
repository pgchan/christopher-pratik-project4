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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0k7QUFDQTtBQUNKO0FBQ0k7O0FBRUosSUFBTSxVQUFVLEVBQWhCOztBQUVBLFFBQVEsS0FBUixHQUFnQixtQkFBaEI7QUFDQSxRQUFRLE1BQVIsR0FBaUIsNENBQWpCO0FBQ0EsUUFBUSxpQkFBUiw0Q0FBbUUsUUFBUSxLQUEzRTtBQUNBLFFBQVEsa0JBQVIsR0FBNkIsc0NBQTdCO0FBQ0EsUUFBUSxVQUFSLEdBQXFCLEVBQXJCOztBQUdBO0FBQ0EsUUFBUSxhQUFSLEdBQXdCLFVBQUMsV0FBRCxFQUFjLE9BQWQsRUFBdUIsV0FBdkIsRUFBdUM7QUFDM0QsTUFBRSxJQUFGLENBQVE7QUFDSixrQkFBUSxRQUFRLGlCQUFoQixHQUFvQyxRQUFRLE1BQTVDLEdBQXFELE9BQXJELEdBQStELFdBRDNEO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVLE1BSE47QUFJSixjQUFNO0FBQ0YsZUFBRyxXQUREO0FBRUYsdUJBQVcsRUFGVDtBQUdGLG1CQUFPO0FBSEw7QUFKRixLQUFSLEVBVUMsSUFWRCxDQVVNLFVBQUMsTUFBRCxFQUFZO0FBQ2QsZ0JBQVEsY0FBUixDQUF1QixPQUFPLE9BQTlCO0FBQ0gsS0FaRDtBQWFILENBZEQ7O0FBZ0JBO0FBQ0EsUUFBUSxlQUFSLEdBQTBCLFVBQUMsUUFBRCxFQUFjO0FBQ3BDLE1BQUUsSUFBRixDQUFRO0FBQ0osa0JBQVEsUUFBUSxrQkFBaEIsR0FBcUMsUUFBckMsR0FBZ0QsUUFBUSxLQUF4RCxHQUFnRSxRQUFRLE1BRHBFO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVO0FBSE4sS0FBUixFQUtDLElBTEQsQ0FLTSxVQUFDLE1BQUQsRUFBWTtBQUNkLGdCQUFRLFVBQVIsQ0FBbUIsSUFBbkIsQ0FBd0IsTUFBeEI7QUFDQSxnQkFBUSxHQUFSLENBQVksTUFBWjtBQUNBLFlBQU0sNENBQ00sT0FBTyxNQUFQLENBQWMsQ0FBZCxFQUFpQixjQUR2Qix5QkFFQSxPQUFPLElBRlAsa0RBR3VCLE9BQU8sU0FIOUIsK0NBSW9CLE9BQU8sZ0JBSjNCLHlDQUtjLE9BQU8sVUFBUCxDQUFrQixNQUxoQywwQ0FNZSxPQUFPLFVBQVAsQ0FBa0IsT0FOakMsMEJBQU47QUFRQSxVQUFFLGFBQUYsRUFBaUIsTUFBakIsQ0FBd0IsVUFBeEI7QUFDQTtBQUNILEtBbEJEO0FBbUJILENBcEJEOztBQXNCQTtBQUNBLFFBQVEsY0FBUixHQUF5QixVQUFDLE9BQUQsRUFBYTtBQUNsQyxNQUFFLGFBQUYsRUFBaUIsS0FBakI7QUFDQSxZQUFRLE9BQVIsQ0FBZ0IsVUFBQyxJQUFELEVBQVU7QUFDdEIsZ0JBQVEsZUFBUixDQUF3QixLQUFLLEVBQTdCO0FBQ0gsS0FGRDtBQUdILENBTEQ7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsTUFBUixHQUFpQixZQUFNLENBRXRCLENBRkQ7O0FBSUE7QUFDQSxRQUFRLElBQVIsR0FBZSxZQUFNO0FBQ2pCLFlBQVEsYUFBUixDQUFzQixhQUF0QixFQUFxQyxFQUFyQyxFQUF5QywySEFBekM7QUFDSCxDQUZEOztBQUlBO0FBQ0EsRUFBRSxZQUFXO0FBQ1QsWUFBUSxJQUFSO0FBQ0gsQ0FGRDs7QUFNQTs7O0FBR0E7Ozs7QUFJQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vICBDdXN0b21lciBlbnRlcnMgdGhlaXIgcmVxdWlyZWQgc2VhcmNoIHBhcmFtZXRlcnMgKGluZ3JlZGllbnRzLCBjb3Vyc2UgdHlwZSwgY3VzaXNpbmUgdHlwZSwgZGlldGFyeSByZXN0cmljdGlvbnMpXHJcbiAgICAvLyAgRXhhbXBsZSBvZiBhIHNlYXJjaCBmb3IgY2hpY2tlbiBhbmQgYnJvY2NvbGkgLyBNYWluIGRpc2ggLyBJdGFsaWFuIC8gTm8gZGlldGFyeSByZXN0cmljdGlvblxyXG4gICAgICAgIC8vICBEbyBhbiBBUEkgY2FsbCBmb3IgYWxsIHJlY2lwZXMgd2l0aCBjaGlja2VuIGFuZCBicm9jY29saVxyXG4gICAgICAgIC8vICBUaGVuIGZpbHRlciB0aGUgcmVzdWx0cyBiYXNlZCBvbiB0aGUgb3RoZXIgY3JpdGVyaWEgLSBzdGFydGluZyB3aXRoIGNvdXJzZSB0eXBlIC0gdGhlbiBjdWlzaW5lIHR5cGUgLSB0aGVuIGRpZXRhcnkgcmVzdHJjaXRpb25zXHJcbi8vICBUaGUgZGF0YSBpcyBwdWxsZWQgZnJvbSB0aGUgQVBJIGFuZCBkaXNwbGF5ZWQgb250byB0aGUgcGFnZSBpbiBhIGxpc3RcclxuICAgIC8vICBUaGUgZmlsdGVyZWQgcmVzdWx0cyB3aWxsIHRoZW4gYmUgYnJva2VuIGRvd24gaW50byBpbmRpdmlkdWFsIHJlY2lwZXMgLSBkaXNwbGF5aW5nIGFuIGltYWdlIG9mIHRoZSBkaXNoLCB0aGUgbmFtZSBvZiB0aGUgZGlzaCBhbmQgYSBkZXNjcmlwdGlvbiBvZiBpdFxyXG4gICAgLy8gIG5lZWQgdG8gc3RvcmUgcmVjaXBlIGlkIGZyb20gZWFjaCBmaWx0ZXJlZCByZXN1bHQgYW5kIGRvIGEgc2VwYXJhdGUgcHVsbCB0byBnZXQgdGhlIGluZm8gZnJvbSB0aGVyZVxyXG4vLyAgVGhlIHJlY2lwZXMgd2lsbCBiZSBjbGlja2FibGUgdG8gdGFrZSB0aGVtIHRvIGEgZnVsbCB2aWV3IG9mIHRoZW1cclxuICAgIC8vICBUaGUgcmVjaXBlcyB3aWxsIGJlIG9wZW5lZCBpbiBhIG5ldyB0YWJcclxuXHJcbmNvbnN0IGZvb2RBcHAgPSB7fTtcclxuXHJcbmZvb2RBcHAuYXBpSUQgPSAnP19hcHBfaWQ9NzFlYzNlMDQnXHJcbmZvb2RBcHAuYXBpS2V5ID0gJyZfYXBwX2tleT1jYzFmZDRmNmNlMTY3YzExOThmZWJkMTYyZmVhODM5Mic7XHJcbmZvb2RBcHAuYWxsUmVjaXBpZXNBcGlVUkwgPSBgaHR0cDovL2FwaS55dW1tbHkuY29tL3YxL2FwaS9yZWNpcGVzJHtmb29kQXBwLmFwaUlEfWA7XHJcbmZvb2RBcHAuc2luZ2xlUmVjaXBlQXBpVVJMID0gJ2h0dHA6Ly9hcGkueXVtbWx5LmNvbS92MS9hcGkvcmVjaXBlLyc7XHJcbmZvb2RBcHAucmVjaXBlTGlzdCA9IFtdO1xyXG5cclxuXHJcbi8vICB0aGUgZ2V0QWxsUmVjaXBlcyBtZXRob2QgdGFrZXMgaW4gdGhlIHBhcmFtZXRlcnMgZnJvbSB0aGUgc2VhcmNoIGZvcm0gYW5kIGdldHMgdGhlIG1hdGNoaW5nIGRhdGEgZnJvbSB0aGUgQVBJXHJcbmZvb2RBcHAuZ2V0QWxsUmVjaXBlcyA9IChpbmdyZWRpZW50cywgZGlldGFyeSwgY3Vpc2luZVR5cGUpID0+IHtcclxuICAgICQuYWpheCAoe1xyXG4gICAgICAgIHVybDogYCR7Zm9vZEFwcC5hbGxSZWNpcGllc0FwaVVSTH0ke2Zvb2RBcHAuYXBpS2V5fSR7ZGlldGFyeX0ke2N1aXNpbmVUeXBlfWAsXHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgcTogaW5ncmVkaWVudHMsXHJcbiAgICAgICAgICAgIG1heFJlc3VsdDogMjAsXHJcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgZm9vZEFwcC5kaXNwbGF5UmVjaXBlcyhyZXN1bHQubWF0Y2hlcyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gIHRoZSBnZXRTaW5nbGVSZWNpcGUgbWV0aG9kIHRha2VzIGluIGEgcmVjaXBlSUQgYW5kIHB1bGxzIHRoZSBpbmZvIGZvciB0aGF0IHNwZWNpZmljIHJlY2lwZVxyXG5mb29kQXBwLmdldFNpbmdsZVJlY2lwZSA9IChyZWNpcGVJRCkgPT4ge1xyXG4gICAgJC5hamF4ICh7XHJcbiAgICAgICAgdXJsOiBgJHtmb29kQXBwLnNpbmdsZVJlY2lwZUFwaVVSTH0ke3JlY2lwZUlEfSR7Zm9vZEFwcC5hcGlJRH0ke2Zvb2RBcHAuYXBpS2V5fWAsXHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgfSlcclxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICBmb29kQXBwLnJlY2lwZUxpc3QucHVzaChyZXN1bHQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcclxuICAgICAgICBjb25zdCBzaG93UmVjaXBlID0gYDxkaXY+XHJcbiAgICAgICAgPGltZyBzcmM9JyR7cmVzdWx0LmltYWdlc1swXS5ob3N0ZWRMYXJnZVVybH0nPlxyXG4gICAgICAgIDxoMj4ke3Jlc3VsdC5uYW1lfTwvaDI+XHJcbiAgICAgICAgPGgzPlRvdGFsIFRpbWUgdG8gUHJlcGFyZTogJHtyZXN1bHQudG90YWxUaW1lfTwvaDM+XHJcbiAgICAgICAgPGgzPk51bWJlciBvZiBTZXJ2aW5nczogJHtyZXN1bHQubnVtYmVyT2ZTZXJ2aW5nc308L2gzPlxyXG4gICAgICAgIDxoMz5Db3Vyc2UgVHlwZXM6ICR7cmVzdWx0LmF0dHJpYnV0ZXMuY291cnNlfTwvaDM+XHJcbiAgICAgICAgPGgzPkN1aXNpbmUgVHlwZXM6ICR7cmVzdWx0LmF0dHJpYnV0ZXMuY3Vpc2luZX08L2gzPlxyXG4gICAgICAgIDwvZGl2PmBcclxuICAgICAgICAkKCcucmVjaXBlTGlzdCcpLmFwcGVuZChzaG93UmVjaXBlKTtcclxuICAgICAgICAvLyAgY2FuIHVzZSBhIGZvciBpbiBsb29wIHRvIGdvIHRocm91Z2ggdGhlIG9iamVjdFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vICB0aGUgZGlzcGxheVJlY2lwZXMgbWV0aG9kIHRha2VzIHRoZSByZWNpcGVzIGFuZCBicmVha3MgdGhlbSBkb3duIHRvIGJlIGRpc3BsYXllZCBvbiBzY3JlZW5cclxuZm9vZEFwcC5kaXNwbGF5UmVjaXBlcyA9IChyZWNpcGVzKSA9PiB7XHJcbiAgICAkKCcucmVjaXBlTGlzdCcpLmVtcHR5KCk7XHJcbiAgICByZWNpcGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBmb29kQXBwLmdldFNpbmdsZVJlY2lwZShpdGVtLmlkKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyAgdmFsdWVzIHRvIGdyYWIgd2hlbiBkaXNwbGF5aW5nIHJlY2lwZSB0byB0aGUgcGFnZTpcclxuLy8gIC5pbWFnZXMuaG9zdGVkTGFyZ2VVcmxcclxuLy8gIC5uYW1lXHJcbi8vICAuc291cmNlLnNvdXJjZVJlY2lwZVVybFxyXG4vLyAgLnRvdGFsVGltZVxyXG4vLyAgLm51bWJlck9mU2VydmluZ3NcclxuLy8gIC5hdHRyaWJ1dGVzLmNvdXJzZVxyXG4vLyAgLmF0dHJpYnV0ZXMuY3Vpc2luZVxyXG5cclxuLy8gIHRoZSBldmVudHMgbWV0aG9kIHdpbGwgaG9sZCBnZW5lcmFsIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHNpdGVcclxuZm9vZEFwcC5ldmVudHMgPSAoKSA9PiB7XHJcblxyXG59XHJcblxyXG4vLyAgdGhlIGluaXQgbWV0aG9kIGluaXRpYWxpemVzIGFsbCB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgd2hlbiB0aGUgcGFnZSBsb2Fkc1xyXG5mb29kQXBwLmluaXQgPSAoKSA9PiB7XHJcbiAgICBmb29kQXBwLmdldEFsbFJlY2lwZXMoJ2dyb3VuZCBiZWVmJywgJycsICcmYWxsb3dlZEN1aXNpbmVbXT1jdWlzaW5lXmN1aXNpbmUtaXRhbGlhbiZhbGxvd2VkQ3Vpc2luZVtdPWN1aXNpbmVeY3Vpc2luZS1tZXhpY2FuJmFsbG93ZWRDdWlzaW5lW109Y3Vpc2luZV5jdWlzaW5lLWN1YmFuJyk7XHJcbn07XHJcblxyXG4vLyAgZG9jdW1lbnQucmVhZHkgdG8gY2FsbCB0aGUgaW5pdCBtZXRob2Qgb25jZSB0aGUgcGFnZSBpcyBmaW5pc2hlZCBsb2FkaW5nXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgICBmb29kQXBwLmluaXQoKTtcclxufSk7XHJcblxyXG5cclxuXHJcbi8vICBFeGFtcGxlIGZvciBwYWdpbmF0aW9uIGxhdGVyIG9uXHJcblxyXG5cclxuLyogbWF4UmVzdWx0LCBzdGFydCA6IFRoZSBtYXhSZXN1bHQgYW5kIHN0YXJ0IHBhcmFtZXRlcnMgYWxsb3cgcGFnaW5hdGlvbiBhbmQgIyBvZiByZXN1bHRzIGNvbnRyb2wuIEJ5IGRlZmF1bHQgNiByZWNpcGVzIGFyZSByZXR1cm5lZCBieSB0aGUgc2VhcmNoIEFQSS5cclxuRm9yIGV4YW1wbGUsIGlmIHlvdSB3YW50IDEwIHJlY2lwZXMgcGVyIHBhZ2UgYW5kIHdhbnQgdG8gc2VlIHRoZSBzZWNvbmQgcGFnZSBvZiByZXN1bHRzLCB5b3Ugd291bGQgYXBwZW5kICZtYXhSZXN1bHQ9MTAmc3RhcnQ9MTAuIFN0YXJ0IGlzIHNldCB0byAxMCB2ZXJzdXMgYmVjYXVzZSB0aGUgbnVtYmVyaW5nIGZvciByZXN1bHRzIHN0YXJ0cyBhdCAwICh2ZXJzdXMgMSkuXHJcbkZvciBleGFtcGxlOiBodHRwOi8vYXBpLnl1bW1seS5jb20vdjEvYXBpL3JlY2lwZXM/X2FwcF9pZD1ZT1VSX0lEJl9hcHBfa2V5PVlPVVJfQVBQX0tFWSZxPW9uaW9uK3NvdXBcclxuJm1heFJlc3VsdD0yMCZzdGFydD0xMCAqL1xyXG4vLyAgY2FuIGhhdmUgYSB2YXJpYWJsZSBpbiBwbGFjZSBvZiB0aGUgMTAgZm9yIHN0YXJ0IHRoYXQgd291bGQgaW5jcmVhc2Ugb24gZWFjaCBMb2FkIE1vcmUgYnV0dG9uIGNsaWNrLlxyXG5cclxuXHJcbi8vICB2YWx1ZXMgZm9yIGN1aXNpbmVzIGhhdmUgdG8gYWxsIGJlIGluIGxvd2VyIGNhc2UgLSBhbGwgc2hvdWxkIHN0YXJ0IHdpdGggJmFsbG93ZWRDdWlzaW5lW109XHJcbi8vICAmYWxsb3dlZEN1aXNpbmVbXT1jdWlzaW5lXmN1aXNpbmUtYW1lcmljYW5cclxuLy8gICZhbGxvd2VkQ3Vpc2luZVtdPWN1aXNpbmVeY3Vpc2luZS1raWQtZnJpZW5kbHlcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1pdGFsaWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtYXNpYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1tZXhpY2FuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtc291dGhlcm5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1mcmVuY2hcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1zb3V0aHdlc3Rlcm5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1iYXJiZWN1ZS1iYnFcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1pbmRpYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1jaGluZXNlXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtY2FqdW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1tZWRpdGVycmFuZWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtZ3JlZWtcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1lbmdsaXNoXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtc3BhbmlzaFxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXRoYWlcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1nZXJtYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1tb3JvY2NhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWlyaXNoXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtamFwYW5lc2VcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1jdWJhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWhhd2FpaWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtc3dlZGlzaFxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWh1bmdhcmlhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXBvcnR1Z3Vlc2VcclxuXHJcbi8vICB2YWx1ZXMgZm9yIGRpZXRhcnkgYXJlIGFzIGZvbGxvd3M6IC0gYWxsIHNob3VsZCBzdGFydCB3aXRoICZhbGxvd2VkRGlldFtdPVxyXG4vLyAgMzg2XlZlZ2FuXHJcbi8vICAzODdeTGFjdG8tb3ZvIHZlZ2V0YXJpYW5cclxuLy8gIDM4OF5MYWN0byB2ZWdldGFyaWFuXHJcbi8vICAzODleT3ZvIHZlZ2V0YXJpYW5cclxuLy8gIDM5MF5QZXNjZXRhcmlhblxyXG4vLyAgNDAzXlBhbGVvXHJcblxyXG4vLyAgdmFsdWVzIGZvciBjb3Vyc2UgdHlwZXMgYXJlIGFzIGZvbGxvd3M6IC0gYWxsIHNob3VsZCBzdGFydCB3aXRoICZhbGxvd2VkQ291cnNlW109XHJcbi8vICBjb3Vyc2VeY291cnNlLU1haW4gRGlzaGVzXHJcbi8vICBjb3Vyc2VeY291cnNlLURlc3NlcnRzXHJcbi8vICBjb3Vyc2VeY291cnNlLVNpZGUgRGlzaGVzXHJcbi8vICBjb3Vyc2VeY291cnNlLUFwcGV0aXplcnNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtU2FsYWRzXHJcbi8vICBjb3Vyc2VeY291cnNlLUJyZWFrZmFzdCBhbmQgQnJ1bmNoXHJcbi8vICBjb3Vyc2VeY291cnNlLUJyZWFkc1xyXG4vLyAgY291cnNlXmNvdXJzZS1Tb3Vwc1xyXG4vLyAgY291cnNlXmNvdXJzZS1CZXZlcmFnZXNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQ29uZGltZW50cyBhbmQgU2F1Y2VzXHJcbi8vICBjb3Vyc2VeY291cnNlLUNvY2t0YWlsc1xyXG4vLyAgY291cnNlXmNvdXJzZS1TbmFja3NcclxuLy8gIGNvdXJzZV5jb3Vyc2UtTHVuY2hcclxuXHJcbi8vICBQcmF0aWsgY3VycmVudCB0YXNrOiBzdGFydGluZyBvbiBmb3JtIGxheW91dCBmb3Igc2VhcmNoaW5nXHJcbi8vICBDaHJpcyBjdXJyZW50IHRhc2sgLSB3b3JrIG9uIGdldHRpbmcgZGF0YSBmcm9tIEFQSSBhbmQgZmlsdGVyaW5nXHJcbiJdfQ==
