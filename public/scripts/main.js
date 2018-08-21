(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

//  Customer enters their required search parameters (ingredients, course type, cusisine type, dietary restrictions)
//  Example of a search for chicken and broccoli / Main dish / Italian / No dietary restriction
//  Do an API call for all recipes with chicken and broccoli
//  Then filter the results based on the other criteria - starting with course type - then cuisine type - then dietary restrcitions
//  The data is pulled from the API and displayed onto the page in a list
//  The filtered results will then be broken down into individual recipes - displaying an image of the dish, the name of the dish and a description of it
//  The recipes will be clickable to take them to a full view of them
//  The recipes will be opened in a new tab

var foodApp = {};

foodApp.apiURL = 'http://api.yummly.com/v1/api/recipes?_app_id=71ec3e04';
foodApp.apiKey = 'cc1fd4f6ce167c1198febd162fea8392';

foodApp.getRecipes = function (ingredients, courseType, cuisineType, dietary) {
    $.ajax({
        url: foodApp.apiURL,
        method: 'GET',
        dataType: 'json',
        data: {
            _app_key: foodApp.apiKey,
            // q: ingredients,
            // 'allowedCourse[]': `course^course-${courseType}`,
            // 'allowedCuisine[]': `cuisine^cuisine-${cuisineType}`,
            'allowedDiet[]': dietary
        }
    }).then(function (result) {
        console.log(result);
    });
};

foodApp.init = function () {
    foodApp.getRecipes('chicken', 'Appetizers', 'italian', '403^Paleo');
};

$(function () {
    foodApp.init();
});

//  Example for pagination later on


/* maxResult, start : The maxResult and start parameters allow pagination and # of results control. By default 6 recipes are returned by the search API.
For example, if you want 10 recipes per page and want to see the second page of results, you would append &maxResult=10&start=10. Start is set to 10 versus because the numbering for results starts at 0 (versus 1).
For example: http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup
&maxResult=10&start=10 */
//  can have a variable in place of the 10 for start that would increase on each Load More button click.


//  values for cuisines have to all be in lower case
//  cuisine^cuisine-american
//  cuisine^cuisine-kid-friendly
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

//  values for dietary are as follows:
//  386^Vegan
//  387^Lacto-ovo vegetarian
//  388^Lacto vegetarian
//  389^Ovo vegetarian
//  390^Pescetarian
//  403^Paleo

//  values for course types are as follows:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0k7QUFDSjtBQUNJOztBQUVKLElBQU0sVUFBVSxFQUFoQjs7QUFFQSxRQUFRLE1BQVIsR0FBaUIsdURBQWpCO0FBQ0EsUUFBUSxNQUFSLEdBQWlCLGtDQUFqQjs7QUFFQSxRQUFRLFVBQVIsR0FBcUIsVUFBQyxXQUFELEVBQWMsVUFBZCxFQUEwQixXQUExQixFQUF1QyxPQUF2QyxFQUFtRDtBQUNwRSxNQUFFLElBQUYsQ0FBUTtBQUNKLGFBQUssUUFBUSxNQURUO0FBRUosZ0JBQVEsS0FGSjtBQUdKLGtCQUFVLE1BSE47QUFJSixjQUFNO0FBQ0Ysc0JBQVUsUUFBUSxNQURoQjtBQUVGO0FBQ0E7QUFDQTtBQUNBLDZCQUFpQjtBQUxmO0FBSkYsS0FBUixFQWFDLElBYkQsQ0FhTSxVQUFDLE1BQUQsRUFBWTtBQUNkLGdCQUFRLEdBQVIsQ0FBWSxNQUFaO0FBQ0gsS0FmRDtBQWdCSCxDQWpCRDs7QUFtQkEsUUFBUSxJQUFSLEdBQWUsWUFBTTtBQUNqQixZQUFRLFVBQVIsQ0FBbUIsU0FBbkIsRUFBOEIsWUFBOUIsRUFBNEMsU0FBNUMsRUFBdUQsV0FBdkQ7QUFDSCxDQUZEOztBQUlBLEVBQUUsWUFBVztBQUNULFlBQVEsSUFBUjtBQUNILENBRkQ7O0FBTUE7OztBQUdBOzs7O0FBSUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyAgQ3VzdG9tZXIgZW50ZXJzIHRoZWlyIHJlcXVpcmVkIHNlYXJjaCBwYXJhbWV0ZXJzIChpbmdyZWRpZW50cywgY291cnNlIHR5cGUsIGN1c2lzaW5lIHR5cGUsIGRpZXRhcnkgcmVzdHJpY3Rpb25zKVxyXG4gICAgLy8gIEV4YW1wbGUgb2YgYSBzZWFyY2ggZm9yIGNoaWNrZW4gYW5kIGJyb2Njb2xpIC8gTWFpbiBkaXNoIC8gSXRhbGlhbiAvIE5vIGRpZXRhcnkgcmVzdHJpY3Rpb25cclxuICAgICAgICAvLyAgRG8gYW4gQVBJIGNhbGwgZm9yIGFsbCByZWNpcGVzIHdpdGggY2hpY2tlbiBhbmQgYnJvY2NvbGlcclxuICAgICAgICAvLyAgVGhlbiBmaWx0ZXIgdGhlIHJlc3VsdHMgYmFzZWQgb24gdGhlIG90aGVyIGNyaXRlcmlhIC0gc3RhcnRpbmcgd2l0aCBjb3Vyc2UgdHlwZSAtIHRoZW4gY3Vpc2luZSB0eXBlIC0gdGhlbiBkaWV0YXJ5IHJlc3RyY2l0aW9uc1xyXG4vLyAgVGhlIGRhdGEgaXMgcHVsbGVkIGZyb20gdGhlIEFQSSBhbmQgZGlzcGxheWVkIG9udG8gdGhlIHBhZ2UgaW4gYSBsaXN0XHJcbiAgICAvLyAgVGhlIGZpbHRlcmVkIHJlc3VsdHMgd2lsbCB0aGVuIGJlIGJyb2tlbiBkb3duIGludG8gaW5kaXZpZHVhbCByZWNpcGVzIC0gZGlzcGxheWluZyBhbiBpbWFnZSBvZiB0aGUgZGlzaCwgdGhlIG5hbWUgb2YgdGhlIGRpc2ggYW5kIGEgZGVzY3JpcHRpb24gb2YgaXRcclxuLy8gIFRoZSByZWNpcGVzIHdpbGwgYmUgY2xpY2thYmxlIHRvIHRha2UgdGhlbSB0byBhIGZ1bGwgdmlldyBvZiB0aGVtXHJcbiAgICAvLyAgVGhlIHJlY2lwZXMgd2lsbCBiZSBvcGVuZWQgaW4gYSBuZXcgdGFiXHJcblxyXG5jb25zdCBmb29kQXBwID0ge307XHJcblxyXG5mb29kQXBwLmFwaVVSTCA9ICdodHRwOi8vYXBpLnl1bW1seS5jb20vdjEvYXBpL3JlY2lwZXM/X2FwcF9pZD03MWVjM2UwNCc7XHJcbmZvb2RBcHAuYXBpS2V5ID0gJ2NjMWZkNGY2Y2UxNjdjMTE5OGZlYmQxNjJmZWE4MzkyJztcclxuXHJcbmZvb2RBcHAuZ2V0UmVjaXBlcyA9IChpbmdyZWRpZW50cywgY291cnNlVHlwZSwgY3Vpc2luZVR5cGUsIGRpZXRhcnkpID0+IHtcclxuICAgICQuYWpheCAoe1xyXG4gICAgICAgIHVybDogZm9vZEFwcC5hcGlVUkwsXHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgX2FwcF9rZXk6IGZvb2RBcHAuYXBpS2V5LFxyXG4gICAgICAgICAgICAvLyBxOiBpbmdyZWRpZW50cyxcclxuICAgICAgICAgICAgLy8gJ2FsbG93ZWRDb3Vyc2VbXSc6IGBjb3Vyc2VeY291cnNlLSR7Y291cnNlVHlwZX1gLFxyXG4gICAgICAgICAgICAvLyAnYWxsb3dlZEN1aXNpbmVbXSc6IGBjdWlzaW5lXmN1aXNpbmUtJHtjdWlzaW5lVHlwZX1gLFxyXG4gICAgICAgICAgICAnYWxsb3dlZERpZXRbXSc6IGRpZXRhcnlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZvb2RBcHAuaW5pdCA9ICgpID0+IHtcclxuICAgIGZvb2RBcHAuZ2V0UmVjaXBlcygnY2hpY2tlbicsICdBcHBldGl6ZXJzJywgJ2l0YWxpYW4nLCAnNDAzXlBhbGVvJyk7XHJcbn07XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgZm9vZEFwcC5pbml0KCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG4vLyAgRXhhbXBsZSBmb3IgcGFnaW5hdGlvbiBsYXRlciBvblxyXG5cclxuXHJcbi8qIG1heFJlc3VsdCwgc3RhcnQgOiBUaGUgbWF4UmVzdWx0IGFuZCBzdGFydCBwYXJhbWV0ZXJzIGFsbG93IHBhZ2luYXRpb24gYW5kICMgb2YgcmVzdWx0cyBjb250cm9sLiBCeSBkZWZhdWx0IDYgcmVjaXBlcyBhcmUgcmV0dXJuZWQgYnkgdGhlIHNlYXJjaCBBUEkuXHJcbkZvciBleGFtcGxlLCBpZiB5b3Ugd2FudCAxMCByZWNpcGVzIHBlciBwYWdlIGFuZCB3YW50IHRvIHNlZSB0aGUgc2Vjb25kIHBhZ2Ugb2YgcmVzdWx0cywgeW91IHdvdWxkIGFwcGVuZCAmbWF4UmVzdWx0PTEwJnN0YXJ0PTEwLiBTdGFydCBpcyBzZXQgdG8gMTAgdmVyc3VzIGJlY2F1c2UgdGhlIG51bWJlcmluZyBmb3IgcmVzdWx0cyBzdGFydHMgYXQgMCAodmVyc3VzIDEpLlxyXG5Gb3IgZXhhbXBsZTogaHR0cDovL2FwaS55dW1tbHkuY29tL3YxL2FwaS9yZWNpcGVzP19hcHBfaWQ9WU9VUl9JRCZfYXBwX2tleT1ZT1VSX0FQUF9LRVkmcT1vbmlvbitzb3VwXHJcbiZtYXhSZXN1bHQ9MTAmc3RhcnQ9MTAgKi9cclxuLy8gIGNhbiBoYXZlIGEgdmFyaWFibGUgaW4gcGxhY2Ugb2YgdGhlIDEwIGZvciBzdGFydCB0aGF0IHdvdWxkIGluY3JlYXNlIG9uIGVhY2ggTG9hZCBNb3JlIGJ1dHRvbiBjbGljay5cclxuXHJcblxyXG4vLyAgdmFsdWVzIGZvciBjdWlzaW5lcyBoYXZlIHRvIGFsbCBiZSBpbiBsb3dlciBjYXNlXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtYW1lcmljYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1raWQtZnJpZW5kbHlcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1pdGFsaWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtYXNpYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1tZXhpY2FuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtc291dGhlcm5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1mcmVuY2hcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1zb3V0aHdlc3Rlcm5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1iYXJiZWN1ZS1iYnFcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1pbmRpYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1jaGluZXNlXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtY2FqdW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1tZWRpdGVycmFuZWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtZ3JlZWtcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1lbmdsaXNoXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtc3BhbmlzaFxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXRoYWlcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1nZXJtYW5cclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1tb3JvY2NhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWlyaXNoXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtamFwYW5lc2VcclxuLy8gIGN1aXNpbmVeY3Vpc2luZS1jdWJhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWhhd2FpaWFuXHJcbi8vICBjdWlzaW5lXmN1aXNpbmUtc3dlZGlzaFxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLWh1bmdhcmlhblxyXG4vLyAgY3Vpc2luZV5jdWlzaW5lLXBvcnR1Z3Vlc2VcclxuXHJcbi8vICB2YWx1ZXMgZm9yIGRpZXRhcnkgYXJlIGFzIGZvbGxvd3M6XHJcbi8vICAzODZeVmVnYW5cclxuLy8gIDM4N15MYWN0by1vdm8gdmVnZXRhcmlhblxyXG4vLyAgMzg4XkxhY3RvIHZlZ2V0YXJpYW5cclxuLy8gIDM4OV5Pdm8gdmVnZXRhcmlhblxyXG4vLyAgMzkwXlBlc2NldGFyaWFuXHJcbi8vICA0MDNeUGFsZW9cclxuXHJcbi8vICB2YWx1ZXMgZm9yIGNvdXJzZSB0eXBlcyBhcmUgYXMgZm9sbG93czpcclxuLy8gIGNvdXJzZV5jb3Vyc2UtTWFpbiBEaXNoZXNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtRGVzc2VydHNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtU2lkZSBEaXNoZXNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQXBwZXRpemVyc1xyXG4vLyAgY291cnNlXmNvdXJzZS1TYWxhZHNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQnJlYWtmYXN0IGFuZCBCcnVuY2hcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQnJlYWRzXHJcbi8vICBjb3Vyc2VeY291cnNlLVNvdXBzXHJcbi8vICBjb3Vyc2VeY291cnNlLUJldmVyYWdlc1xyXG4vLyAgY291cnNlXmNvdXJzZS1Db25kaW1lbnRzIGFuZCBTYXVjZXNcclxuLy8gIGNvdXJzZV5jb3Vyc2UtQ29ja3RhaWxzXHJcbi8vICBjb3Vyc2VeY291cnNlLVNuYWNrc1xyXG4vLyAgY291cnNlXmNvdXJzZS1MdW5jaFxyXG5cclxuLy8gIFByYXRpayBjdXJyZW50IHRhc2s6IHN0YXJ0aW5nIG9uIGZvcm0gbGF5b3V0IGZvciBzZWFyY2hpbmdcclxuLy8gIENocmlzIGN1cnJlbnQgdGFzayAtIHdvcmsgb24gZ2V0dGluZyBkYXRhIGZyb20gQVBJIGFuZCBmaWx0ZXJpbmdcclxuIl19
