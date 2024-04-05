sessionStorage.setItem("app_id", "07d2b65d");
sessionStorage.setItem("app_key", "eeac17db3a95003ca5781d48b6a7e3ee")


const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');



let fromIndex = 0;
let extraIndex = 0;
let toIndex = 20;


  const app_id = sessionStorage.getItem("app_id");    
  const app_key = sessionStorage.getItem("app_key");
  


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
}) 

async function searchRecipes() {
    try {
        const searchValue = searchInput.value.trim();
        const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=${app_id}&app_key=${app_key}&from(${fromIndex+extraIndex})&to=${toIndex}`);
        const data = await response.json();

        if (!data || !data.hits || !Array.isArray(data.hits)) {
            throw new Error('Invalid response from API');
        }

        displayRecipes(data.hits);

        if (data.hits.length === 0) {
            loadMoreBtn.style.display = 'none';
            footer.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'initial';
            footer.style.display = 'initial';
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);

        const errorMessageElement = document.getElementById('error-message');
        // Display error message
        errorMessageElement.textContent = 'An error occurred while fetching recipes. Please try again later.';
        errorMessageElement.style.display = 'flex';
        // Hide results section
        resultsList.innerHTML = '';
        loadMoreBtn.style.display = 'none';
        footer.style.display = 'none';
    }

}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        const dietLabels = recipe.recipe.dietLabels.length > 0 ? recipe.recipe.dietLabels.join(' / ') : 'none';

        html += `
        <div>
            <div class="recipe-container">
                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                <span class="healthLabels">${recipe.recipe.healthLabels.join(' / ')}</span>
            </div>
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            
            <section class="recipe-footer">
                <span>  ${recipe.recipe.yield} person(s) </span>
                <span class="kcal"> ${Math.round(recipe.recipe.calories)}  kcal </span> 
                <span>  ${recipe.recipe.mealType} </span>
                <span>  ${recipe.recipe.totalTime} minutes </span>
                <span class="dietLabels">  diet: ${dietLabels} </span>
            </section>
            
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `;
    }) 
    resultsList.innerHTML = html;

}






// Add event listener to load more results on button click
const loadMoreBtn = document.querySelector('#load-more');

loadMoreBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loadMoreBtn.innerText = 'Loading...';
  loadMoreRecipes();
  loadMoreBtn.innerText = 'Load More';
});

// Add loading text on button click
function loadMoreRecipes(){
  fromIndex = 20;
  toIndex = 20;

  fetch(`https://api.edamam.com/search?q=${searchInput.value.trim()}&app_id=${app_id}&app_key=${app_key}&from(${fromIndex})&to=${toIndex+extraIndex}&health=${healthLabelsParam}`)
  .then(res => res.json())
  .then(data => {    
    extraIndex += 10;
  displayRecipes(data.hits);
  });

}

/*
// Complete the code inside this tag
function displayMoreRecipes(moreRecipes) {
    let html = '';

  moreRecipes.forEach(recipe => {
    html += `
      <div>
        <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
        <h3>${recipe.recipe.label}</h3>
        <ul>
        ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
      <!--  <p>${recipe.recipe.summary}</p>
        <p>${recipe.recipe.instructions}</p> -->

        <p> 
         <span className: 'px-2 py-1 text-[12px] capatalize bg-[#0c452243] shadow
         -X1 rounded full mr-3 text-green-500'> ${recipe.recipe.yield} person(s) </span>
         <span> ${recipe.recipe.calories} kcal </span>
         <span className: 'px-2 py-1 text-[12px] capatalize bg-[#0c452243] shadow-
         X1 rounded full mr-3 text-green-500'> ${recipe.recipe.mealType} </span>
         <span> ${recipe.recipe.totalTime} minutes </span>
        </p>

        <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div>`;
        });
        resultsList.insertAdjacentHTML('beforeend', html);}

*/


// shuffle and display one recipe
async function shuffleRecipes() {
    const searchTerms = ['Bruschetta', 'Mini quiches', 'Stuffed mushrooms', 'Cheese platter', 'Spring rolls', 'Lemonade', 'Iced tea', 'Smoothies',
    'Hot chocolate', 'Mocktails', 'Roasted carrots', 'Steamed broccoli', 'Grilled zucchini', 'Sautéed spinach', 'Ratatouille',
    'Grilled salmon', 'Beef stew', 'Vegetable stir-fry', 'curry', 'risotto', 'Garlic bread', 'Focaccia', 'Dinner rolls',
    'Naan bread', 'bread', 'Baguettes', 'Apple pie', 'Chocolate mousse', 'Tiramisu', 'Cheesecake', 'Fruit tart', 'Indian',
    'Arabic', 'Turkish', 'Greek', 'Dutch', 'American', 'French', 'Russian', 'German', 'Chinese', 'Korean', 'chicken',
    'boneless chicken breast', 'olive oil', 'garlic powder', 'salt', 'pepper', 'pasta', 'spaghetti', 'tomato sauce',
    'ground beef', 'onion', 'garlic', 'parmesan cheese', 'salad', 'lettuce', 'tomato', 'cucumber', 'bell pepper', 'red onion',
    'ground beef', 'onion', 'garlic', 'parmesan cheese', 'salad', 'lettuce', 'tomato', 'cucumber', 'bell pepper', 'red onion',
    'balsamic vinaigrette', 'soup', 'chicken broth', 'carrots', 'celery', 'onion', 'garlic', 'noodles', 'cake', 'flour', 'sugar',
    'eggs', 'butter', 'vanilla extract', 'baking powder', 'milk', 'yeast', 'water', 'rolls', 'dessert', 'chocolate chips',
    'chocolate', 'baking soda', 'beverage', 'coffee', 'tea', 'lemons', 'ice'];
    // Shuffle array
    const randomSearchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    // Search API with random term
    toIndex2 = 1;
    const response = await fetch(`https://api.edamam.com/search?q=${randomSearchTerm}&app_id=${app_id}&app_key=${app_key}&from=0&to=${toIndex2}`);
    // Get results
    const data = await response.json();
    // Display single recipe
    displayRecipes(data.hits);

    //custom css 
    const resultsDiv = document.querySelector('#results > div');
    const resultsImg = document.querySelector('#results img');
    const mobileView = window.matchMedia("(max-width: 450px)");
    //design if screen is max-width 700px 
    if(mobileView.matches){
        resultsDiv.style.cssText = `width: 90vw; min-width: 80vw; position: relative; margin: auto;`;
    }
    else {
        resultsDiv.style.cssText = `width: 50vw; min-width: 40vw; position: relative; margin: 5vh auto;`;
        resultsImg.style.cssText = `width: 100%; height: 100%;  object-fit: cover;`;
    }

    // When only 1 recipe is returned, hide load more button
    if(data.hits.length === 1) {
        loadMoreBtn.style.display = 'none';
        footer.style.display = 'initial';
    }

}







// Get the modal
const modal = document.getElementById('filterModal');

// Get the button that opens the modal
const filterBtn = document.getElementById('filterBtn');

// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
filterBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// When the user clicks on <span> (x), close the modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Handle form submission
const filterForm = document.getElementById('filterForm');

filterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  applyFilters();
});

