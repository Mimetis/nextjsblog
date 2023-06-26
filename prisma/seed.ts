import { PrismaClient } from "@prisma/client";

const recipes = [
  {
    title: "Vanilla Cake",
    slug: "vanilla_cake",
    description: "Vanilla cake is a classic dessert that has been enjoyed for generations. It is a simple yet delicious cake that can be served at any occasion, from birthday parties to weddings.\n\nThe cake is made with simple ingredients, including flour, sugar, eggs, butter, and vanilla extract. These ingredients are combined to create a light, fluffy batter that is baked to perfection. The cake has a delicate vanilla flavor that is both sweet and aromatic, making it a favorite among dessert lovers.\n\nThere are many variations of vanilla cake, including layered cakes, sheet cakes, and bundt cakes. Some recipes call for additional ingredients, such as sour cream or buttermilk, to give the cake a tangy flavor and moist texture. Other recipes may include frosting or glaze to enhance the cake's sweetness and presentation.\n\nVanilla cake is a versatile dessert that can be enjoyed on its own or with a variety of toppings, such as fresh fruit, whipped cream, or chocolate sauce. It is a classic dessert that is loved by people of all ages, and it is often served at special occasions and celebrations.",
    recipe: "To make this vanilla cake, cream together butter and sugar in a bowl. Beat in eggs, one at a time, and stir in vanilla extract. In another bowl, whisk together flour, baking powder, and salt. Add the dry ingredients to the wet ingredients and mix until just combined. Stir in milk. Pour the batter into a greased cake pan and bake for 30-35 minutes at 350°F. For the frosting, beat together butter, powdered sugar, vanilla extract, and milk until light and fluffy. Spread the frosting over the cooled cake and decorate with sprinkles.",
    ingredients: [
      "1 1/2 cups all-purpose flour",
      "1 cup granulated sugar",
      "1 1/2 teaspoons baking powder",
      "1/2 teaspoon salt",
      "1/2 cup unsalted butter, softened",
      "1/2 cup milk",
      "2 large eggs",
      "2 teaspoons vanilla extract"
    ],
    calories: 340,
    time: "1 hour",
    type: "classic",
    picture: "vdx5hPQhXFk",
    thumbnail: "4nwmShss9Rw",
    blur: "LNL;gG8^IVWD9GM{%Mayx_%Nxtoy"
  },
  {
    title: "Chocolate Cake",
    slug: "chocolate_cake",
    description: "Chocolate cake is a rich and decadent dessert that is loved by many. It is made with cocoa powder and rich chocolate, giving it a deep, chocolatey flavor.\n\nThe cake is made with simple ingredients, including flour, sugar, cocoa powder, eggs, butter, and milk. The ingredients are combined to create a rich batter that is baked to perfection. The cake is often served with a chocolate frosting or ganache, which adds to the richness and decadence of the dessert.\n\nThere are many variations of chocolate cake, including layered cakes, sheet cakes, and bundt cakes. Some recipes call for additional ingredients, such as sour cream or coffee, to enhance the chocolate flavor and moist texture. Other recipes may include nuts or fruit to add a bit of crunch or sweetness.\n\nChocolate cake is a popular dessert that is often served at special occasions, such as birthdays and weddings. It is a true indulgence that is loved by many chocolate lovers around the world.",
    recipe: "To make this chocolate cake, whisk together flour, sugar, cocoa powder, baking powder, baking soda, and salt in a bowl. In another bowl, beat together eggs, milk, oil, and vanilla extract. Add the wet ingredients to the dry ingredients and mix until just combined. Pour the batter into a greased cake pan and bake for 30-35 minutes at 350°F. For the frosting, melt together butter and chocolate chips in a double boiler. Remove from heat and stir in powdered sugar and milk until smooth. Spread the frosting over the cooled cake.",
    ingredients: [
      "1 3/4 cups all-purpose flour",
      "3/4 cup unsweetened cocoa powder",
      "1 1/2 cups granulated sugar",
      "2 teaspoons baking powder",
      "1 teaspoon baking soda",
      "1 teaspoon salt",
      "1 cup milk",
      "1/2 cup vegetable oil",
      "2 large eggs",
      "2 teaspoons vanilla extract",
      "1 cup boiling water"
    ],
    calories: 380,
    time: "1 hour",
    type: "decadent",
    picture: "kPxsqUGneXQ",
    thumbnail: "ci5LV1AwCwQ",
    blur: "LHDuuh00TK9Z=|M{X9s:f+Riflx]"

  },
  {
    title: "Carrot Cake",
    slug: "carrot_cake",
    description: "Carrot cake is a delicious and moist cake that is perfect for any occasion. It is made with grated carrots, which give it a naturally sweet flavor and a moist texture. The cake is often spiced with cinnamon, nutmeg, and ginger, which add warmth and depth to the flavor.\n\nThe cake is typically made with flour, sugar, eggs, oil, and grated carrots. Some recipes may also include chopped nuts, raisins, or crushed pineapple for added texture and sweetness.\n\nCarrot cake is often served with a cream cheese frosting, which complements the sweetness of the cake and adds a tangy flavor. The frosting can be made with cream cheese, butter, powdered sugar, and vanilla extract.\n\nCarrot cake is a classic dessert that is loved by many. It is perfect for birthdays, holidays, or any special occasion.",
    recipe: "To make this carrot cake, whisk together flour, baking powder, baking soda, cinnamon, and salt in a bowl. In another bowl, beat together sugar, oil, eggs, grated carrots, and vanilla extract. Add the wet ingredients to the dry ingredients and mix until just combined. Pour the batter into a greased cake pan and bake for 25-30 minutes at 350°F. For the frosting, beat together cream cheese, butter, powdered sugar, and vanilla extract until light and fluffy. Spread the frosting over the cooled cake.",
    ingredients: [
      "2 cups all-purpose flour",
      "2 teaspoons baking powder",
      "1 teaspoon baking soda",
      "2 teaspoons ground cinnamon",
      "1/2 teaspoon ground ginger",
      "1/4 teaspoon ground nutmeg",
      "1/2 teaspoon salt",
      "3/4 cup vegetable oil",
      "1 1/2 cups granulated sugar",
      "3 large eggs",
      "2 cups grated carrots",
      "1/2 cup chopped walnuts (optional)",
      "1/2 cup raisins (optional)"
    ],
    calories: 340,
    time: "1 hour and 15 minutes",
    type: "moist",
    picture: "roa2u7QrJn8",
    thumbnail: "JrT61g1gw7k",
    blur: "LQL}BMaK.9oMs9ozXSae.To}t7R%"
  },
  {
    title: "Blueberry Cheesecake",
    slug: "blueberry_cheesecake",
    description: "Blueberry cheesecake is a delicious and creamy dessert that is perfect for any occasion. It is made with a graham cracker crust, a rich and creamy cheesecake filling, and a sweet blueberry topping.\n\nThe crust is made with graham cracker crumbs, butter, and sugar, and is pressed into the bottom of a springform pan. The cheesecake filling is made with cream cheese, sugar, eggs, vanilla extract, and sour cream, which give it a tangy and creamy flavor. The blueberry topping is made with fresh or frozen blueberries, sugar, and cornstarch, and is simmered until thick and syrupy.\n\nBlueberry cheesecake is a classic dessert that is loved by many. It is perfect for summer gatherings, holidays, or any special occasion.",
    recipe: "1. Preheat the oven to 350°F (175°C).\n\n2. In a medium bowl, mix together the graham cracker crumbs, 1/4 cup of granulated sugar, and melted butter until well combined. Press the mixture onto the bottom of a 9-inch springform pan and bake for 10 minutes.\n\n3. In a large bowl, beat the cream cheese and 1 1/2 cups of granulated sugar together until smooth. Add the eggs one at a time, beating well after each addition. Stir in the vanilla extract and sour cream.\n\n4. Pour the cheesecake filling over the baked crust and bake for 50-60 minutes or until the cheesecake is set but still slightly jiggly in the center.\n\n5. Remove the cheesecake from the oven and let it cool to room temperature. Chill the cheesecake in the refrigerator for at least 4 hours or overnight.\n\n6. In a medium saucepan, combine the blueberries, 1/2 cup of granulated sugar, and cornstarch. Cook the mixture over medium heat until the blueberries release their juices and the mixture thickens, about 10-15 minutes. Let the blueberry topping cool to room temperature.\n\n7. Once the cheesecake is chilled, remove it from the springform pan and transfer it to a serving plate. Pour the blueberry topping over the cheesecake and serve.",
    ingredients: [
      "1 1/2 cups graham cracker crumbs",
      "1/4 cup granulated sugar",
      "1/2 cup unsalted butter, melted",
      "4 (8-ounce) packages cream cheese, softened",
      "1 1/2 cups granulated sugar",
      "4 large eggs",
      "1 teaspoon vanilla extract",
      "1 cup sour cream",
      "2 cups fresh or frozen blueberries",
      "1/2 cup granulated sugar",
      "2 tablespoons cornstarch"
    ],
    calories: 400,
    time: "120 minutes",
    type: "creamy",
    picture: "d4fd215305ad",
    thumbnail: "IdzCSOPuPo4",
    blur: "LFHxQcR400%MD*9Z-:WWE1x]RkM{"
  },
  {
    title: "Red Velvet Cake",
    slug: "red_velvet_cake",
    description: "A classic cake with a unique flavor and vibrant color.",
    recipe: "1. Preheat oven to 350°F (180°C). Grease and flour two 9-inch cake pans.\n\n2. In a medium bowl, whisk together flour, sugar, baking soda, salt, and cocoa powder.\n\n3. In a large bowl, whisk together vegetable oil, buttermilk, eggs, red food coloring, vanilla extract, and white vinegar.\n\n4. Gradually whisk dry ingredients into wet mixture until smooth.\n\n5. Pour batter evenly into prepared cake pans.\n\n6. Bake for 25-30 minutes, or until a toothpick inserted into the center of each cake comes out clean.\n\n7. Cool cakes in pans for 10 minutes before removing and transferring to wire racks to cool completely.\n\n8. Frost cooled cake with your favorite cream cheese frosting recipe and serve.",
    ingredients: [
      "2 1/2 cups all-purpose flour",
      "1 1/2 cups granulated sugar",
      "1 teaspoon baking soda",
      "1 teaspoon salt",
      "1 teaspoon cocoa powder",
      "1 1/2 cups vegetable oil",
      "1 cup buttermilk, room temperature",
      "2 large eggs, room temperature",
      "2 tablespoons red food coloring",
      "1 teaspoon vanilla extract",
      "1 teaspoon white vinegar"
    ],
    type: "classic",
    calories: 425,
    time: "1 hour 30 minutes",
    picture: "EfkMkUXs0fU",
    thumbnail: "RQYAbzjCK6k",
    blur: "LIGudr~Ve-Mx01xuXSozITxF%2tR"
  },
  {
    title: "Banana Bread Cake",
    slug: "banana_bread_cake",
    description: "Banana bread cake is a classic dessert that is loved by many for its moist and delicious taste. It is made by combining the flavors of ripe bananas, warm cinnamon, and rich buttery goodness. Unlike traditional banana bread, banana bread cake has a denser and more cake-like texture, making it a perfect dessert option for any occasion.\n\nOne of the reasons why banana bread cake is so popular is its versatility. It can be enjoyed for breakfast, as a snack, or as a dessert after dinner. It pairs well with a variety of toppings and additions, such as chopped nuts, chocolate chips, or a cream cheese frosting.\n\nIn addition to its great taste, banana bread cake is also relatively easy to make. With just a few simple ingredients and some basic baking skills, you can create a delicious cake that will impress your family and friends.\n\nOverall, banana bread cake is a classic dessert that everyone should try at least once. Its rich flavor and moist texture make it a favorite among many, and its versatility means that it can be enjoyed any time of day. Whether you're an experienced baker or a novice in the kitchen, banana bread cake is a dessert that is sure to impress.",
    recipe: "To make this banana bread cake, whisk together flour, baking soda, baking powder, cinnamon, and salt in a bowl. In another bowl, beat together sugar, butter, eggs, mashed bananas, and vanilla extract. Add the wet ingredients to the dry ingredients and mix until just combined. Pour the batter into a greased cake pan and bake for 50-60 minutes at 350°F. For the frosting, beat together cream cheese, powdered sugar, and vanilla extract until light and fluffy. Spread the frosting over the cooled cake.",
    ingredients: ["flour", "baking soda", "baking powder", "cinnamon", "salt", "sugar", "butter", "eggs", "bananas", "vanilla extract", "cream cheese"],
    calories: 275,
    time: "2 hours",
    type: "classic",
    picture: "MtZ9L8mRKzA",
    thumbnail: "7RzeewJzFUI",
    blur: "LbK,,100.8M{ITWFoJof.8WAa0xu"

  },
  {
    title: "Pumpkin Spice Cake",
    slug: "pumpkin_spice_cake",
    description: "Pumpkin spice cake is a delicious dessert that is perfect for fall. This cake is made with pumpkin puree, warm spices, and a fluffy, moist cake base. The spices used in this cake typically include cinnamon, nutmeg, and ginger, which add a warm, cozy flavor to the cake.\n\nOne of the best things about pumpkin spice cake is its versatility. It can be served as a dessert after a fall-themed dinner, or as a sweet treat with your morning coffee. It pairs well with a variety of toppings and frostings, such as cream cheese frosting, caramel sauce, or whipped cream.\n\nTo make pumpkin spice cake, you'll need pumpkin puree, all-purpose flour, baking powder, baking soda, salt, cinnamon, nutmeg, ginger, eggs, sugar, vegetable oil, and vanilla extract. Some recipes also call for chopped nuts or raisins to be added to the batter for additional texture.\n\nOverall, pumpkin spice cake is a delicious and easy-to-make dessert that is perfect for the fall season. Whether you're an experienced baker or a beginner in the kitchen, this cake is sure to be a hit with your family and friends.",
    recipe: "To make this pumpkin spice cake, whisk together flour, baking soda, baking powder, cinnamon, nutmeg, ginger, and salt in a bowl. In another bowl, beat together sugar, oil, eggs, canned pumpkin, and vanilla extract. Add the wet ingredients to the dry ingredients and mix until just combined. Pour the batter into a greased cake pan and bake for 25-30 minutes at 350°F. For the frosting, beat together cream cheese, butter, powdered sugar, and vanilla extract until light and fluffy. Spread the frosting over the cooled cake.",
    ingredients: ["flour", "baking soda", "baking powder", "cinnamon", "nutmeg", "ginger", "salt", "sugar", "oil", "eggs", "canned pumpkin", "vanilla extract", "cream cheese", "butter"],
    calories: 275,
    time: "2 hours",
    type: "classic",
    picture: "7mL9de-MA4M",
    thumbnail: "MYRG0ptGh50",
    blur: "LTFqg+fk0eR*j[nNWBTK9tWB={oz"

  },
  {
    title: "Coconut Cake",
    slug: "coconut_cake",
    description: "Coconut cake is a sweet and moist dessert that is perfect for any occasion. This cake is made with shredded coconut, flour, sugar, eggs, and butter, giving it a rich and buttery flavor with a slightly crunchy texture from the coconut flakes.\n\nOne of the defining features of coconut cake is its coconut frosting, which is made with cream cheese, powdered sugar, and shredded coconut. The frosting is creamy, tangy, and has a subtle coconut flavor that perfectly complements the cake.\n\nCoconut cake can be enjoyed at any time of year, but it's particularly popular during the summer months when people crave light and refreshing desserts. It pairs well with a variety of tropical fruits, such as pineapple and mango, and can be served with a dollop of whipped cream or a scoop of vanilla ice cream for added sweetness.\n\nMaking coconut cake at home is easy, and there are many recipes available online. With just a few simple ingredients and some basic baking skills, you can create a delicious cake that will impress your family and friends.\n\nOverall, coconut cake is a delicious and versatile dessert that is loved by many. Its rich flavor, moist texture, and creamy frosting make it a perfect dessert option for any occasion.",
    recipe: "To make this coconut cake, cream together butter and sugar in a bowl. Beat in eggs, one at a time, and stir in coconut extract. In another bowl, whisk together flour, baking powder, and salt. Add the dry ingredients to the wet ingredients and mix until just combined. Stir in shredded coconut. Pour the batter into a greased cake pan and bake for 30-35 minutes at 350°F. For the frosting, beat together cream cheese, butter, powdered sugar, and coconut extract until light and fluffy. Spread the frosting over the cooled cake and sprinkle with toasted coconut.",
    ingredients: ["butter", "sugar", "eggs", "coconut extract", "flour", "baking powder", "salt", "shredded coconut", "cream cheese", "powdered sugar", "toasted coconut"],
    calories: 400,
    time: "1 hour 15 minutes",
    type: "classic",
    picture: "CtrEJu5vUg0",
    thumbnail: "Id8BO472TbY",
    blur: "LXDvTRWCIooz4Tt7W=WB.8WBn$ay"

  }
]


const prisma = new PrismaClient();

async function seed() {

  // cleanup the existing database
  await prisma.favorite.deleteMany({});
  await prisma.recipe.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.create({
    data: {
      id: "SP",
      email: "sebastien.pertus@gmail.com",
      name: "Sébastien Pertus",
      pictureUrl: null,
    },
  });


  await Promise.all(
    recipes.map(async (recipe) => {
      await prisma.recipe.create({
        data: {
          authorId: "SP",
          title: recipe.title,
          description: recipe.description,
          slug: recipe.slug,
          recipe: recipe.recipe,
          calories: recipe.calories,
          pictureId: recipe.picture,
          thumbnailId: recipe.thumbnail,
          published: true,
          time: recipe.time.toString(),
          ingredients: recipe.ingredients.join(","),
        },
      })
    }

    )
  );

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
