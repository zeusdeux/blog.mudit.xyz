import React from 'react'

const LazyImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = props => {
  // Ignore img usage below since react types for it
  // don't have a property called loading on it
  // since only chrome supports it for now
  // @ts-ignore
  return <img {...props} loading="lazy" />
}

export default LazyImage
