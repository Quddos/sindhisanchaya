# SindhiSanchaya Setup Guide

## Quick Start

### 1. Environment Setup
Create a `.env.local` file with your credentials:

```env
# Database (Required)
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# AI Features (Optional - for enhanced search and summaries)
GEMINI_API_KEY="your-gemini-api-key"

# Next.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 3. Import Data (Optional)
```bash
# Import the CSV data with AI features
npm run import-data
```

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Features

### ✅ Implemented
- **Database Integration**: Neon PostgreSQL with Prisma ORM
- **Search Interface**: Multi-script search (English, Devanagari, Perso-Arabic)
- **Book Display**: Dynamic SVG covers for online books
- **Admin Interface**: CSV import with progress tracking
- **AI Integration**: Gemini AI for search enhancement and summaries
- **PWA Support**: Installable app with offline capabilities
- **Responsive Design**: Mobile-first design with Tailwind CSS

### 🔧 API Endpoints
- `GET /api/search` - Search books with filters
- `GET /api/stats` - Get collection statistics
- `GET /api/test` - Test database connection
- `POST /api/admin/import` - Import CSV data

### 📱 PWA Features
- Offline support with service worker
- Installable on mobile devices
- Cached content for better performance
- Responsive design for all screen sizes

## Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `GEMINI_API_KEY` (optional)
3. Deploy automatically on push

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## Data Import

The application includes a comprehensive ETL pipeline:

1. **CSV Processing**: Parses the consolidated books CSV
2. **Data Validation**: Validates and cleans book records
3. **Transliteration**: Creates search vectors for multi-script support
4. **AI Enhancement**: Generates summaries and embeddings (if Gemini API key provided)
5. **Database Storage**: Stores in PostgreSQL with proper indexing

## Search Features

- **Multi-script Search**: Search across English, Devanagari, and Perso-Arabic
- **AI Enhancement**: Query enhancement using Gemini AI
- **Advanced Filters**: Filter by availability, collection, author
- **Full-text Search**: Search across titles, authors, and descriptions
- **Pagination**: Efficient pagination for large result sets

## Admin Features

- **CSV Import**: Upload and process book data
- **Progress Tracking**: Real-time import progress
- **Error Handling**: Detailed error reporting
- **Statistics**: Collection statistics and metrics

## Troubleshooting

### Database Connection Issues
1. Verify your `DATABASE_URL` is correct
2. Check if your Neon database is active
3. Test connection with `/api/test` endpoint

### AI Features Not Working
1. Verify your `GEMINI_API_KEY` is valid
2. Check API quota and limits
3. AI features are optional - app works without them

### Build Issues
1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check TypeScript errors: `npm run lint`

## Support

For issues and questions:
1. Check the console for error messages
2. Verify environment variables
3. Test database connection
4. Check API endpoints manually

The application is now ready for production use with your Neon database and Gemini AI integration!
