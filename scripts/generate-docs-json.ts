import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface DocNode {
  depth: number;
  title: string;
  node_token: string;
  parent_node_token: string;
  obj_create_time: string;
  obj_edit_time: string;
  obj_token: string;
  children: DocNode[];
  has_child: boolean;
  slug: string;
  position: number;
  filename: string;
  filepath: string;
  tag?: string[];
}

function getFileStats(filePath: string) {
  const stats = fs.statSync(filePath);
  return {
    create_time: Math.floor(stats.birthtimeMs / 1000).toString(),
    edit_time: Math.floor(stats.mtimeMs / 1000).toString(),
  };
}

function generateNodeToken(slug: string): string {
  return slug.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
}

function generateObjToken(slug: string): string {
  return `${generateNodeToken(slug)}_token`;
}

function processDirectory(basePath: string, currentPath: string, parentToken: string = '', depth: number = 0): DocNode[] {
  const dirPath = path.join(basePath, currentPath);
  const items = fs.readdirSync(dirPath);
  const nodes: DocNode[] = [];
  let position = 0;

  // 首先处理目录级别的 mdx 文件
  items
    .filter(item => item.endsWith('.mdx'))
    .sort((a, b) => {
      // 尝试从文件名中提取数字进行排序
      const numA = parseInt(a.split('.')[0]) || Infinity;
      const numB = parseInt(b.split('.')[0]) || Infinity;
      return numA - numB;
    })
    .forEach(item => {
      const fullPath = path.join(dirPath, item);
      const slug = path.basename(item, '.mdx');
      const stats = getFileStats(fullPath);
      const relativePath = path.join(currentPath, item);
      
      try {
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data: frontMatter } = matter(fileContent);

        const node: DocNode = {
          depth,
          title: frontMatter.title || slug,
          node_token: generateNodeToken(slug),
          parent_node_token: parentToken,
          obj_create_time: stats.create_time,
          obj_edit_time: stats.edit_time,
          obj_token: generateObjToken(slug),
          children: [],
          has_child: false,
          slug,
          position: position++,
          filename: item,
          filepath: relativePath.replace(/\\/g, '/'),
          tag: frontMatter.tag || []
        };
        nodes.push(node);
      } catch (error) {
        console.error(`Error processing file ${fullPath}:`, error);
      }
    });

  // 然后处理子目录
  items
    .filter(item => {
      const itemPath = path.join(dirPath, item);
      return fs.statSync(itemPath).isDirectory();
    })
    .forEach(dir => {
      // 首先检查目录中是否有同名的 mdx 文件
      const dirMdxPath = path.join(dirPath, `${dir}.mdx`);
      let parentNode: DocNode | undefined;

      if (fs.existsSync(dirMdxPath)) {
        parentNode = nodes.find(node => node.slug === dir);
      }

      if (!parentNode) {
        // 如果没有找到对应的父节点 mdx 文件，创建一个虚拟的父节点
        const stats = getFileStats(path.join(dirPath, dir));
        const relativePath = path.join(currentPath, `${dir}.mdx`);
        
        parentNode = {
          depth,
          title: dir,
          node_token: generateNodeToken(dir),
          parent_node_token: parentToken,
          obj_create_time: stats.create_time,
          obj_edit_time: stats.edit_time,
          obj_token: generateObjToken(dir),
          children: [],
          has_child: false,
          slug: dir,
          position: position++,
          filename: `${dir}.mdx`,
          filepath: relativePath.replace(/\\/g, '/')
        };
        nodes.push(parentNode);
      }

      // 处理子目录中的文件
      const children = processDirectory(
        basePath,
        path.join(currentPath, dir),
        parentNode.node_token,
        depth + 1
      );

      if (children.length > 0) {
        parentNode.children = children;
        parentNode.has_child = true;
      }
    });

  return nodes;
}

function generateDocsJson() {
  const locales = ['en', 'zh'];
  
  locales.forEach(locale => {
    const docsDir = path.join(process.cwd(), 'docs', locale);
    if (!fs.existsSync(docsDir)) {
      console.log(`Skipping ${locale} - directory does not exist`);
      return;
    }

    try {
      const docs = processDirectory(docsDir, '');
      const outputPath = path.join(docsDir, 'docs.json');
      
      fs.writeFileSync(
        outputPath,
        JSON.stringify(docs, null, 2),
        'utf-8'
      );
      
      console.log(`Generated docs.json for ${locale}`);
    } catch (error) {
      console.error(`Error generating docs.json for ${locale}:`, error);
    }
  });
}

// 执行生成
generateDocsJson(); 