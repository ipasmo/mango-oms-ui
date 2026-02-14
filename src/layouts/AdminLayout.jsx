import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '@components/layout/Navbar';
import Sidebar from '@components/layout/Sidebar';

/**
 * Admin Layout
 * Layout with sidebar for admin dashboard pages
 */
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-6 lg:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
