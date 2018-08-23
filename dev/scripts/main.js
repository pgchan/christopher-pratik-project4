//  Customer enters their required search parameters (ingredients, course type, cusisine type, dietary restrictions)
//  Example of a search for chicken and broccoli / Main dish / Italian / No dietary restriction
//  Do an API call for all recipes with chicken and broccoli
//  Then filter the results based on the other criteria - starting with course type - then cuisine type - then dietary restrcitions
//  The data is pulled from the API and displayed onto the page in a list
//  The filtered results will then be broken down into individual recipes - displaying an image of the dish, the name of the dish and a  description of it
//  need to store recipe id from each filtered result and do a separate pull to get the info from there
//  The recipes will be clickable to take them to a full view of them
//  The recipes will be opened in a new tab

const foodApp = {};

foodApp.apiID = '?_app_id=71ec3e04'
foodApp.apiKey = '&_app_key=cc1fd4f6ce167c1198febd162fea8392';
foodApp.allRecipiesApiURL = `http://api.yummly.com/v1/api/recipes${foodApp.apiID}`;
foodApp.singleRecipeApiURL = 'http://api.yummly.com/v1/api/recipe/';
// foodApp.recipeList = [];
foodApp.recipePages = 0;
foodApp.storedSearchIngredients = '';
foodApp.storedSearchCourse = '',
foodApp.storedSearchCuisine = '';
foodApp.storedSearchDietary = '';
foodApp.totalResultCount = 0;

//  the getAllRecipes method takes in the parameters from the search form and gets the matching data from the API
foodApp.getAllRecipes = (ingredients, courseType, cuisineType, dietary) => {
    $.ajax ({
        url: `${foodApp.allRecipiesApiURL}${foodApp.apiKey}${courseType}${cuisineType}${dietary}`,
        method: 'GET',
        dataType: 'json',
        data: {
            q: ingredients,
            requirePictures: true,
            maxResult: 21,
            start: foodApp.recipePages,
        }
    })
    .then((result) => {
        foodApp.totalResultCount = result.totalMatchCount;
        foodApp.displayRecipes(result.matches);
    });
}

//  the displayRecipes method takes the recipes and breaks them down to be displayed on screen
foodApp.displayRecipes = (recipes) => {
    $('.recipeList').empty();
    $('.show-more-container').empty();
    recipes.forEach((item) => {
        foodApp.getSingleRecipe(item.id);
    });
    //  only show the show more button if there are still more results to show
    if(foodApp.recipePages < (foodApp.totalResultCount - 21)) {
        const showMoreButton = `<button class="show-more">Show More Results</button>`;
        $('.show-more-container').append(showMoreButton);
    }
}

//  the getSingleRecipe method takes in a recipeID and pulls the info for that specific recipe
foodApp.getSingleRecipe = (recipeID) => {
    $.ajax ({
        url: `${foodApp.singleRecipeApiURL}${recipeID}${foodApp.apiID}${foodApp.apiKey}`,
        method: 'GET',
        dataType: 'json',
    })
    .then((result) => {
        // foodApp.recipeList.push(result);
        let courses = "---";
        if(result.attributes.course) {
            courses = result.attributes.course.join(', ')
        }
        let cuisines = "---";
        if (result.attributes.cuisine) {
            cuisines = result.attributes.cuisine.join(', ');
        }
        const showRecipe = `<div class="recipe-container">
        <a href="${result.source.sourceRecipeUrl}" target="top"><div class="img-container"><img src='${result.images[0].hostedLargeUrl}'></div>
        <h2>${result.name}</h2><a/>
        <h3>Rating: ${result.rating} / 5</h3>
        <h3>Total Time to Prepare: ${result.totalTime}</h3>
        <h3>Number of Servings: ${result.numberOfServings}</h3>
        <h3>Course Types: ${courses}</h3>
        <h3>Cuisine Types: ${cuisines}</h3>
        </div>`
        $('.recipeList').append(showRecipe);
    });
}

//  the events method will hold general event listeners for the site
foodApp.events = () => {
    $('.recipe-search').on('submit', function(e) {
        e.preventDefault();
        //  store the results from the form to be used later for pagination
        foodApp.storedSearchIngredients = $('input[type=text]').val();
        foodApp.storedSearchCourse = $('input[name=course-type]:checked').val();
        foodApp.storedSearchCuisine = $('input[name=cuisine-type]:checked').map(function() {
            return $(this).val();
        }).get().join('');
        foodApp.storedSearchDietary = $('input[name=dietary-restrictions]:checked').val();
        //  send the search results to the getAllRecipes method to pull the data from the API
        foodApp.getAllRecipes(foodApp.storedSearchIngredients, foodApp.storedSearchCourse, foodApp.storedSearchCuisine, foodApp.storedSearchDietary);
        //  reset the form after it has been submitted
        $('form').trigger('reset');
    });

    //  event listener for the show more button to show more recipe results
    $('body').on('click', '.show-more', function() {
        foodApp.recipePages+=21;
        foodApp.getAllRecipes(foodApp.storedSearchIngredients, foodApp.storedSearchCourse, foodApp.storedSearchCuisine, foodApp.storedSearchDietary)
    });
}

//  the init method initializes all the necessary methods when the page loads
foodApp.init = () => {
    foodApp.events();
};

//  document.ready to call the init method once the page is finished loading
$(function() {
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
