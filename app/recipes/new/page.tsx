"use client";

import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { Recipe } from "@prisma/client";
import slugify from "slugify";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { AiFillCaretRight, AiFillCaretLeft, AiOutlinePlus, AiOutlineCloseCircle } from "react-icons/ai";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function NewRecipe() {
    const router = useRouter();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Recipe>();
    const undefinedBlurHash = "LTFqg+fk0eR*j[nNWBTK9tWB={oz";
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const undefinedThumbnailImageSrc = "https://images.unsplash.com/photo-1535488518105-67f15b7cab27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzY1MTd8MHwxfHNlYXJjaHwyfHx1bmRlZmluZWR8ZW58MHwwfHx8MTY4MjQyMDA3OQ&ixlib=rb-4.0.3&q=80&w=200";
    const [unsplashThumbnailImage, setUnsplashThumbnailImage] = useState<unknown>();
    const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<number>(0);
    const watchThumbnailUrl = watch("thumbnailUrl");
    
    const undefinedPictureImageSrc = "https://images.unsplash.com/photo-1535488518105-67f15b7cab27?ixid=Mnw0MzY1MTd8MHwxfHNlYXJjaHwyfHx1bmRlZmluZWR8ZW58MHwwfHx8MTY4MjQyMDA3OQ&ixlib=rb-4.0.3&w=1200&h=600&q=40&fit=crop";
    const [unsplashPictureImage, setUnsplashPictureImage] = useState<unknown>();
    const [selectedPictureIndex, setSelectedPictureIndex] = useState<number>(0);
    const watchPictureUrl = watch("pictureUrl");
    
    const [inputIngredientValue, setInputIngredientValue] = useState<string>("");
    const [listIngredientsItems, setListIngredientsItems] = useState<string[]>([]);
    
    const watchTitle = watch("title");
    const debouncedTitle = useDebounce(watchTitle, 500);

    const onSubmit: SubmitHandler<Recipe> = async data => {
        await toast.promise((async () => {
            setIsLoading(!isLoading)
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const requestInit: RequestInit = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };

            const response = await fetch("/api/recipes/new", requestInit)
            const recipeResponse = await response.json()
            return recipeResponse;

        }), {
            pending: "Creating recipe...",
            error: "error creating the recipe",
            success: {
                render({ data }) { return `Recipe ${data.title} created successfully!` },
            }
        })
        router.refresh();
        router.push("/");
    }

    useEffect(() => {
        if (!watchTitle)
            return;

        let slug = slugify(watchTitle, { replacement: '_', lower: true, remove: /[*+~.()'"!:@/]/g });
        setValue("slug", slug);

    }, [watchTitle]);

    useEffect(() => {

        if (!debouncedTitle) {
            setValue("thumbnailUrl", undefinedThumbnailImageSrc);
            setValue("pictureUrl", undefinedPictureImageSrc);
            setValue("blurDataUrl", undefinedBlurHash);
            return;
        }
        (async () => {
            const response = await fetch(`https://api.unsplash.com/search/photos?client_id=8X4yc4MgNM_i5H9gXUy2IlnzXYf-n4SdkJL8ZukgjA4&orientation=landscape&query=${debouncedTitle}`);
            const unsplashImage = await response.json();
            setUnsplashThumbnailImage(unsplashImage);
            setSelectedThumbnailIndex(0);
            setUnsplashPictureImage(unsplashImage);
            setSelectedPictureIndex(0);
        })();
    }, [debouncedTitle]);

    useEffect(() => {
        if (!unsplashThumbnailImage || unsplashThumbnailImage['results'].length <= 0) {
            setValue("thumbnailUrl", undefinedThumbnailImageSrc);
            setValue("blurDataUrl", undefinedBlurHash)
            return;
        }

        const image = unsplashThumbnailImage['results'][selectedThumbnailIndex]['urls']['thumb'];
        const blurHash = unsplashThumbnailImage['results'][selectedThumbnailIndex]['blur_hash'];
        setValue("thumbnailUrl", image);
        setValue("blurDataUrl", blurHash);

    }, [selectedThumbnailIndex, unsplashThumbnailImage]);

    useEffect(() => {
        if (!unsplashPictureImage || unsplashPictureImage['results'].length <= 0) {
            setValue("pictureUrl", undefinedPictureImageSrc);
            return;
        }

        const image = unsplashPictureImage['results'][selectedPictureIndex]['urls']['regular'];
        setValue("pictureUrl", image);

    }, [selectedPictureIndex, unsplashPictureImage]);

    const selectNextThumbnail = (event) => {
        event.preventDefault();

        if (!unsplashThumbnailImage) {
            setSelectedThumbnailIndex(0);
            return;
        }
        setSelectedThumbnailIndex((p) => p >= unsplashThumbnailImage['results'].length - 1 ? p : p + 1);
    }
    const selectPreviousThumbnail = (event) => {
        event.preventDefault();

        if (!unsplashThumbnailImage) {
            setSelectedThumbnailIndex(0);
            return;
        }
        setSelectedThumbnailIndex((p) => p > 0 ? p - 1 : 0);

    }

    const selectNextPicture = (event) => {
        event.preventDefault();

        if (!unsplashPictureImage) {
            setSelectedPictureIndex(0);
            return;
        }
        setSelectedPictureIndex((p) => p >= unsplashPictureImage['results'].length - 1 ? p : p + 1);
    }
    const selectPreviousPicture = (event) => {
        event.preventDefault();

        if (!unsplashPictureImage) {
            setSelectedPictureIndex(0);
            return;
        }
        setSelectedPictureIndex((p) => p > 0 ? p - 1 : 0);

    }

    const handleAddIngredientDialogClose = () => {
        if (inputIngredientValue) {
            setListIngredientsItems((list) => {
                let newList = [...list, inputIngredientValue]
                setValue("ingredients", newList.join(", "));
                return newList;
            });
            setInputIngredientValue("");
        }
    };

    return (
        <form className="w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 grid-cols-2">

                <div className="flex flex-wrap">
                    <div className="w-full px-3 mb-6 ">
                        <label
                            htmlFor="title"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            required
                            {...register("title", { required: true, maxLength: 250 })}
                        />
                    </div>
                    <div className="w-full px-3 mb-6">
                        <div className="flex flex-wrap content-start items-baseline">
                            <label
                                htmlFor="picture"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold self-center mr-4">
                                Picture
                            </label>
                            <button onClick={(e) => selectPreviousPicture(e)} className="self-stretch mr-2">
                                <AiFillCaretLeft size={20} color="green" className="hover:bg-gray-300" />
                            </button>
                            <button onClick={(e) => selectNextPicture(e)} className="self-stretch">
                                <AiFillCaretRight size={20} color="green" className="hover:bg-gray-300" />
                            </button>
                        </div>
                        <div className="flex align-middle">
                            <Image src={watchPictureUrl || undefinedPictureImageSrc} width={1200} height={450} style={{ width: '100%', height: 'auto' }} alt='recipe image' />
                        </div>
                    </div>
                    <div className="flex w-full px-3 mb-6 items-baseline">
                        <label
                            htmlFor="slug"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Slug:
                        </label>
                        <input
                            type="text"
                            id="slug"
                            readOnly
                            className="bg-transparent ml-3"
                            required
                            {...register("slug")}
                        />
                    </div>
                    <div className="w-full px-3 mb-6 ">
                        <label
                            htmlFor="description"
                            className="block  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            {...register("description")}
                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            rows={4}
                            required
                        />
                    </div>
                    <div className="w-full px-3 mb-6 ">
                        <label
                            htmlFor="recipe"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Recipe
                        </label>
                        <textarea
                            id="recipe"
                            {...register("recipe")}
                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            rows={4}
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-wrap content-start">
                    <div className="w-full  px-3  mb-6">
                        <div className="flex flex-wrap content-start items-baseline">
                            <label
                                htmlFor="title"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold self-center mr-4">
                                Thumbnail
                            </label>
                            <button onClick={(e) => selectPreviousThumbnail(e)} className="self-stretch mr-2">
                                <AiFillCaretLeft size={20} color="green" className="hover:bg-gray-300" />
                            </button>
                            <button onClick={(e) => selectNextThumbnail(e)} className="self-stretch">
                                <AiFillCaretRight size={20} color="green" className="hover:bg-gray-300" />
                            </button>

                        </div>
                        <div className="flex align-middle">
                            <Image src={watchThumbnailUrl || undefinedThumbnailImageSrc} width={200} height={130} style={{ width: 'auto', height: 'auto' }} alt='recipe image' />
                        </div>
                    </div>
                    <div className="w-full px-3 mb-6 ">
                        <div>
                            <Dialog>
                                <div className="flex flex-wrap content-start items-baseline">
                                    <label
                                        htmlFor="title"
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold self-center mr-4">
                                        Ingredients
                                    </label>
                                    <DialogTrigger asChild>
                                        <button className="self-stretch mr-2">
                                            <AiOutlinePlus size={20} color="green" />
                                        </button>
                                    </DialogTrigger>
                                    <button onClick={(e) => { e.preventDefault(); setListIngredientsItems([]); }} className="self-stretch">
                                        <AiOutlineCloseCircle size={20} color="red" />
                                    </button>
                                </div>
                                <DialogContent className="bg-white sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Add ingredient</DialogTitle>
                                        <DialogDescription>
                                            Add an ingredient to the recipe.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor="name" className="text-right">
                                                Ingredient
                                            </label>
                                            <input id="name"
                                                className="col-span-3 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                value={inputIngredientValue}
                                                onChange={(e) => setInputIngredientValue(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <button type="submit" onClick={() => handleAddIngredientDialogClose()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline">Add Ingredient</button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <ul className="list-disc list-inside mt-4">
                            {listIngredientsItems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>


            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 ">
                    <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                </div>
            </div>
        </form >
    );

}