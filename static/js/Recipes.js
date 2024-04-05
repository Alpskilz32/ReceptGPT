// you are a developer for a html website, you already have a few html pages, but also javascript and css pages.  
// you have a page where you  already see 20 results. But you want to have a button, when clikced it gives you  20 results extra. 
// the results comes from a api with the code fetch. (you can make up a api as an example)

const resultsList = document.querySelector('#results');
const footer = document.querySelector('#footer');
let fromIndex = 0;
let extraIndex = 0;
let toIndex = 20;

// Call searchRecipes when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    searchRecipes();
});

async function searchRecipes() {
    const searchTerms = ['Bruschetta', 'Mini quiches', 'Stuffed mushrooms', 'Cheese platter', 'Spring rolls', 'Lemonade', 'Iced tea', 'Smoothies',
        'Hot chocolate', 'Mocktails', 'Roasted carrots', 'Steamed broccoli', 'Grilled zucchini', 'Sautéed spinach', 'Ratatouille',
        'Grilled salmon', 'Beef stew', 'Vegetable stir-fry', 'curry', 'risotto', 'Garlic bread', 'Focaccia', 'Dinner rolls',
        'Naan bread', 'bread', 'Baguettes', 'Apple pie', 'Chocolate mousse', 'Tiramisu', 'Cheesecake', 'Fruit tart', 'Indian',
        'Arabic', 'Turkish', 'Greek', 'Dutch', 'American', 'French', 'Russian', 'German', 'Chinese', 'Korean', 'chicken',
        'boneless chicken breast', 'olive oil', 'garlic powder', 'salt', 'pepper', 'pasta', 'spaghetti', 'tomato sauce',
        'ground beef', 'onion', 'garlic', 'parmesan cheese', 'salad', 'lettuce', 'tomato', 'cucumber', 'bell pepper', 'red onion',
        'balsamic vinaigrette', 'soup', 'chicken broth', 'carrots', 'celery', 'onion', 'garlic', 'noodles', 'cake', 'flour', 'sugar',
        'eggs', 'butter', 'vanilla extract', 'baking powder', 'milk', 'yeast', 'water', 'rolls', 'dessert', 'chocolate chips',
        'chocolate', 'baking soda', 'beverage', 'coffee', 'tea', 'lemons', 'ice'
    ];
    const randomSearchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    const response = await fetch(`https://api.edamam.com/search?q=${randomSearchTerm}&app_id=07d2b65d&app_key=eeac17db3a95003ca5781d48b6a7e3ee&from(${fromIndex+extraIndex})&to=${toIndex}`);
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
    let html ='';
    recipes.forEach((recipe) => {
        const dietLabels = recipe.recipe.dietLabels.length > 0 ? recipe.recipe.dietLabels.join(' / ') : 'none';

        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
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
            
            <span class="healthLabels">  ${recipe.recipe.healthLabels.join(' / ')} </span>

           
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `;
    });
    resultsList.innerHTML += html; // Append the new recipes to the existing list
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
        <span> Total Nutrients: ${recipe.recipe.totalNutrients} </span>
        <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div>`;
        });
        resultsList.insertAdjacentHTML('beforeend', html);
}





