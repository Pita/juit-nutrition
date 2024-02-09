export interface Root {
  sys: SysElement;
  total: number;
  skip: number;
  limit: number;
  items: Item[];
  includes: Includes;
}

export interface Includes {
  Entry: Entry[];
  Asset: Asset[];
}

export interface Asset {
  metadata: Metadata;
  sys: AssetSys;
  fields: AssetFields;
}

export interface AssetFields {
  title: string;
  description: string;
  file: File;
}

export interface File {
  url: string;
  details: Details;
  fileName: string;
  contentType: ContentType;
}

export enum ContentType {
  ImageJPEG = "image/jpeg",
}

export interface Details {
  size: number;
  image: Image;
}

export interface Image {
  width: number;
  height: number;
}

export interface Metadata {
  tags: HeroNew[];
}

export interface HeroNew {
  sys: HeroNewSys;
}

export interface HeroNewSys {
  id: string;
  type: PurpleType;
  linkType: LinkTypeEnum;
}

export enum LinkTypeEnum {
  Asset = "Asset",
  ContentType = "ContentType",
  Entry = "Entry",
  Environment = "Environment",
  Space = "Space",
  Tag = "Tag",
}

export enum PurpleType {
  Link = "Link",
}

export interface AssetSys {
  space: HeroNew;
  id: string;
  type: LinkTypeEnum;
  createdAt: Date;
  updatedAt: Date;
  environment: HeroNew;
  revision: number;
  locale: Locale;
  contentType?: HeroNew;
}

export enum Locale {
  De = "de",
}

export interface Entry {
  metadata: Metadata;
  sys: AssetSys;
  fields: EntryFields;
}

export interface EntryFields {
  title: string;
  secondTitle?: string;
  ean?: string;
  sellable?: boolean;
  slug?: string;
  image?: HeroNew;
  description?: DescriptionClass | string;
  ingredients?: Ingredients;
  preparation?: Ingredients;
  moreInfo?: string;
  storage?: string;
  energy?: number;
  weight?: number;
  fat?: number;
  saturatedFat?: number;
  carbohydrate?: number;
  sugar?: number;
  fiber?: number;
  protein?: number;
  salt?: number;
  microwave_time_in_minutes?: number;
  microwave_watts?: number;
  list?: HeroNew[];
  forOrder?: string;
  vitaminB12?: number;
  specialDishDescription?: string;
  specialDish?: number;
  size?: number;
  cta?: HeroNew;
  ctaText?: string;
  category?: string;
  metaDescription?: string;
  modules?: HeroNew[];
  showFilters?: boolean;
  listedOnly?: boolean;
  links?: HeroNew[];
  layout?: string;
  dishList?: HeroNew;
}

export interface DescriptionClass {
  data: DescriptionData;
  content: DescriptionContent[];
  nodeType: DescriptionNodeType;
}

export interface DescriptionContent {
  data: DescriptionData;
  content: PurpleContent[];
  nodeType: PurpleNodeType;
}

export interface PurpleContent {
  data: PurpleData;
  marks?: SysElement[];
  value?: string;
  nodeType: TentacledNodeType;
  content?: FluffyContent[];
}

export interface IngredientsContent {
  data: DescriptionData;
  content: FluffyContent[];
  nodeType: PurpleNodeType;
}

export interface FluffyContent {
  data: DescriptionData;
  marks?: any[];
  value?: string;
  nodeType: FluffyNodeType;
  content?: IngredientsContent[];
}

export interface DescriptionData {}

export enum PurpleNodeType {
  Heading3 = "heading-3",
  OrderedList = "ordered-list",
  Paragraph = "paragraph",
  UnorderedList = "unordered-list",
}

export enum FluffyNodeType {
  ListItem = "list-item",
  Text = "text",
}

export interface PurpleData {
  uri?: string;
}

export interface SysElement {
  type: MarkType;
}

export enum MarkType {
  Array = "Array",
  Bold = "bold",
}

export enum TentacledNodeType {
  Hyperlink = "hyperlink",
  Text = "text",
}

export enum DescriptionNodeType {
  Document = "document",
}

export interface Ingredients {
  data: DescriptionData;
  content: IngredientsContent[];
  nodeType: DescriptionNodeType;
}

export interface Item {
  metadata: Metadata;
  sys: AssetSys;
  fields: ItemFields;
}

export interface ItemFields {
  title: string;
  slug: string;
  metaDescription: string;
  heroNew: HeroNew;
  modules: HeroNew[];
}
