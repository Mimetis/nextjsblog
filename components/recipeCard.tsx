import { blurHashToDataURL } from './blurhash';
import LikeRecipe from './likeRecipe';
import { Favorite, PrismaClient, Recipe } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { UnsplashImage } from '@/lib/unsplashTypes';

const RecipeCard: React.FunctionComponent<{
    recipe: {
        thumbnailId: string | null;
        slug: string;
        title: string;
        id: number;
        authorId: string;
        favorites: Favorite[];
        image?: UnsplashImage
    }
}> = ({ recipe }) => {

    return (
        <div className="bg-gray-800 min-h-fit max-md:w-96">
            <div className='h-[240px] lg:h-[220px] xl:h-[200px] 2xl:h-[240px]'>
                <Link href={`/recipes/${recipe.slug}`} >
                    {recipe.thumbnailId && recipe.image && recipe.image.urls.thumb &&
                        <Image
                            src={recipe.image.urls.thumb}
                            alt={`Thumbnail for ${recipe.title}`}
                            placeholder="blur"
                            blurDataURL={blurHashToDataURL(recipe.image.blur_hash)}
                            width={450}
                            height={240}
                            style={{ width: '100%', height: 'auto', maxHeight: '240px' }}
                        />}
                </Link>
            </div>
            <div className="flex items-center justify-between bg-slate-700 bg-opacity-20">
                <h2 className="ml-4 text-xl font-medium text-white">{recipe.title}</h2>
                <div className='mr-2 mt-2'>
                    <LikeRecipe recipeId={recipe.id} userId={recipe.authorId} favorites={recipe.favorites} />
                </div>
            </div>
        </div >
    );
}


export { RecipeCard };