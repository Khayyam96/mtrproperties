export type TScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

export type Media = {
    id: number;
    media_path: string;
};

export type Yacht = {
    id: number;
    name: string;
    slug: string;
    cabin_count: number;
    length_ft: number;
    guest_limit: number;
    price: number;
    model?: string;
    media: Media[];
};



