export interface SearchResult {
    totalItems: number;
    items: Item [];
}

export interface Item {
 volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
    title: string;
    authors: string [];
    publishedDate: string;
    description: string;
    pageCount: number;
    categories: string [];
    imageLinks: ImageLinks;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}