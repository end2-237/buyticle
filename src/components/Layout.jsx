// src/components/Layout.jsx
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div className="flex h-screen bg-white">
    <Sidebar />
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="p-2 overflow-auto">{children}</main>
    </div>
  </div>
);

export default Layout;
