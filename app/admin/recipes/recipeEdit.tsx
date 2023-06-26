"use client";

import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { Recipe } from "@prisma/client";
import slugify from "slugify";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { AiOutlinePlus, AiOutlineCloseCircle } from "react-icons/ai";

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
import SelectUnsplashImage from "@/components/selectUnsplashImage";


declare type RecipeEdit = Omit<Recipe, "createdAt" | "updatedAt"> &
{
    "createdAtStr": string | undefined,
    "updatedAtStr": string | undefined
}

interface IRecipeEditProps {
    recipe?: RecipeEdit
}

const RecipeEdit: React.FunctionComponent<IRecipeEditProps> = (props) => {

    const router = useRouter();


    let property: keyof RecipeEdit;

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<RecipeEdit>();
    const undefinedBlurHash = "LTFqg+fk0eR*j[nNWBTK9tWB={oz";
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [inputIngredientValue, setInputIngredientValue] = useState<string>("");
    const [listIngredientsItems, setListIngredientsItems] = useState<string[]>([]);

    const watchTitle = watch("title");
    const debouncedTitle = useDebounce(watchTitle, 500);

    const [pictureId, setPictureId] = useState<string>('');


    const onSubmit: SubmitHandler<RecipeEdit> = async data => {
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
        if (!props.recipe)
            return;

        for (property in props.recipe) {
            setValue(property, props.recipe[property]);
        }

    }, [props.recipe]);

    useEffect(() => {
        if (!watchTitle)
            return;
        let slug = slugify(watchTitle, { replacement: '_', lower: true, remove: /[*+~.()'"!:@/]/g });
        setValue("slug", slug);

    }, [watchTitle]);


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
        <form className="w-full mx-auto text-white text-xl" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 grid-cols-2">

                <div className="flex flex-wrap bg-gray-800 p-3">
                    <div className="w-full px-3 mb-6 flex items-center content-center gap-3">
                        <label
                            htmlFor="title"
                            className="block uppercase tracking-wide font-bold whitespace-nowrap">
                            Cake name:
                        </label>
                        <input type="text" id="title" required
                            className="appearance-none ml-4 block w-5/6
                            text-xl indent-2 bg-gray-600 text-gray-200
                            leading-[42px] border border-gray-600 focus:outline-none focus:bg-gray-500 focus:border-gray-500"
                            {...register("title", { required: true, maxLength: 250 })}
                        />
                    </div>
                    <div className="w-full px-3 mb-6">
                        <div className="flex flex-wrap content-start items-baseline">
                            <label
                                htmlFor="picture"
                                className="block uppercase tracking-wide font-bold">
                                Picture:
                            </label>
                        </div>
                        <SelectUnsplashImage width={1200} height={450}
                            searchCriteria={debouncedTitle} key={`picture-${debouncedTitle}`}
                            pictureId={props.recipe?.thumbnailId || undefined}
                            setPictureId={setPictureId}
                        />
                    </div>
                    <div className="flex w-full px-3 mb-6 items-baseline">
                        <label
                            htmlFor="slug"
                            className="block uppercase tracking-wide text-base font-bold mb-2">
                            Slug:
                        </label>
                        <input
                            type="text"
                            id="slug"
                            readOnly
                            className="bg-transparent ml-10"
                            required
                            {...register("slug")}
                        />
                    </div>
                    <div className="w-full px-3 mb-6 ">
                        <label
                            htmlFor="description"
                            className="block uppercase tracking-wide text-lg font-bold mb-2">
                            Description:
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
                            className="block uppercase tracking-wide text-lg font-bold mb-2">
                            Recipe:
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

                <div className="flex flex-wrap content-start bg-gray-800">
                    <div className="w-full  px-3  mb-6">
                        <div className="flex flex-wrap content-start items-baseline">
                            <label
                                htmlFor="title"
                                className="block uppercase tracking-wide font-bold">
                                Thumbnail:
                            </label>

                        </div>
                        <SelectUnsplashImage width={1200} height={450}
                            searchCriteria={debouncedTitle} key={`thumb-${debouncedTitle}`}
                            setPictureId={setPictureId} pictureId={props.recipe?.pictureId || undefined}                            
                        />
                    </div>
                    <div className="w-full px-3 mb-6 ">
                        <div>
                            <Dialog>
                                <div className="flex flex-wrap content-start items-baseline">
                                    <label
                                        htmlFor="title"
                                        className="block uppercase tracking-wide font-bold">
                                        Ingredients:
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

};

export default RecipeEdit;
