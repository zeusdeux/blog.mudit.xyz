import React from 'react'
import Markdown, { ReactMarkdownProps } from 'react-markdown'
import A from './A'
import LazyImg from './LazyImg'

const WrappedMarkdown: React.FC<ReactMarkdownProps> = props => {
  return <Markdown {...props} escapeHtml={false} renderers={{ link: A, image: LazyImg }} />
}

export default WrappedMarkdown
