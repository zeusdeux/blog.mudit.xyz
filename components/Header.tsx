import Link from 'next/link'
import React from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import A from './A'

const Header = () => {
  return (
    <nav>
      <A href="https://twitter.com/muditameta" title="Mudit’s Twitter" containsIcon>
        <FaTwitter className="icon" />
      </A>

      <A href="https://github.com/zeusdeux/blog.mudit.xyz" title="Mudit’s GitHub" containsIcon>
        <FaGithub className="icon" />
      </A>

      <A href="https://mudit.xyz" title="Mudit’s home page">
        mudit.xyz
      </A>

      <A href="https://til.mudit.xyz" title="Things Mudit learnt today">
        TILs
      </A>

      <Link href="/">
        {/* Using the native anchor element as we don't want it
         * to have the target="_blank" behaviour A has amongst other things
         * such as Link passing a ref to its child.
         */}
        <a title="Mudit’s blog post listing">Contents</a>
      </Link>

      <style jsx>
        {`
          nav {
            display: flex;
            justify-content: flex-end;
            padding: 2rem;
          }
        `}
      </style>
    </nav>
  )
}

export default Header
