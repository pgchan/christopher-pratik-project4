//  Customer enters their required search parameters (ingredients, course type, cusisine type, dietary restrictions)
    //  Example of a search for chicken and broccoli / Main dish / Italian / No dietary restriction
        //  Do an API call for all recipes with chicken and broccoli
        //  Then filter the results based on the other criteria - starting with course type - then cuisine type - then dietary restrcitions
//  The data is pulled from the API and displayed onto the page in a list
    //  The filtered results will then be broken down into individual recipes - displaying an image of the dish, the name of the dish and a description of it
//  The recipes will be clickable to take them to a full view of them
    //  The recipes will be opened in a new tab

const foodApp = {};

foodApp.apiURL = 'http://api.yummly.com/v1/api/recipes?_app_id=71ec3e04';
foodApp.apiKey = 'cc1fd4f6ce167c1198febd162fea8392';

foodApp.getRecipes = (ingredients, courseType, cuisineType, dietary) => {
    $.ajax ({
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
    })

    .then((result) => {
        console.log(result);
    });
}

foodApp.init = () => {
    foodApp.getRecipes('chicken', 'Appetizers', 'italian', '403^Paleo');
};

$(function() {
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
