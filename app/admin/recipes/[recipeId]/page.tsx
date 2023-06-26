
import { PrismaClient } from "@prisma/client";
import RecipeEdit from "../recipeEdit";
import { getUnsplashImage } from "@/lib/unsplash";

const prisma = new PrismaClient();

const getRecipe = async (recipeId: number) => {
    const recipe = await prisma.recipe.findUniqueOrThrow({
        where: { id: recipeId },
        include: { favorites: true }
    });
    return recipe;
};

export default async function EditRecipe({ params }: { params: { recipeId: string } }) {

    const recipe = await getRecipe(+params.recipeId);

    const createdAtStr = recipe.createdAt.toDateString();
    const updatedAtStr = recipe.updatedAt.toDateString();
    const recipeFull = { createdAtStr, updatedAtStr, ...recipe };
    const { createdAt, updatedAt, ...recipeSerializable } = recipeFull; 

    return <RecipeEdit
        recipe={recipeSerializable}
        key={recipe.id}
    />
}