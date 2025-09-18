export interface LandProjectMedia {
    id: number;
    gallery: string[];
}

export interface PropertyType {
    id: number;
    name: string
}

export interface LandProjectArea {
    id: number;
    type: string;
    name: string;
    lat: string;
    long: string;
}

export interface LandProjectTranslation {
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
    property_category: string;
    property_state: string;
    currency: string;
    property_type: PropertyType;
    media: LandProjectMedia;
    bedroom_count: number;
    bathroom_count: number;
    areas: LandProjectArea[];
    translation: LandProjectTranslation;
}

export interface LandProjectResponse {
    data: LandProperty[];
    page: number;
    per_page: number;
    total: number;
}
