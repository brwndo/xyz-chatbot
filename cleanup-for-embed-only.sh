#!/bin/bash

echo "🧹 Cleaning up codebase for embed-only version..."

# Remove standalone app files
echo "Removing standalone app files..."
rm -f frontend/App.jsx
rm -f frontend/App.css
rm -f frontend/ChatMessage.jsx
rm -f frontend/ChatMessage.css
rm -f frontend/index.html
rm -f frontend/main.jsx

# Remove server and build files
echo "Removing server and build files..."
rm -f server.js
rm -f vite.config.js
rm -rf dist/
rm -rf public/

# Remove documentation (optional - uncomment if you want to remove)
# rm -f EMBED.md
# rm -f README.md
# rm -f IMPROVED-EMBED.html

# Remove node_modules to clean install
echo "Cleaning node_modules..."
rm -rf node_modules/
rm -f package-lock.json

echo "✅ Cleanup complete!"
echo ""
echo "📦 Your simplified project now contains:"
echo "  - api/ (OpenAI integration + embed endpoints)"
echo "  - frontend/ (minimal embed files only)"
echo "  - package.json (dependencies)"
echo "  - vercel.json (deployment config)"
echo "  - .env (API key)"
echo ""
echo "🚀 Next steps:"
echo "  1. npm install"
echo "  2. git add ."
echo "  3. git commit -m 'Simplify to embed-only version'"
echo "  4. git push"
