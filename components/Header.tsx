import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <nav>
      <a href="https://mudit.xyz" rel="noopener noreferrer">
        mudit.xyz
      </a>

      <Link href="/">
        <a>Contents</a>
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

          a {
            text-decoration: none;
          }
        `}
      </style>
    </nav>
  )
}

export default Header
