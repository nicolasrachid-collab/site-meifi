import type {
  WordPressProject,
  WordPressPage,
  WordPressPost,
  WordPressMedia,
  WordPressTestimonial,
  WordPressPartner,
} from '@/types/wordpress';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';

if (!WORDPRESS_API_URL) {
  console.warn(
    '⚠️ NEXT_PUBLIC_WORDPRESS_API_URL não está configurada. Configure no arquivo .env.local'
  );
}

interface WordPressApiOptions {
  perPage?: number;
  page?: number;
  embed?: boolean;
  acf?: boolean;
  search?: string;
  slug?: string;
}

class WordPressService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = WORDPRESS_API_URL.endsWith('/')
      ? WORDPRESS_API_URL.slice(0, -1)
      : WORDPRESS_API_URL;
  }

  private async fetchFromWordPress<T>(
    endpoint: string,
    options: WordPressApiOptions = {}
  ): Promise<T | null> {
    if (!this.baseUrl) {
      return null;
    }

    const { perPage = 100, page = 1, embed = true, acf = true, search, slug } = options;

    const params = new URLSearchParams({
      per_page: perPage.toString(),
      page: page.toString(),
      _embed: embed.toString(),
      _acf: acf.toString(),
    });

    if (search) {
      params.append('search', search);
    }

    if (slug) {
      params.append('slug', slug);
    }

    const url = `${this.baseUrl}${endpoint}?${params.toString()}`;

    try {
      const response = await fetch(url, {
        next: { revalidate: 60 }, // Cache por 60 segundos
      });

      if (!response.ok) {
        throw new Error(
          `Erro ao buscar dados do WordPress: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição WordPress:', error);
      throw error;
    }
  }

  // Buscar página por slug
  async getPageBySlug(slug: string): Promise<WordPressPage | null> {
    try {
      const pages = await this.fetchFromWordPress<WordPressPage[]>(
        '/wp/v2/pages',
        { slug }
      );
      if (!pages || !Array.isArray(pages) || pages.length === 0) return null;
      return pages[0] || null;
    } catch (error) {
      console.error(`Erro ao buscar página "${slug}":`, error);
      return null;
    }
  }

  // Buscar todos os projetos (custom post type)
  async getProjects(options: WordPressApiOptions = {}): Promise<WordPressProject[]> {
    try {
      // Ajuste o endpoint conforme seu custom post type no WordPress
      // Exemplo: '/wp/v2/projetos' ou '/wp/v2/projects'
      const projects = await this.fetchFromWordPress<WordPressProject[]>(
        '/wp/v2/projetos',
        options
      );
      return projects || [];
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      return [];
    }
  }

  // Buscar projeto por slug
  async getProjectBySlug(slug: string): Promise<WordPressProject | null> {
    try {
      const projects = await this.fetchFromWordPress<WordPressProject[]>(
        '/wp/v2/projetos',
        { slug }
      );
      return projects[0] || null;
    } catch (error) {
      console.error(`Erro ao buscar projeto "${slug}":`, error);
      return null;
    }
  }

  // Buscar projeto por ID
  async getProjectById(id: number): Promise<WordPressProject | null> {
    try {
      return await this.fetchFromWordPress<WordPressProject>(`/wp/v2/projetos/${id}`);
    } catch (error) {
      console.error(`Erro ao buscar projeto ID ${id}:`, error);
      return null;
    }
  }

  // Buscar mídia por ID
  async getMediaById(id: number): Promise<WordPressMedia | null> {
    try {
      return await this.fetchFromWordPress<WordPressMedia>(`/wp/v2/media/${id}`);
    } catch (error) {
      console.error(`Erro ao buscar mídia ID ${id}:`, error);
      return null;
    }
  }

  // Buscar posts/insights
  async getPosts(options: WordPressApiOptions = {}): Promise<WordPressPost[]> {
    try {
      return await this.fetchFromWordPress<WordPressPost[]>('/wp/v2/posts', options);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      return [];
    }
  }

  // Buscar depoimentos
  async getTestimonials(
    options: WordPressApiOptions = {}
  ): Promise<WordPressTestimonial[]> {
    try {
      // Ajuste conforme seu custom post type
      return await this.fetchFromWordPress<WordPressTestimonial[]>(
        '/wp/v2/depoimentos',
        options
      );
    } catch (error) {
      console.error('Erro ao buscar depoimentos:', error);
      return [];
    }
  }

  // Buscar parceiros
  async getPartners(options: WordPressApiOptions = {}): Promise<WordPressPartner[]> {
    try {
      // Ajuste conforme seu custom post type
      return await this.fetchFromWordPress<WordPressPartner[]>(
        '/wp/v2/parceiros',
        options
      );
    } catch (error) {
      console.error('Erro ao buscar parceiros:', error);
      return [];
    }
  }

  // Buscar FAQ (pode ser uma página ou custom post type)
  async getFAQ(): Promise<WordPressPage | null> {
    return this.getPageBySlug('faq');
  }

  // Buscar dados da home (página com slug 'home' ou 'inicio')
  async getHomeData(): Promise<WordPressPage | null> {
    return this.getPageBySlug('home') || this.getPageBySlug('inicio');
  }
}

export const wordpressService = new WordPressService();

