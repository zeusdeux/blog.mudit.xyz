import React from 'react'

const A = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    containsIcon?: boolean
  }
>((props, ref) => {
  // the ...rest bit removes non-DOM props from being sent to the
  // native anchor element and thus preventing react from
  // complaining in the console that, for example,
  // "React does not recognize the `containsIcon` prop on a DOM element"
  const { containsIcon, ...rest } = props

  return (
    <>
      <a rel="noopener noreferrer" target="_blank" {...rest} ref={ref}>
        {props.children}
      </a>
      <style jsx>
        {`
          a {
            margin-right: 1rem;
            ${containsIcon ? 'display: flex;' : ''}
          }
          a > :global(.icon) {
            ${containsIcon ? 'align-self: flex-end;' : ''}
          }
        `}
      </style>
    </>
  )
})

export default A
