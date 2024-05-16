export interface Localstorage_keys {
    [props: string]: string
}

export interface ProfileData {
    country: string;
    display_name: string;
    email: string;
    followers: Follower;
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

export interface Follower {
    href: null;
    total: number;
}

export interface Properties {
    type?: string;
}

export interface SectionWrapperProp {
    title?: string;
    children?: React.ReactNode;
    seeAllLink?: string;
    breadcrumb?: boolean;
}

export interface UserTopDataImage {
    url: string;
}

export interface UserTopDataDetails {
    images: UserTopDataImage[];
    name: string;
    type: string;
    id: string;
    flag?: boolean;
}

export interface UserTopData {
    items: UserTopDataDetails[];
    limit: number;
    offset: number;
    total: number;
    next: string | null;
}

export interface PlaylistTracks {
    limit: number;
    next: string | null;
    total: number;
}

export interface PlaylistDataImage {
    url: string;
}

export interface PlaylistData {
    name: string;
    followers: Follower;
    tracks: PlaylistTracks;
    images: PlaylistDataImage[]
}

// ------------------------------------------------------ Remove Redundancy -------------------------------------------------------