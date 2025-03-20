import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import frontmatter from '@bytemd/plugin-frontmatter'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import { prettyLinkPlugin } from './plugins/pretty-link'
import { headingPlugin } from './plugins/heading'
import { codeBlockPlugin } from './plugins/code-block'

// 导入语法高亮的主题样式
import 'highlight.js/styles/github.css'
import 'highlight.js/styles/github-dark.css'

// 配置插件
export const plugins = [
  gfm(),
  highlight(),
  frontmatter(),
  mediumZoom(),
  prettyLinkPlugin(),
  headingPlugin(),
  codeBlockPlugin()
]

// HTML 标签和属性的白名单配置
export const sanitize = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'div', 'span',
    'a', 'img',
    'ul', 'ol', 'li',
    'blockquote', 'hr',
    'br', 'strong', 'em',
    'pre', 'code',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'svg', 'path', 'rect' // 允许 SVG 相关标签，用于图标
  ],
  allowedAttributes: {
    '*': ['class', 'id', 'style'],
    'a': ['href', 'target', 'rel'],
    'img': ['src', 'alt', 'title'],
    'svg': ['xmlns', 'width', 'height', 'viewBox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'],
    'path': ['d', 'fill', 'stroke'],
    'rect': ['width', 'height', 'x', 'y', 'rx', 'ry']
  },
  allowedStyles: {
    '*': {
      'color': [/.*/],
      'background-color': [/.*/],
      'font-size': [/.*/],
      'font-weight': [/.*/],
      'text-align': [/.*/],
      'margin': [/.*/],
      'margin-top': [/.*/],
      'margin-bottom': [/.*/],
      'margin-left': [/.*/],
      'margin-right': [/.*/],
      'padding': [/.*/],
      'display': [/.*/],
      'visibility': [/.*/],
      'opacity': [/.*/],
      'border': [/.*/],
      'border-bottom': [/.*/],
      'padding-bottom': [/.*/]
    }
  }
}
