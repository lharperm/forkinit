export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageQuery: string;
  imageUrl?: string;
  coordinates: [number, number];
  location: string;
  content: {
    intro: string;
    sections: Array<{
      heading: string;
      text: string;
    }>;
  };
}
