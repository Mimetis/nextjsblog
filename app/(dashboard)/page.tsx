import { PrismaClient } from '@prisma/client';
import { RecipeCard } from '../../components/recipeCard';
import { getUnsplashImage } from '@/lib/unsplash';
import { z } from 'zod';
import { UnsplashImage } from '@/lib/unsplashTypes';
import { ShimmerCard } from './loading';

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
      thumbnailId: true,
      title: true,
      slug: true,
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
  let recipes = await getRecipes(search);

  let thumbsPromise: Promise<UnsplashImage | undefined>[] = [];

  recipes.forEach(async (recipe) => {
    if (!recipe.thumbnailId)
      return;
    thumbsPromise.push(getUnsplashImage(recipe.thumbnailId));
  });

  const thumbs = await Promise.all(thumbsPromise);

  let extRecipes = recipes.map(recipe => {
    let thumb = thumbs.find(t => t && t.id == recipe.thumbnailId);
    return { image: thumb, ...recipe };
  });

  // const extRecipes: any[] = [];
  // for (let recipe of recipes) {
  //   if (!recipe.thumbnailId)
  //     continue;
  //   let thumb = await getUnsplashImage(recipe.thumbnailId)
  //   extRecipes.push({ image: thumb, ...recipe });
  // }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
      {extRecipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </div >
  );
}

export default Home;