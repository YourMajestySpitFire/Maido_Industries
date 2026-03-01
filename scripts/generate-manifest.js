const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(__dirname, '../public/posts');
const outputFile = path.join(__dirname, '../public/posts.json');

if (!fs.existsSync(postsDirectory)) {
  console.log('Brak folderu public/posts, pomijam generowanie.');
  process.exit(0);
}

const fileNames = fs.readdirSync(postsDirectory);
const posts = [];

fileNames.forEach((fileName) => {
  if (fileName.endsWith('.md')) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = matter(fileContents);

    posts.push({
      slug: fileName.replace(/\.md$/, ''),
      title: data.title || 'Brak tytułu',
      date: data.date || '',
      description: data.description || '',
    });
  }
});

posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`Pomyślnie wygenerowano manifest dla ${posts.length} postów.`);
