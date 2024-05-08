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
    type: string;
}

export interface Playlist {
    total: number;
}

export interface ArtistImage {
    url: string;
}

export interface ArtistDetails {
    images: ArtistImage[];
    name: string;
    type: string;
    id: string;
}

export interface Artists {
    items: ArtistDetails[];
    limit: number;
    offset: number;
    total: number;
}

export interface SectionWrapperProp {
    title?: string;
    children?: string;
    seeAllLink?: string;
    breadcrumb?: string;
}