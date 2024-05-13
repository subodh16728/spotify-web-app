export interface Localstorage_keys {
    [props: string]: string
}

export interface ProfileData {
    country: string;
    display_name: string;
    email: string;
    followers: ProfileDataFollower;
    images: ProfileDataImage
    href: string;
    id: string;
    product: string;
    type: string;
    uri: string;
}

export interface ProfileDataImage {
    url: string;
    length: number;
    height: null;
}

export interface ProfileDataFollower {
    href: null;
    total: number;
}

export interface Properties {
    type?: string;
}

export interface SectionWrapperProp {
    title?: string;
    children?: string;
    seeAllLink?: string;
    breadcrumb?: string;
}

export interface UserTopDataImage {
    url: string;
}

export interface UserTopDataDetails {
    images: UserTopDataImage[];
    name: string;
    type: string;
    id: string;
}

export interface UserTopData {
    items: UserTopDataDetails[];
    limit: number;
    offset: number;
    total: number;
    next: string | null;
}
