# Public Assets Folder

This folder contains static assets that are served directly by the application.

## Structure

```
public/
├── images/          # Image files (logos, icons, etc.)
├── fonts/           # Custom font files (if needed)
├── docs/            # Document files (PDFs, etc.)
└── README.md        # This file
```

## Usage

Files in this folder are accessible at:
- **Local**: `http://localhost:3000/filename.ext`
- **Production**: `https://your-app.vercel.app/filename.ext`

## Examples

- Place an image at `public/images/logo.png`
- Access it at `/images/logo.png` in your HTML/CSS

## Notes

- Files are served with proper CORS headers for embedding
- No build process required - files are served as-is
- Keep file sizes reasonable for fast loading
