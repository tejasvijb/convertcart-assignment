import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const axiosClient = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;
