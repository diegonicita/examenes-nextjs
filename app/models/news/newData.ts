export interface NewsItem {
  message: string | undefined
  id: number | string
  title: string
  description: string
  url_news: string
  url_image: string
  created_at: Date
}
