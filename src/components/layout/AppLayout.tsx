import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppStore } from '../../store/appStore';
import './AppLayout.css';

export default function AppLayout() {
  const sidebarOpen = useAppStore(s => s.sidebarOpen);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className={`app-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
        <Outlet />
      </div>
    </div>
  );
}
