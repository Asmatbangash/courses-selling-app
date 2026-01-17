import React from 'react'
import { Sidebar } from '../components'

function Settings() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-50">
      settings
      </main>
    </div>
  )
}

export default Settings