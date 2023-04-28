import { blurHashToDataURL } from '@/components/blurhash';
import LikeRecipe from '@/components/likeRecipe';
import { Favorite, PrismaClient, Recipe } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { RecipeList } from './recipeList';
import SearchRecipe from '@/components/searchRecipe';


const prisma = new PrismaClient();

const getRecipes = async (search: string) => {
  const recipes = await prisma.recipe.findMany({
    where: {
      authorId: 'SP',
      title: {
        contains: search
      }
    },
    select: {
      favorites: true,
      id: true,
      thumbnailUrl: true,
      title: true,
      slug: true,
      blurDataUrl: true,
      authorId: true
    }
  });
  return recipes;
};

export const metadata = {
  title: 'Cakes list',
  description: 'List fo delicious cakes',
}


const Home = async ({ searchParams: { search } }: { searchParams: { search: string } }) => {
  console.log(search);
  let recipes = await getRecipes(search);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
        <RecipeList recipes={recipes} />
      </div>
    </>
  );
}

export default Home;