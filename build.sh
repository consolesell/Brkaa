#!/bin/bash

# Create dist directory
mkdir -p dist

# Copy all HTML, CSS, JS files to dist
cp *.html dist/
cp *.css dist/
cp *.js dist/
cp *.json dist/

# Copy public directory if it exists
if [ -d "public" ]; then
  cp -r public dist/
fi

echo "Build completed successfully!"
