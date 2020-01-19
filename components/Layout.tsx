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
            line-height: 1.5rem;
          }
        `}
      </style>
    </div>
  )
}

export default Layout
