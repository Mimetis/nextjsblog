import "server-only";
import { cache } from 'react';
import { unsplashImageSchema, unsplashSearchImagesSchema } from "./unsplashTypes";
import { delay } from "./utils";

const clientId: string = "8X4yc4MgNM_i5H9gXUy2IlnzXYf-n4SdkJL8ZukgjA4";

export const getUnsplashImage = cache(async (id: string) => {
    const unsplashImage = `https://api.unsplash.com/photos/${id}?client_id=${clientId}`;
    const response = await fetch(unsplashImage);

    if (response.status === 404)
        return undefined;

    const imageJson = await response.json();

    const result = unsplashImageSchema.safeParse(imageJson);

    if (!result.success) {
        console.log(result.error);
        throw new Error(result.error.message);
    }

    return result.data;

});

export async function searchUnsplashImages(criteria: string) {

    const searchUrl = `https://api.unsplash.com/search/photos?client_id=${clientId}&orientation=landscape&query=${criteria}`;
    const response = await fetch(searchUrl);

    if (response.status === 404)
        return undefined;

    const unsplashImagesJson = await response.json();

    const result = unsplashSearchImagesSchema.safeParse(unsplashImagesJson);

    if (!result.success) {
        console.log(result.error);
        throw new Error(result.error.message);
    }

    return result.data;
}