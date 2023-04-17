export interface AdTitle{
    name: string;
}

export interface Thumbnail{
    hash: string;
    url: string;
}

export default interface Combination{
    videoId: string;
    thumbnail?: Thumbnail;
    titles: AdTitle[];
}
