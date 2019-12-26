import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <nav>
      <a href="https://mudit.xyz" rel="noopener noreferrer" title="Mudit’s home page">
        mudit.xyz
      </a>

      <Link href="/">
        <a title="Mudit’s blog post listing">Contents</a>
      </Link>

      <style jsx>
        {`
          nav {
            display: flex;
            justify-content: flex-end;
            padding: 2rem;
          }

          nav > a:not(:last-child) {
            margin-right: 1rem;
          }
        `}
      </style>
    </nav>
  )
}

export default Header
