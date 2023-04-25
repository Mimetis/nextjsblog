import { blurHashToDataURL } from '@/components/blurhash';
import LikeRecipe from '@/components/likeRecipe';
import { Favorite, PrismaClient, Recipe } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const prisma = new PrismaClient();

const getRecipes = async (): Promise<(Recipe & { favorites: Favorite[] })[]> => {
  const recipes = await prisma.recipe.findMany({
    include: {
      favorites: true,
    },
    where :{
      authorId:'SP'
    }
  });
  return recipes;
};

export const metadata = {
  title: 'Cakes list',
  description: 'List fo delicious cakes',
}

const RecipeCard: React.FunctionComponent<{ recipe: (Recipe & { favorites: Favorite[] }) }> = ({ recipe }) => {
  return (
    <div className="bg-gray-100 border rounded-md shadow-md p-4 w-64">
      {recipe.thumbnailUrl &&
        <Image
          src={recipe.thumbnailUrl}
          alt={`Thumbnail for ${recipe.title}`}
          className="rounded-md"
          placeholder="blur"
          blurDataURL={recipe.blurDataUrl ? blurHashToDataURL(recipe.blurDataUrl) : undefined}
          width={222}
          height={149}
        />}
      <div className="flex justify-between">
        <h2 className="text-lg font-medium mb-1">{recipe.title}</h2>
          <LikeRecipe recipeId={recipe.id} userId={recipe.authorId} favorites={recipe.favorites} />
      </div>
      <p className="text-sm text-gray-600 mb-2">{recipe.time} to cook</p>
      <Link href={`/recipes/${recipe.slug}`} className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md transition duration-300">
        View Recipe
      </Link>
    </div>
  );
}
const Home = async () => {
  let recipes = await getRecipes();
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <h2 className="text-3xl font-bold mb-4">Recipes</h2>
        <button className='md:col-start-2 lg:col-start-3 xl:col-start-4 w-64 text-end' >
          <Link href={`/recipes/new`} className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md transition duration-300 ">
            Add new recipe
          </Link>
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.title} />
        ))}
      </div>
    </>
  );
}

export default Home;