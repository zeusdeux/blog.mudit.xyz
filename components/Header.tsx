import Link from 'next/link'
import React from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'

const Header = () => {
  return (
    <nav>
      <a className="social-link" href="https://twitter.com/muditameta" rel="noopener noreferrer">
        <FaTwitter className="social-icon" />
      </a>

      <a
        className="social-link"
        href="https://github.com/zeusdeux/blog.mudit.xyz"
        rel="noopener noreferrer"
      >
        <FaGithub className="social-icon" />
      </a>

      <a href="https://mudit.xyz" rel="noopener noreferrer" title="Mudit’s home page">
        mudit.xyz
      </a>

      <a href="https://til.mudit.xyz" rel="noopener noreferrer" title="Things Mudit learnt today">
        TILs
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

          nav > a.social-link {
            display: flex;
          }

          nav > a.social-link > :global(.social-icon) {
            align-self: flex-end;
          }
        `}
      </style>
    </nav>
  )
}

export default Header
