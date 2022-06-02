const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const RecipeOne = 
	{
	title: "chicken curry",
  level: "Amateur Chef",
  ingredients: ["chicken", "onion", "tomato", "garlic", "ginger", "salt","paper","chicken masala"],
  cuisine: "indian",
  dishType: "main_course",

  image:
    "https://assets.afcdn.com/recipe/20211214/125831_w1024h768c1cx866cy866.jpg",

  duration: 120,
  creator: "Gaurav",
  created: 2022,
	}
	


const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then( () => {
    
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  async function seedDatabase() {
    try {
      // ! Delete everything from the database
      await Recipe.deleteMany()
      // ! Create the new data

      const createAllRecipes = await Recipe.insertMany(data);
      const createRecipeOne = await Recipe.create(RecipeOne);
      ////console log created recipe "chicken curry"
      console.log(createRecipeOne.title);
     //////////Iteration 4 - Update recipe
      await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      );
     //////Iteration 5 - Remove a recipe
      await Recipe.deleteOne({ title: "Carrot Cake" });
      console.log("Carrot cake has been deleted");

      ////console log all the tittles of the recipes
      const allTitles = createAllRecipes.forEach((element) => {
        console.log(element.title);
      });
      // ! Disconnect
      ////mongoose.disconnect()
      // We can use process.exit() as well to quit the process.
    } catch (e) {
      console.error(e)
    }
    mongoose.disconnect();
  }
  
  seedDatabase()