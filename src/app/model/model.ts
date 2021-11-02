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
    pageCount: string;
    categories: string [];
    imageLinks: ImageLinks;
    industryIdentifiers: IndustryIdentifier [];
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

export interface IndustryIdentifier {
    type: string;
    identifier: string;
}

export enum FilterType {
    ISBN = 'ISBN',
    AUTHOR = 'Author',
    TITLE = 'Title'
}