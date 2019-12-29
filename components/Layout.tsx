import React from 'react'
import Header from './Header'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="root">
      <div className="page">
        <Header />
        {children}
      </div>
      <style jsx>
        {`
          .root {
            width: 100vw;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .page {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            max-width: 960px;
            width: 100%;
            background-color: #f7f7f7;
            line-height: 1.5rem;
          }

          :global(*) {
            box-sizing: border-box;
          }

          :global(body, html) {
            padding: 0;
            margin: 0;
          }

          :global(h1) {
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid black;
            width: 100%;
            text-align: center;
            font-family: serif;
            font-size: 3rem;
            line-height: 3rem;
          }
        `}
      </style>
    </div>
  )
}

export default Layout
