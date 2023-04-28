"use client";

import { blurHashToDataURL } from '../../components/blurhash';
import LikeRecipe from '../../components/likeRecipe';
import { Favorite, PrismaClient, Recipe } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const RecipeCard: React.FunctionComponent<{ recipe: any }> = ({ recipe }) => {
    return (
        <div className="bg-gray-800 min-h-fit max-md:w-96">
            <Link href={`/recipes/${recipe.slug}`} >
                {recipe.thumbnailUrl &&
                    <Image
                        src={recipe.thumbnailUrl}
                        alt={`Thumbnail for ${recipe.title}`}
                        placeholder="blur"
                        blurDataURL={recipe.blurDataUrl ? blurHashToDataURL(recipe.blurDataUrl) : undefined}
                        width={450}
                        height={240}
                        style={{ width: '100%', height: 'auto', maxHeight: '240px' }}
                    />}
            </Link>
            <div className="flex items-center justify-between bg-slate-700 bg-opacity-20">
                <h2 className="ml-4 text-xl font-medium text-white">{recipe.title}</h2>
                <div className='mr-2 mt-2'>
                    <LikeRecipe recipeId={recipe.id} userId={recipe.authorId} favorites={recipe.favorites} />
                </div>
            </div>
        </div >
    );
}

const RecipeList: React.FunctionComponent<{ recipes: any[] }> = ({ recipes }) => {
    return <>
        {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.title} />
        ))}</>
}

export { RecipeList };