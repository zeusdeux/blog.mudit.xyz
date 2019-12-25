import React from 'react'
import Sidebar from './Sidebar'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  )
}

export default Layout
