import {FC, ReactNode} from "react";
import "./components-styles.css"

interface ContainerProps {
    children: ReactNode,

}

const Container: FC<ContainerProps> = ({children}: ContainerProps) => {
    return (
        <>
            <div className={"absolute -z-1 bg"}/>
            <div className={" w-screen h-screen flex justify-center"}>
                <div className={"max-w-2xl w-full mx-auto flex  justify-center"}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Container;