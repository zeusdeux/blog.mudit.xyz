import React from 'react'

const A = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  (props, ref) => {
    return (
      <a rel="noopener noreferrer" target="_blank" {...props} ref={ref}>
        {props.children}
      </a>
    )
  }
)

export default A
