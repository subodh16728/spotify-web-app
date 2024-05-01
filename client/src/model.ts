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