import React from 'react'
import Header from './Header'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="root">
      <div className="content">
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

          .content {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            max-width: 960px;
            width: 100%;
            background-color: #f7f7f7;
          }

          :global(*) {
            box-sizing: border-box;
          }

          :global(body) {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
              sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            overflow: hidden;
          }

          :global(body, html) {
            padding: 0;
            margin: 0;
          }
        `}
      </style>
    </div>
  )
}

export default Layout
