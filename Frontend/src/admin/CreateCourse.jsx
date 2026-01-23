import React from 'react'
import { AdminSidebar } from '../components/admin'

function CreateCourse() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar />
      <main className='flex-1 p-8'>
        create course
      </main>
    </div>
  )
}

export default CreateCourse