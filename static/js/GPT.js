const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

let fromIndex = 0;
let extraIndex = 0;
const toIndex = 20;

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
}) 

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=07d2b65d&app_key=eeac17db3a95003ca5781d48b6a7e3ee&from(${fromIndex+extraIndex})&to=${toIndex}`);
    const data = await response.json();
    displayRecipes(data.hits);

    // when no results, then hide button   
    if(data.hits.length === 0) {
        loadMoreBtn.style.display = 'none';
        footer.style.display = 'none';
    }
    else {
        loadMoreBtn.style.display = 'block';
        footer.style.display = 'initial';
    }

}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}"> 
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <span>  ${recipe.recipe.yield} person(s) </span>
            <span class="kcal">  ${recipe.recipe.calories.toFixed}kcal </span>
            <span>  ${recipe.recipe.mealType} </span>
            <span>  ${recipe.recipe.totalTime} minutes </span>
        
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `
    }) 
    resultsList.innerHTML = html;
}


// Add event listener to load more results on button click
const loadMoreBtn = document.querySelector('#load-more');

// Add loading text on button click
loadMoreBtn.addEventListener('click', async () => {
    loadMoreBtn.innerText = 'Loading...';

  fromIndex += 10;
  extraIndex += 10;

  await searchRecipes();

  loadMoreBtn.innerText = 'Load More';
});

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
        <span className: 'px-2 py-1 text-[12px] capatalize bg-[#0c452243] shadow
        -X1 rounded full mr-3 text-green-500'> Servings: ${recipe.recipe.yield} </span>
        <span> Calories: ${recipe.recipe.calories} </span>
        <span className: 'px-2 py-1 text-[12px] capatalize bg-[#0c452243] shadow-
        X1 rounded full mr-3 text-green-500'> Meal Type: ${recipe.recipe.mealType} </span>
        <span> Minutes: ${recipe.recipe.totalTime}  </span>
        <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div>`;
        });
        resultsList.insertAdjacentHTML('beforeend', html);}




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
    const response = await fetch(`https://api.edamam.com/search?q=${randomSearchTerm}&app_id=07d2b65d&app_key=eeac17db3a95003ca5781d48b6a7e3ee&from=0&to=${toIndex2}`);
    // Get results
    const data = await response.json();
    // Display single recipe
    displayRecipes(data.hits);
    //custom css 
    const resultsDiv = document.querySelector('#results > div');
    resultsDiv.style.cssText = `width: 50vw; min-width: 40vw; position: relative; margin: 5vh 25vw;`;
    const resultsImg = document.querySelector('#results img');
    resultsImg.style.cssText = `width: 100%; height: 100%;  object-fit: cover;`;

    if(data.hits.length === 1) {
        loadMoreBtn.style.display = 'none';
        footer.style.display = 'initial';
    }

}

