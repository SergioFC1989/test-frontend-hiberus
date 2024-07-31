export interface Resource {
  resourceURI: string;
  name: string;
}

export interface ResourceWithOptionalType extends Resource {
  type?: string;
}

export interface IndexedCollection<T extends Resource> {
  available: number;
  collectionURI: string;
  items: T[];
  returned: number;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Url {
  type: string;
  url: string;
}

export interface TextObject {
  type: string;
  language: string;
  text: string;
}

export interface DateObject {
  type: string;
  date: string; // Use string to represent Date
}

export interface Price {
  type: string;
  price: number;
}

export interface Item {
  resourceURI: string;
  name: string;
  role?: string;
  type?: string;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: IndexedCollection<Resource>;
  series: IndexedCollection<Resource>;
  stories: IndexedCollection<ResourceWithOptionalType>;
  events: IndexedCollection<Resource>;
  urls: Url[];
}

export interface ResponseData<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}

export interface CharactersProps {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: ResponseData<Character>;
}

export interface DetailCharacterProps extends CharactersProps {}

export interface Comic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: Url[];
  series: Resource;
  variants: Resource[];
  collections: Resource[];
  collectedIssues: Resource[];
  dates: DateObject[];
  prices: Price[];
  thumbnail: Thumbnail;
  images: Thumbnail[];
  creators: IndexedCollection<Item>;
  characters: IndexedCollection<Item>;
  stories: IndexedCollection<Item>;
  events: IndexedCollection<Resource>;
}

export interface ComicProps {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: ResponseData<Comic>;
}

export interface ComicPage {
  thumbnail: string;
  name: string;
}
