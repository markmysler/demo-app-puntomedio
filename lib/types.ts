export interface Source {
  news_outlet_name: string
  news_outlet_icon: string
}

export interface Narrative {
  narrative_title: string
  narrative_summary: string
  sources: Source[]
}

export interface NewsEvent {
  id: string
  title: string
  summary: string
  img_url: string
  sources: Source[]
  narratives: Narrative[]
}
