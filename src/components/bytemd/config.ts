import gfm from '@bytemd/plugin-gfm'
import frontmatter from '@bytemd/plugin-frontmatter'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import highlight from '@bytemd/plugin-highlight'
import { prettyLinkPlugin } from './plugins/pretty-link'
import { headingPlugin } from './plugins/heading'
import { codeBlockPlugin } from './plugins/code-block'
import type { Schema } from 'hast-util-sanitize'
import { merge } from 'lodash-es'

// 导入代码高亮主题
import 'highlight.js/styles/github-dark.css'

// 配置插件
export const plugins = [
  gfm(),
  frontmatter(),
  mediumZoom(),
  highlight({
    init: (hljs) => {
      // 可以在这里添加自定义语言支持
    }
  }),
  prettyLinkPlugin(),
  headingPlugin(),
  codeBlockPlugin()
]

// HTML 标签和属性的白名单配置
const sanitizeSchema = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'div', 'span',
    'a', 'img',
    'ul', 'ol', 'li',
    'blockquote', 'hr',
    'br', 'strong', 'em',
    'pre', 'code',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'svg', 'path', 'rect'
  ],
  allowedAttributes: {
    '*': ['class', 'id', 'style', 'data-lang'],
    'a': ['href', 'target', 'rel'],
    'img': ['src', 'alt', 'title'],
    'svg': ['xmlns', 'width', 'height', 'viewBox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'],
    'path': ['d', 'fill', 'stroke'],
    'rect': ['width', 'height', 'x', 'y', 'rx', 'ry'],
    'pre': ['class', 'data-lang'],
    'code': ['class', 'data-lang']
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
      'padding-bottom': [/.*/],
      'border-radius': [/.*/]
    }
  }
}

// 导出 sanitize 函数
export const sanitize = (schema: Schema) => merge({}, schema, sanitizeSchema)
