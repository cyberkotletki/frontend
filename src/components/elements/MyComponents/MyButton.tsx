import {extendVariants, Button} from "@heroui/react";

export const MyButton = extendVariants(Button, {
    variants: {
        // <- modify/add variants
        color: {
            danger: "bg-[#231212] text-[#733B3B]",
            vasily: "bg-[#7272FD] text-[#fff]",
        },
        isDisabled: {
            true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
        },
    },
    defaultVariants: { // <- modify/add default variants
        color: "vasily",
    },
});