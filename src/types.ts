export interface Category {
  resourceURI: string;
  name: string;
  type?: string;
}

export interface IndexedItem {
  available: number;
  collectionURI: string;
  items: Category[];
  returned: number;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Comic {
  resourceURI: string;
  name: string;
}

export interface Story {
  resourceURI: string;
  name: string;
  type: string;
}

export interface Event {
  resourceURI: string;
  name: string;
}

export interface Url {
  type: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: IndexedItem;
  series: IndexedItem;
  stories: {
    available: number;
    collectionURI: string;
    items: Story[];
    returned: number;
  };
  events: IndexedItem;
  urls: Url[];
}

export interface ResponseData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Character[];
}

export interface CharactersProps {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: ResponseData;
}
