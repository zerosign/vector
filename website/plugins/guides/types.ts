export interface GuideContent {
  guides: Guide[];
  guideListPaginated: GuidePaginated[];
  guideTags: GuideTags;
  guideTagsListPath: string | null;
}

export type FeedType = 'rss' | 'atom' | 'all';

export interface PluginOptions {
  path: string;
  routeBasePath: string;
  include: string[];
  guideListComponent: string;
  guideComponent: string;
  guideTagsListComponent: string;
  guideTagsGuidesComponent: string;
  remarkPlugins: string[];
  rehypePlugins: string[];
  truncateMarker: RegExp;
  feedOptions?: {
    type: FeedType;
    title?: string;
    description?: string;
    copyright: string;
    language?: string;
  };
}

export interface GuideTags {
  [key: string]: GuideTag;
}

export interface GuideTag {
  name: string;
  items: string[];
  permalink: string;
}

export interface Guide {
  id: string;
  metadata: MetaData;
}

export interface GuidePaginatedMetadata {
  permalink: string;
  page: number;
  guidesPerPage: number;
  totalPages: number;
  totalCount: number;
  previousPage: string | null;
  nextPage: string | null;
}

export interface GuidePaginated {
  metadata: GuidePaginatedMetadata;
  items: string[];
}

export interface MetaData {
  category: string;
  categorySort: string;
  description: string;
  domain: string;
  nextItem?: Paginator;
  permalink: string;
  prevItem?: Paginator;
  readingTime: string;
  seriesPosition: number;
  sort: number;
  source: string;
  tags: (Tag | string)[];
  title: string;
  truncated: boolean;
}

export interface Paginator {
  title: string;
  permalink: string;
}

export interface Tag {
  label: string;
  permalink: string;
}

export interface GuideItemsToMetadata {
  [key: string]: MetaData;
}

export interface TagsModule {
  [key: string]: TagModule;
}

export interface TagModule {
  allTagsPath: string;
  slug: string;
  name: string;
  count: number;
  permalink: string;
}