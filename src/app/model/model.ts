import { typeSourceSpan } from "@angular/compiler";

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

export class Filter {
    private type = FilterType.ISBN;
    private text = '';
    private index = 0;

    constructor(type?: FilterType, text?: string, index?: number) {
        if (type != undefined) {
            this.setType(type);
        }
        if (text != undefined) {
            this.setText(text);
        }
        if (index != undefined) {
            this.setIndex(index);
        }
    }

    getType(): FilterType {
        return this.type;
    }

    setType(type: FilterType) {
        this.type = type;
    }

    getText(): string {
        return this.text;
    }

    setText(text: string) {
        this.text = text;
    }

    getIndex(): number {
        return this.index;
    }

    setIndex(index: number) {
        this.index = index;
    }
}