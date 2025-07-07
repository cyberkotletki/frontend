import React, {FC} from 'react';

export enum HeaderVariant {
    full,
    onlyBack,
}

interface HeaderProps {
    variant: HeaderVariant;
}

const Header: FC<HeaderProps> = ({variant} : HeaderProps )  =>{
    return (
        variant == HeaderVariant.full ? (
            <div>
            {/*        full header*/}
            </div>
        ) : (
            <div>
            {/*    only back header (check in figma)*/}
            </div>
        )
    )
}

export default Header;