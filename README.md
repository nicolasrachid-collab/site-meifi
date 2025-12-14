# Site MEIFI - Integração WordPress

Projeto migrado do Google AI Studio para Next.js com integração completa ao WordPress como CMS.

## 🚀 Configuração Inicial

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL da API REST do WordPress
# Exemplo: https://seusite.com/wp-json
NEXT_PUBLIC_WORDPRESS_API_URL=https://seusite.com/wp-json
```

**Importante:** Substitua `https://seusite.com/wp-json` pela URL real do seu WordPress.

### 3. Executar o Projeto

```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

## 📋 Estrutura do WordPress

Para que a integração funcione completamente, você precisa configurar o WordPress com:

### Custom Post Types

1. **Projetos** (`projetos`)
   - Campos ACF recomendados:
     - `project_date` (date)
     - `project_gallery` (gallery)
     - `project_location` (text)
     - `project_area` (text)
     - `project_type` (text)
     - `project_video` (url)
     - `project_testimonial` (textarea)
     - `project_related_projects` (relationship)

2. **Depoimentos** (`depoimentos`) - Opcional
   - Campos ACF:
     - `author_name` (text)
     - `author_role` (text)
     - `author_company` (text)
     - `author_photo` (image)
     - `video_url` (url)
     - `rating` (number)

3. **Parceiros** (`parceiros`) - Opcional
   - Campos ACF:
     - `logo` (image)
     - `website` (url)
     - `description` (textarea)

### Páginas WordPress

Crie uma página com slug `home` ou `inicio` com os seguintes campos ACF:

- `hero_title` (text)
- `hero_subtitle` (text)
- `hero_background_image` (image)
- `hero_video_thumbnail` (image)
- `hero_video_url` (url)
- `stats` (repeater):
  - `number` (text)
  - `label` (text)
- `expertise_items` (repeater):
  - `title` (text)
  - `description` (textarea)
  - `icon` (text)
- `faq_items` (repeater):
  - `question` (text)
  - `answer` (textarea)
- `team_members` (repeater):
  - `name` (text)
  - `role` (text)
  - `photo` (image)
  - `bio` (textarea)

### Plugin ACF (Advanced Custom Fields)

Instale o plugin **Advanced Custom Fields** no WordPress para usar os campos personalizados.

### Habilitar REST API

Certifique-se de que a REST API do WordPress está habilitada (geralmente já vem ativada por padrão).

## 🛠️ Estrutura do Projeto

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout raiz
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── HeroSection.tsx
│   ├── ProjectsSection.tsx
│   └── ...
├── services/              # Serviços
│   └── wordpress.ts      # Cliente WordPress REST API
├── types/                 # Tipos TypeScript
│   └── wordpress.ts      # Tipos do WordPress
└── package.json
```

## 📝 Componentes Adaptados

Os seguintes componentes foram adaptados para buscar dados do WordPress:

- ✅ `HeroSection` - Busca dados da página home
- ✅ `ProjectsSection` - Lista projetos do WordPress
- ⏳ Outros componentes podem ser adaptados conforme necessário

## 🔧 Personalização

### Alterar Endpoints do WordPress

Se seus custom post types tiverem nomes diferentes, edite o arquivo `services/wordpress.ts`:

```typescript
// Exemplo: se seus projetos estiverem em '/wp/v2/projects'
return await this.fetchFromWordPress<WordPressProject[]>(
  '/wp/v2/projects', // Altere aqui
  options
);
```

### Adicionar Novos Componentes

1. Crie o componente em `components/`
2. Se precisar de dados do WordPress, use `wordpressService` em um Server Component
3. Passe os dados como props para Client Components quando necessário

## 🚢 Build para Produção

```bash
npm run build
npm start
```

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [ACF Plugin](https://www.advancedcustomfields.com/)

## ⚠️ Notas Importantes

1. **Fallbacks**: Os componentes têm valores padrão caso o WordPress não esteja configurado
2. **Cache**: As requisições ao WordPress são cacheadas por 60 segundos
3. **Imagens**: Use o componente `Image` do Next.js para otimização automática
4. **Type Safety**: Todos os tipos do WordPress estão definidos em `types/wordpress.ts`

## 🐛 Troubleshooting

### Erro: "WordPress API URL não configurada"
- Verifique se o arquivo `.env.local` existe e contém `NEXT_PUBLIC_WORDPRESS_API_URL`

### Erro: "404 Not Found" ao buscar dados
- Verifique se a URL do WordPress está correta
- Confirme que a REST API está habilitada
- Verifique se os custom post types estão registrados corretamente

### Imagens não aparecem
- Verifique se as imagens estão sendo retornadas no campo `_embedded['wp:featuredmedia']`
- Confirme que o WordPress permite acesso público às mídias
