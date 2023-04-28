"use client";

import { Favorite, Recipe } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from 'react-toastify';

const LikeRecipe: React.FunctionComponent<{ recipeId: number, userId: string, favorites?: Favorite[] }> = ({ recipeId, userId, favorites }) => {
    const [currentFavorite, setCurrentFavorite] = useState(favorites ? favorites[0] : undefined);
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

    const onClick = async (e:any) => {
        e.preventDefault();
        const fav = await fetchLike({
            recipeId: recipeId,
            userId: userId,
        })

        setCurrentFavorite(fav);
        router.refresh();
        toast.success(fav ? "recipe added as favorite" : "recipe removed from favorite");
    }


    return <>
        <button onClick={(e) => onClick(e)} >
            {currentFavorite
                ? <AiFillHeart color="red" size={20} />
                : <AiOutlineHeart color="red" size={20} />
            }
        </button>
    </>
}

export default LikeRecipe; 