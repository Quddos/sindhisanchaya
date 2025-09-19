# SindhiSanchaya - PWA Sindhi Books Catalog

A performant Progressive Web App for searching and discovering Sindhi literature. Built with Next.js, TypeScript, Tailwind CSS, and deployed on Vercel with Neon PostgreSQL database.

## Features

- 🔍 **Advanced Search**: Full-text search across English, Devanagari, and Perso-Arabic scripts
- 📱 **PWA Support**: Installable app with offline capabilities
- 🎨 **Dynamic Covers**: Auto-generated SVG covers for online books
- 📚 **40k+ Books**: Comprehensive catalog of Sindhi literature
- 🌐 **Multi-script Support**: Search in multiple writing systems
- 🔧 **Admin Interface**: Complete admin dashboard with authentication
- 👥 **User Management**: Add, edit, delete users with role-based access
- 📊 **Analytics**: Real-time statistics and import tracking
- ⚡ **Performance**: Optimized for speed with caching and lazy loading

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: Neon PostgreSQL
- **PWA**: next-pwa with service worker
- **Deployment**: Vercel
- **Image Storage**: Cloudinary (optional)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sindhisanchaya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your database URL:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/sindhisanchaya"
   NEON_DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/sindhisanchaya?sslmode=require"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Import the CSV data**
   - Start the development server: `npm run dev`
   - Navigate to `/admin`
   - Upload the `Consolidated_sindhisanchaya_books.csv` file

6. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
sindhisanchaya/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   │   ├── search/        # Search endpoint
│   │   ├── stats/         # Statistics endpoint
│   │   └── admin/         # Admin endpoints
│   ├── admin/             # Admin interface
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── src/
│   ├── components/        # React components
│   │   ├── BookCard.tsx   # Book display component
│   │   └── SearchBar.tsx  # Search interface
│   ├── lib/               # Utility libraries
│   │   ├── db.ts          # Database connection
│   │   ├── etl.ts         # Data import pipeline
│   │   └── transliteration.ts # Script conversion
│   └── types/             # TypeScript definitions
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
│   ├── manifest.json      # PWA manifest
│   └── placeholder-book.jpg
└── Consolidated_sindhisanchaya_books.csv # Source data
```

## Database Schema

The application uses the following main entities:

- **Books**: Core book information with multi-script titles and authors
- **Authors**: Author information across different scripts
- **Collections**: Library and collection locations
- **ImportLogs**: Track data import operations

## API Endpoints

- `GET /api/search` - Search books with filters
- `GET /api/stats` - Get collection statistics
- `POST /api/admin/import` - Import CSV data

## Search Features

- **Multi-script Search**: Search across English, Devanagari, and Perso-Arabic
- **Advanced Filters**: Filter by availability, collection, author
- **Full-text Search**: Search across titles, authors, and descriptions
- **Transliteration**: Basic script conversion support

## PWA Features

- **Offline Support**: Cached content available offline
- **Installable**: Can be installed on mobile devices
- **Service Worker**: Background caching and updates
- **Responsive Design**: Optimized for all screen sizes

## Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set environment variables** in Vercel dashboard:
   - `DATABASE_URL`
   - `NEON_DATABASE_URL`

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Database Setup

1. **Create Neon database** at [neon.tech](https://neon.tech)
2. **Run migrations**:
   ```bash
   npx prisma db push
   ```
3. **Import data** via admin interface

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Sindhi literature community for preserving these valuable texts
- Contributors to the original book catalog
- Open source libraries and tools used in this project

## Support

For support and questions, please open an issue on GitHub or contact the development team.