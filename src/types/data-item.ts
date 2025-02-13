export interface DataItem {
  id: string;
  title: string;
  lead?: string;
  published_at: string;
  content: string;
  news_agency_name: string;
  url: string;
  categories?: string[];
  tags?: string[];
}
