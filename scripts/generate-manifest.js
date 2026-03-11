const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(__dirname, '../public/posts');
const outputFile = path.join(__dirname, '../public/posts.json');

function generateManifest() {
  if (!fs.existsSync(postsDirectory)) {
    console.log('Brak folderu public/posts, pomijam generowanie.');
    process.exit(0);
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = [];

  fileNames.forEach((fileName) => {
    // Support both .html and .md files
    if (fileName.endsWith('.html') || fileName.endsWith('.md')) {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data } = matter(fileContents);

      posts.push({
        slug: fileName.replace(/\.(html|md)$/, ''),
        title: data.title || 'Brak tytułu',
        date: data.date || '',
        description: data.description || '',
        format: fileName.endsWith('.html') ? 'html' : 'md',
      });
    }
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  console.log(`Pomyślnie wygenerowano manifest dla ${posts.length} postów.`);
}

// Generate manifest immediately
generateManifest();

// Watch for changes in development
if (process.env.WATCH_MODE) {
  console.log('🔍 Oglądanie zmian w folderze postów...');
  fs.watch(postsDirectory, (eventType, filename) => {
    if ((filename.endsWith('.html') || filename.endsWith('.md')) && eventType === 'change') {
      console.log(`📝 Zmiana wykryta: ${filename}, regeneruję manifest...`);
      generateManifest();
    }
  });
}
