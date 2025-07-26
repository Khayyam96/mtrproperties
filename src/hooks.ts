import { useEffect, useState } from "react";
import { TScreenSize } from "./models";


interface IScreenState {
    screen: TScreenSize;
    size: number;
}

export const useScreenSize = (): IScreenState => {
    const getSize = (): IScreenState => {
        const width = window.innerWidth;
        let screen: TScreenSize;

        if (width < 576) screen = "xs";
        else if (width < 768) screen = "sm";
        else if (width < 992) screen = "md";
        else if (width < 1200) screen = "lg";
        else screen = "xl";

        return { screen, size: width };
    };

    const [state, setState] = useState<IScreenState>(() =>
        typeof window !== "undefined" ? getSize() : { screen: "xl", size: 1200 }
    );

    useEffect(() => {
        const handleResize = () => {
            setState(getSize());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return state;
};

export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
};
