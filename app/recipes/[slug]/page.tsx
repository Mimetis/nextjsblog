import RecipeActions from '@/components/recipeActions';
import { PrismaClient, Recipe } from '@prisma/client';
import Image from 'next/image';
import * as React from 'react';

export async function generateStaticParams() {

    return [
        { slug: "vanilla_cake" },
        { slug: "chocolate_cake" },
        { slug: "carrot_cake" },
        { slug: "blueberry_cheesecake" },
        { slug: "red_velvet_cake" },
        { slug: "banana_bread_cake" },
        { slug: "pumpkin_spice_cake" },
        { slug: "coconut_cake" },
    ];
}
const prisma = new PrismaClient();

const getRecipe = async (slugId: string) => {
    const recipe = await prisma.recipe.findUniqueOrThrow({
        where: { slug: slugId }, include: {
            favorites: true,
        },
    });
    return recipe;
};

const RecipeDetailsPage = async ({ params }: { params: { slug: string } }) => {
    const recipe = await getRecipe(params.slug);

    function handleEdit(event): void {
        throw new Error('Function not implemented.');
    }

    return (
        <>
            <div className="bg-gray-100 min-h-screen w-auto">
                <div key={recipe.title}
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        {recipe.thumbnailUrl &&
                            <Image
                                className="inline-block h-48 w-48 rounded-full ring-2 ring-white"
                                src={recipe.thumbnailUrl}
                                alt=""
                                width={200}
                                height={100}
                            />}
                        <h1 className="mt-4 text-3xl font-extrabold text-gray-900">{recipe.title}</h1>
                        <p className="mt-2 text-sm text-gray-500">{recipe.type} Cake</p>
                    </div>

                    <RecipeActions recipeId={recipe.id} userId={recipe.authorId} favorites={recipe.favorites} />
                    <div className="mt-10">
                        <h2 className="text-lg font-medium text-gray-900">Description</h2>
                        <p className="mt-4 text-gray-500" style={{ whiteSpace: "pre-wrap" }}>{recipe.description}</p>
                    </div>
                    <div className="mt-10 h-64 bg-cover bg-no-repeat bg-center"
                        style={{ backgroundImage: `url(${recipe.pictureUrl})` }}>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-lg font-medium text-gray-900">Ingredients</h2>
                        <ul className="mt-4 text-gray-500 list-disc list-inside">
                            {recipe.ingredients?.split(',').map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-lg font-medium text-gray-900">Recipe</h2>
                        <p className="mt-4 text-gray-500" style={{ whiteSpace: "pre-wrap" }}>{recipe.recipe}</p>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-lg font-medium text-gray-900">Nutrition Facts</h2>
                        <p className="mt-4 text-gray-500">{recipe.calories} calories per serving</p>
                    </div>

                </div>
            </div>

        </>
    );
};

export default RecipeDetailsPage;
