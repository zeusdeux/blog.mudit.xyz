import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div>
      <nav>
        <a href="https://mudit.xyz" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="277" height="158" version="1">
            <defs>
              <clipPath id="a">
                <path
                  fill="teal"
                  strokeWidth="2"
                  d="M-613-727h732v509h-732z"
                  color="#000"
                  overflow="visible"
                  transform="matrix(.99715 .07547 -.65172 -.75846 0 0)"
                  style={{ marker: 'none' }}
                ></path>
              </clipPath>
            </defs>
            <g color="#000">
              <path
                fill="#7ef7d6"
                style={{ marker: 'none' }}
                d="M121 118L0 115 63 12z"
                overflow="visible"
              ></path>
              <path
                fill="#7ef7d6"
                style={{ marker: 'none' }}
                d="M162 0l26 142L53 93z"
                overflow="visible"
              ></path>
              <g fill="#dedede">
                <path
                  d="M120 116L0 115l165 38z"
                  overflow="visible"
                  style={{ marker: 'none' }}
                ></path>
                <path
                  d="M246 264l35 328-302-134z"
                  clip-path="url(#a)"
                  overflow="visible"
                  transform="matrix(.47265 .01664 -.39269 -.15465 264 195)"
                  style={{ marker: 'none' }}
                ></path>
              </g>
            </g>
          </svg>
        </a>

        <Link href="/">
          <a>Mudit’s blog</a>
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
