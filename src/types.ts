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

export interface DetailCharacterProps {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: ResponseData;
  etag: string;
}
