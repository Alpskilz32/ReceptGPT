const resultsList = document.querySelector('#results');
let fromIndex = 0;
const toIndex = 20;

// Call searchRecipes when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    searchRecipes();
});

window.addEventListener('scroll', () => {
    // Check if the user has scrolled to the bottom of the page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        searchRecipes();
    }
});

async function searchRecipes() {
    const searchTerms = [ 'Bruschetta', 'Mini quiches', 'Stuffed mushrooms', 'Cheese platter', 'Spring rolls', 'Lemonade', 'Iced tea', 'Smoothies', 
       'Hot chocolate', 'Mocktails','Roasted carrots', 'Steamed broccoli', 'Grilled zucchini', 'Sautéed spinach', 'Ratatouille',
       'Grilled salmon', 'Beef stew', 'Vegetable stir-fry', 'curry', 'risotto','Garlic bread', 'Focaccia', 'Dinner rolls',
       'Naan bread','bread','Baguettes','Apple pie', 'Chocolate mousse','Tiramisu', 'Cheesecake', 'Fruit tart', 'Indian', 
       'Arabic', 'Turkish', 'Greek', 'Dutch', 'American', 'French', 'Russian', 'German', 'Chinese', 'Korean', 'chicken',
       'boneless chicken breast', 'olive oil', 'garlic powder', 'salt', 'pepper', 'pasta', 'spaghetti', 'tomato sauce', 
       'ground beef', 'onion', 'garlic', 'parmesan cheese', 'salad', 'lettuce', 'tomato', 'cucumber', 'bell pepper', 'red onion', 
       'balsamic vinaigrette', 'soup', 'chicken broth', 'carrots', 'celery', 'onion', 'garlic', 'noodles', 'cake', 'flour', 'sugar',
       'eggs', 'butter', 'vanilla extract', 'baking powder', 'milk', 'yeast', 'water', 'rolls','dessert', 'chocolate chips',
       'chocolate', 'baking soda', 'beverage', 'coffee', 'tea', 'lemons', 'ice' ];
    // Willekeurige zoekterm kiezen
    const randomSearchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)] || ( searchTerms[Math.floor(Math.random() * searchTerms.length)] && searchTerms[Math.floor(Math.random() * searchTerms.length)] ) ;
    const response = await fetch(`https://api.edamam.com/search?q=${randomSearchTerm}&app_id=5bb12558&app_key=889fa96e87eb210bdb7a2fa51dac8376&from=${fromIndex}&to=${toIndex}`);
    const data = await response.json();
    displayRecipes(data.hits);
    fromIndex += toIndex; // Increment the start index for the next fetch
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
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `;
    });
    resultsList.innerHTML += html; // Append the new recipes to the existing list
}
