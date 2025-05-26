import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out">
  <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
  <div className="flex flex-col flex-1 overflow-hidden">
    <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
    <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      {children}
    </main>
  </div>
</div>

  );
};

export default Layout;
