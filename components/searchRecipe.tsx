"use client";

import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useEffect } from 'react';
import { ChangeEvent } from 'react';
import { useState, useId } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchRecipe: React.FunctionComponent = () => {
    const router = useRouter();
    const id = useId();
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce(value, 500);

    const onChange = (e: ChangeEvent) => {
        if (e.target) {
            const target = e.target as HTMLInputElement;
            setValue(target?.value);
        }
    };
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key == 'Enter') router.push(`/?search=${value}`);
    }

    useEffect(() => {
        router.push(`/?search=${value}`);

    }, [debouncedValue]);

    return <div className="flex items-center w-full p-[2px] ml-10 border rounded text-white  border-gray-800" >

        <input id={id} type="text" value={value} placeholder='Search cakes'
            className="appearance-none ml-4 block w-5/6
                        text-xl
                        indent-2
                        bg-gray-600  
                        text-gray-200 
                        leading-[42px]
                        border border-gray-600  
                        focus:outline-none focus:bg-gray-500 focus:border-gray-500"
            onChange={e => onChange(e)}
            onKeyDown={e => onKeyDown(e)}
        />

        <AiOutlineSearch className='ml-4 mr-9' size={28} />

    </div>;
};

export default SearchRecipe;


