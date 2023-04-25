"use client"

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface IActiveLinkProps {
    href: string;
}

const ActiveLink: React.FunctionComponent<PropsWithChildren<IActiveLinkProps>> = (props) => {
    const pathName = usePathname()

    let className = pathName === props.href ? 'flex text-gray-100 font-bold' : 'flex';

    return (
        <Link href={props.href} className={className}>
            {props.children}
        </Link>);
};

export default ActiveLink;
