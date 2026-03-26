import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import './Header.css';

interface Props { title: string; subtitle?: string; }

const TYPE_COLOR: Record<string, string> = {
  error: '#dc2626', warning: '#d97706', success: '#059669', info: '#2563eb',
};

export default function Header({ title, subtitle }: Props) {
  const { notifications, unreadCount, markAllRead, markRead, setSidebarOpen, sidebarOpen, addNotification } = useAppStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const formatTime = (d: Date) => {
    const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
    if (s < 60) return 'Just now';
    if (s < 3600) return `${Math.floor(s/60)}m ago`;
    return `${Math.floor(s/3600)}h ago`;
  };

  const triggerAlert = () => {
    const items = [
      { title: 'Critical Vitals', message: 'Patient Ravi K. — SpO2 at 91%, review needed immediately', type: 'error' as const },
      { title: 'Lab Results Ready', message: 'Blood panel for Sneha Patel is available for review', type: 'info' as const },
      { title: 'Discharge Approved', message: 'Lakshmi Nair cleared for discharge — papers ready', type: 'success' as const },
      { title: 'Medication Missed', message: 'Vikram Singh missed 2PM dose — Erythropoietin', type: 'warning' as const },
    ];
    addNotification(items[Math.floor(Math.random() * items.length)]);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div>
          <h1 className="header-title">{title}</h1>
          {subtitle && <p className="header-sub">{subtitle}</p>}
        </div>
      </div>

      <div className="header-right">
        <button className="test-alert-btn" onClick={triggerAlert}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          Test Alert
        </button>

        {/* Bell */}
        <div className="bell-wrap" ref={ref}>
          <button className="bell-btn" onClick={() => setOpen(o => !o)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unreadCount > 0 && <span className="bell-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>}
          </button>

          {open && (
            <div className="notif-panel">
              <div className="notif-panel-head">
                <span>Notifications</span>
                {unreadCount > 0 && <button className="mark-read-btn" onClick={markAllRead}>Mark all read</button>}
              </div>
              <div className="notif-list">
                {notifications.length === 0 ? (
                  <div className="notif-empty">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{color:'var(--gray-300)'}}>
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                    <p>No notifications yet</p>
                    <span>Click "Test Alert" to demo</span>
                  </div>
                ) : notifications.map(n => (
                  <div key={n.id} className={`notif-item ${n.read ? '' : 'unread'}`} onClick={() => markRead(n.id)}>
                    <div className="notif-dot" style={{ background: TYPE_COLOR[n.type] }} />
                    <div className="notif-body">
                      <div className="notif-title">{n.title}</div>
                      <div className="notif-msg">{n.message}</div>
                      <div className="notif-time">{formatTime(n.timestamp)}</div>
                    </div>
                    {!n.read && <div className="unread-indicator" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="header-av">
          {useAppStore.getState().user?.name.split(' ').map(n => n[0]).join('').slice(0,2)}
        </div>
      </div>
    </header>
  );
}
