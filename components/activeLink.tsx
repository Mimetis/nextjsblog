"use client"

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';


declare type IActiveLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps & {
    activeClassName: string;
}

const ActiveLink: React.FunctionComponent<PropsWithChildren<IActiveLinkProps>> = (props) => {
    const pathName = usePathname()
    
    // Destructuring to remove all unecessary props
    let { activeClassName, className, children, ...otherProps } = props;

    // Construct new className
    className = pathName === props.href ? `${className} ${activeClassName}` : className;

    return <Link {...otherProps} className={className}>{props.children}</Link>;
};

export default ActiveLink;
