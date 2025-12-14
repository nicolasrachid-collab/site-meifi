// Tipos TypeScript para dados do WordPress REST API

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    sizes?: {
      [key: string]: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  };
}

export interface WordPressProject {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  acf?: {
    // Campos personalizados do ACF (Advanced Custom Fields)
    project_date?: string;
    project_gallery?: number[];
    project_location?: string;
    project_area?: string;
    project_type?: string;
    project_video?: string;
    project_testimonial?: string;
    project_related_projects?: number[];
  };
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[];
    'wp:term'?: Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>;
  };
}

export interface WordPressPage {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  acf?: {
    hero_title?: string;
    hero_subtitle?: string;
    hero_background_image?: number;
    hero_video_thumbnail?: number;
    hero_video_url?: string;
    stats?: Array<{
      number: string;
      label: string;
    }>;
    expertise_items?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
    faq_items?: Array<{
      question: string;
      answer: string;
    }>;
    team_members?: Array<{
      name: string;
      role: string;
      photo?: number;
      bio?: string;
    }>;
  };
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[];
  };
}

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[];
  };
}

export interface WordPressTestimonial {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: {
    author_name?: string;
    author_role?: string;
    author_company?: string;
    author_photo?: number;
    video_url?: string;
    rating?: number;
  };
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[];
  };
}

export interface WordPressPartner {
  id: number;
  title: {
    rendered: string;
  };
  acf?: {
    logo?: number;
    website?: string;
    description?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[];
  };
}



