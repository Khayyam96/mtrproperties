export interface LandPropertyMedia {
    id: number;
    gallery: string[];
}

export interface LandPropertyArea {
    id: number;
    type: string;
    name: string;
    lat: string;
    long: string;
}

export interface LandPropertyTranslation {
    id: number;
    title: string;
    subtitle: string;
}

export interface LandProperty {
    id: number;
    slug: string;
    address: string;
    whatsappNumber: string;
    phoneNumber: string;
    sq_ft: string;
    price: string;
    utility_count: number;
    purpose: string;
    build_status: string;
    currency: string;
    media: LandPropertyMedia;
    areas: LandPropertyArea[];
    translation: LandPropertyTranslation;
}

export interface LandPropertiesResponse {
    data: LandProperty[];
    page: number;
    per_page: number;
    total: number;
}
