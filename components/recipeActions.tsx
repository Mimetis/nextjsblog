"use client"

import { Favorite, Recipe } from '@prisma/client';
import * as React from 'react';
import { FaComment, FaEdit, FaHeart } from 'react-icons/fa';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface IRecipeActionsProps {
    recipe: Recipe
}

const RecipeActions: React.FunctionComponent<{ recipeId: number, userId: string, favorites?: Favorite[] }> = ({ recipeId, userId, favorites }) => {

    const [currentFavorite, setCurrentFavorite] = React.useState(favorites ? favorites[0] : undefined);
    const router = useRouter();

    const fetchLike = async (like: { recipeId: number, userId: string }) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const requestInit: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(like)
        };
        const response = await fetch('/api/favorites', requestInit);
        const jsonResponse = await response.json();
        return jsonResponse;
    }


    const onClickFavorite = async () => {
        const fav = await fetchLike({ recipeId: recipeId, userId: userId });
        setCurrentFavorite(fav);
        router.refresh();
    }


    return <>
        <div className="flex justify-end space-x-4 mt-8">
            <button onClick={() => onClickFavorite()} className="px-4 py-2 bg-white hover:bg-gray-300 active:bg-gray-200 rounded-full shadow-md">
                {currentFavorite
                    ? <AiFillHeart color="red" size={20} />
                    : <AiOutlineHeart color="red" size={20} />
                }
            </button>
            <button className="px-4 py-2 bg-white hover:bg-gray-300 active:bg-gray-200 rounded-full shadow-md">
                <FaComment className="text-blue-500" />
            </button>
            <Link href={`admin/recipes/${recipeId}`} className="px-4 py-2 bg-white hover:bg-gray-300 active:bg-gray-200 rounded-full shadow-md">
                <FaEdit className="text-gray-500" />
            </Link>
        </div>
    </>
        ;
};

export default RecipeActions;