function applyFilters() {
    // Diet Labels
    const balanced = document.getElementById('balanced').checked;
    const highFiber = document.getElementById('high-fiber').checked;
    const highProtein = document.getElementById('high-protein').checked;
    const lowCarb = document.getElementById('low-carb').checked;
    const lowFat = document.getElementById('low-fat').checked;
    const lowSodium = document.getElementById('low-sodium').checked;

    // Health Labels
    const crustaceanFree = document.getElementById('crustacean-free').checked;
    const dairyFree = document.getElementById('dairy-free').checked;
    const DASH = document.getElementById('DASH').checked;
    const alcoholFree = document.getElementById('alcohol-free').checked;
    const immunoSupportive = document.getElementById('immuno-supportive').checked;
    const lowPotassium = document.getElementById('low-potassium').checked;
    const halal = document.getElementById('halal').checked;
    const kosher = document.getElementById('kosher').checked;
    const vegan = document.getElementById('vegan').checked;
    const vegetarian = document.getElementById('vegetarian').checked;
    const sugarFree = document.getElementById('sugar-free').checked;
    const glutenFree = document.getElementById('gluten-free').checked;
    const dairyFreeAgain = document.getElementById('dairy-free').checked;
    const eggFree = document.getElementById('egg-free').checked;
    const celeryFree = document.getElementById('celery-free').checked;
    const peanutFree = document.getElementById('peanut-free').checked;

    // Meal Types
    const breakfast = document.getElementById('Breakfast').checked;
    const lunch = document.getElementById('Lunch').checked;
    const dinner = document.getElementById('Dinner').checked;
    const snack = document.getElementById('Snack').checked;
    const teatime = document.getElementById('Teatime').checked;

    // Construct the diet label parameter
    const dietLabels = [];
    if (balanced) dietLabels.push('balanced');
    if (highFiber) dietLabels.push('high-fiber');
    if (highProtein) dietLabels.push('high-protein');
    if (lowCarb) dietLabels.push('low-carb');
    if (lowFat) dietLabels.push('low-fat');
    if (lowSodium) dietLabels.push('low-sodium');

    // Construct the health label parameter
    const healthLabels = [];
    if (crustaceanFree) healthLabels.push('crustacean-free');
    if (dairyFree) healthLabels.push('dairy-free');
    if (DASH) healthLabels.push('DASH');
    if (alcoholFree) healthLabels.push('alcohol-free');
    if (immunoSupportive) healthLabels.push('immuno-supportive');
    if (lowPotassium) healthLabels.push('low-potassium');
    if (halal) healthLabels.push('halal');
    if (kosher) healthLabels.push('kosher');
    if (vegan) healthLabels.push('vegan');
    if (vegetarian) healthLabels.push('vegetarian');
    if (sugarFree) healthLabels.push('sugar-free');
    if (glutenFree) healthLabels.push('gluten-free');
    if (dairyFreeAgain) healthLabels.push('dairy-free');
    if (eggFree) healthLabels.push('egg-free');
    if (celeryFree) healthLabels.push('celery-free');
    if (peanutFree) healthLabels.push('peanut-free');

    // Construct the meal type parameter
    const mealTypes = [];
    if (breakfast) mealTypes.push('Breakfast');
    if (lunch) mealTypes.push('Lunch');
    if (dinner) mealTypes.push('Dinner');
    if (snack) mealTypes.push('Snack');
    if (teatime) mealTypes.push('Teatime');

    // Construct the diet label parameter
    let dietLabelsParam = '';
    if (dietLabels.length > 0) {
    dietLabelsParam = '&diet=' + dietLabels.join('&diet=');
    }
    
    // Construct the health label parameter
    let healthLabelsParam = '';
    if (healthLabels.length > 0) {
    healthLabelsParam = '&health=' + healthLabels.join('&health=');
    }
    
    // Construct the meal type parameter
    let mealTypesParam = '';
    if (mealTypes.length > 0) {
    mealTypesParam = '&mealType=' + mealTypes.join('&mealType=');
    }

    // Modify the API request URL to include filters
    const searchValue = searchInput.value.trim();
    const apiUrl = `https://api.edamam.com/search?q=${searchValue}&app_id=${app_id}&app_key=${app_key}&from=${fromIndex+extraIndex}&to=${toIndex}${dietLabelsParam}${healthLabelsParam}${mealTypesParam}`
    
    // Send the modified API request
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayRecipes(data.hits))
        .catch(error => console.error('Error fetching recipes:', error));
}