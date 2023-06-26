"use client";

import { UnsplashImage, UnsplashSearchImages, unsplashImageSchema, unsplashSearchImagesSchema } from '@/lib/unsplashTypes';
import Image from 'next/image';
import * as React from 'react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { z } from 'zod';

interface ISelectUnsplashImageProps {
    width: number,
    height: number,
    searchCriteria: string,
    setPictureId: Dispatch<SetStateAction<string>>
    pictureId?: string
}

const SelectUnsplashImage: React.FunctionComponent<ISelectUnsplashImageProps> = (props) => {

    const undefinedPictureImageSrc = "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixid=Mnw0MzY1MTd8MHwxfHNlYXJjaHwyfHx1bmRlZmluZWR8ZW58MHwwfHx8MTY4MjQyMDA3OQ&ixlib=rb-4.0.3&w=1200&h=600&q=40&fit=crop";
    const [unsplashImages, setUnsplashImages] = useState<UnsplashSearchImages>();
    const [selectedUnsplashImageIndex, setSelectedUnsplashImageIndex] = useState<number>(0);
    const [unsplashImage, setUnsplashImage] = useState<UnsplashImage>();


    useEffect(() => {

        if (!props.searchCriteria) {
            return;
        }

        (async () => {
            const response = await fetch(`/api/unsplash?search=${props.searchCriteria}`);
            const unsplashImagesJson = await response.json();
            const result = unsplashSearchImagesSchema.safeParse(unsplashImagesJson);

            if (!result.success) {
                console.log(result.error);
                return;
            }

            let allUnsplashImages = result.data;

            console.log(props);

            setUnsplashImages(allUnsplashImages);

            if (props.pictureId && allUnsplashImages && allUnsplashImages.results.length > 0) {
                for (let index = 0; index < allUnsplashImages.results.length; index++) {
                    if (allUnsplashImages.results[index].id == props.pictureId)
                        setSelectedUnsplashImageIndex(index);
                }
            } else {
                setSelectedUnsplashImageIndex(0);
            }

        })();
    }, [props.searchCriteria]);

    const selectNextPicture = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (!unsplashImages) {
            setSelectedUnsplashImageIndex(0);
            return;
        }
        setSelectedUnsplashImageIndex((p) => p >= unsplashImages['results'].length - 1 ? p : p + 1);
    }
    const selectPreviousPicture = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (!unsplashImages) {
            setSelectedUnsplashImageIndex(0);
            return;
        }
        setSelectedUnsplashImageIndex((p) => p > 0 ? p - 1 : 0);

    }

    useEffect(() => {
        if (!unsplashImages || unsplashImages.results.length <= 0) {
            setUnsplashImage(undefined);
            return;
        }

        const image = unsplashImages.results[selectedUnsplashImageIndex];
        setUnsplashImage(image);

    }, [selectedUnsplashImageIndex, unsplashImages]);

    return (
        <>
            <div className="flex align-middle">
                <Image src={unsplashImage?.urls.regular || undefinedPictureImageSrc} width={props.width} height={props.height}
                    style={{ width: '100%', height: 'auto' }} alt='unsplash image' />
            </div>
            <div className="flex flex-wrap justify-center items-center">
                <label
                    htmlFor="picture"
                    className="block uppercase tracking-wide font-bold text-base ">
                    Choose a picture:
                </label>
                <button onClick={(e) => selectPreviousPicture(e)} className="self-stretch mr-2">
                    <AiFillCaretLeft size={20} color="green" className="hover:bg-gray-300" />
                </button>
                <button onClick={(e) => selectNextPicture(e)} className="self-stretch">
                    <AiFillCaretRight size={20} color="green" className="hover:bg-gray-300" />
                </button>
            </div>

        </>
    );
};

export default SelectUnsplashImage;
