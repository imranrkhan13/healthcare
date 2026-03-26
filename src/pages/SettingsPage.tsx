import Header from '../components/layout/Header';
import { useAppStore } from '../store/appStore';
import './SettingsPage.css';

export default function SettingsPage() {
  const { user, addNotification } = useAppStore();

  const triggerDemo = () => {
    addNotification({ title: 'Test Notification', message: 'This is a live demo alert from MedCore.', type: 'info' });
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Test Notification', { body: 'This is a live demo alert from MedCore.' });
    }
  };

  return (
    <div className="settings-page">
      <Header title="Settings" subtitle="Account preferences and system configuration"/>
      <div className="settings-content">

        {/* Profile */}
        <div className="settings-card">
          <div className="settings-card-title">Profile</div>
          <div className="profile-row">
            <div className="profile-av">{user?.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
            <div className="profile-info">
              <div className="profile-name">{user?.name}</div>
              <div className="profile-email">{user?.email}</div>
              <span className="profile-role">{user?.role}</span>
            </div>
            <button className="btn btn-outline">Edit Profile</button>
          </div>
          <div className="settings-fields">
            {[
              { label: 'Full Name', value: user?.name, type: 'text' },
              { label: 'Email', value: user?.email, type: 'email' },
              { label: 'Hospital', value: user?.hospital, type: 'text' },
              { label: 'Role', value: user?.role, type: 'text' },
            ].map((f,i) => (
              <div key={i} className="sfield">
                <label>{f.label}</label>
                <input type={f.type} defaultValue={f.value} readOnly/>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <div className="settings-card-title">Notifications</div>
          <div className="toggles-list">
            {[
              { label: 'Critical Patient Alerts', desc: 'Immediate alerts for critical status changes', on: true },
              { label: 'Lab Result Updates', desc: 'Notify when patient lab results are ready', on: true },
              { label: 'Discharge Reminders', desc: 'Reminders for patients due for discharge', on: false },
              { label: 'Appointment Alerts', desc: 'Upcoming schedule and appointment reminders', on: true },
              { label: 'System Updates', desc: 'Platform updates and maintenance notices', on: false },
            ].map((t,i) => (
              <div key={i} className="toggle-row">
                <div>
                  <div className="toggle-label">{t.label}</div>
                  <div className="toggle-desc">{t.desc}</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked={t.on}/>
                  <span className="toggle-track"/>
                </label>
              </div>
            ))}
          </div>
          <div className="demo-row">
            <button className="btn btn-primary" onClick={triggerDemo}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              Send Test Notification
            </button>
            <p>Triggers a live in-app notification and browser push (if permitted).</p>
          </div>
        </div>

        {/* Security */}
        <div className="settings-card">
          <div className="settings-card-title">Security</div>
          <div className="security-list">
            {[
              { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account', action: 'Enable', outline: false },
              { label: 'Active Sessions', desc: 'View and manage all active login sessions', action: 'Manage', outline: true },
              { label: 'Audit Log', desc: 'Full history of account activity', action: 'View', outline: true },
            ].map((s,i) => (
              <div key={i} className="security-row">
                <div className="security-icon-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <div className="security-info">
                  <div className="security-label">{s.label}</div>
                  <div className="security-desc">{s.desc}</div>
                </div>
                <button className={`btn ${s.outline ? 'btn-outline' : 'btn-primary'}`}>{s.action}</button>
              </div>
            ))}
          </div>
        </div>

        {/* System */}
        <div className="settings-card sys-card">
          <div className="sys-badges">
            {[['MedCore v2.4.1','version'],['HIPAA Compliant','compliance'],['SOC 2 Type II','compliance'],['ISO 27001','compliance'],['All systems operational','status']].map(([l,t])=>(
              <span key={l} className={`sys-badge ${t==='status'?'green':''}`}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
