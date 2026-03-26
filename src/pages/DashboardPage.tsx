import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import Header from '../components/layout/Header';
import { analyticsData, mockPatients } from '../utils/mockData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './DashboardPage.css';

const STATS = [
  { label: 'Total Patients', value: '1,247', change: '+12%', up: true },
  { label: 'Active Today', value: '834', change: '+5%', up: true },
  { label: 'Critical', value: '43', change: '-3', up: true },
  { label: 'Bed Occupancy', value: '87%', change: '+2%', up: false },
];

const ALERTS = [
  { level: 'critical', patient: 'Ravi Krishnamurthy', ward: 'Cardiac ICU', msg: 'SpO2 at 91% — immediate review needed', time: '2m ago' },
  { level: 'warning', patient: 'Suresh Menon', ward: 'Hepatology', msg: 'Missed 2PM medication dose', time: '18m ago' },
  { level: 'info', patient: 'Lakshmi Nair', ward: 'Rheumatology', msg: 'Discharge approved — papers ready', time: '45m ago' },
  { level: 'warning', patient: 'Rahul Joshi', ward: 'Oncology', msg: 'Chemo session in 30 minutes', time: '1h ago' },
];

const DEPTS = [
  { name: 'Cardiology', pct: 80, color: '#2563eb' },
  { name: 'Oncology', pct: 82, color: '#7c3aed' },
  { name: 'Neurology', pct: 80, color: '#0891b2' },
  { name: 'Pulmonology', pct: 87, color: '#059669' },
  { name: 'Nephrology', pct: 84, color: '#d97706' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { setSelectedPatient } = useAppStore();
  const recent = mockPatients.slice(0, 6);

  return (
    <div className="dash-page">
      <Header title="Dashboard" subtitle={`${new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}`} />
      <div className="dash-content">

        {/* Stats */}
        <div className="stat-row">
          {STATS.map((s, i) => (
            <div key={i} className="stat-card fade-in" style={{ animationDelay: `${i*0.07}s` }}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <span className={`stat-change ${s.up ? 'up' : 'down'}`}>{s.up ? '+' : ''}{s.change} this month</span>
            </div>
          ))}
        </div>

        <div className="dash-grid">
          <div className="dash-left">
            {/* Chart */}
            <div className="panel">
              <div className="panel-head">
                <div>
                  <div className="panel-title">Patient Admissions</div>
                  <div className="panel-sub">Monthly trend — last 6 months</div>
                </div>
                <div className="legend-row">
                  <span className="legend-item"><span className="ldot" style={{background:'#2563eb'}}/>Admissions</span>
                  <span className="legend-item"><span className="ldot" style={{background:'#93c5fd'}}/>Discharges</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={210}>
                <AreaChart data={analyticsData.monthlyAdmissions} margin={{top:8,right:8,left:-20,bottom:0}}>
                  <defs>
                    <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.12}/>
                      <stop offset="95%" stopColor="#93c5fd" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{fontSize:11,fontFamily:'Poppins',fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fontFamily:'Poppins',fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{fontFamily:'Poppins',fontSize:12,border:'1px solid #e2e8f0',borderRadius:8}} labelStyle={{fontWeight:600}}/>
                  <Area type="monotone" dataKey="admissions" stroke="#2563eb" strokeWidth={2} fill="url(#ga)" dot={false} activeDot={{r:4}}/>
                  <Area type="monotone" dataKey="discharges" stroke="#93c5fd" strokeWidth={2} fill="url(#gd)" dot={false} activeDot={{r:4}}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Patients table */}
            <div className="panel">
              <div className="panel-head">
                <div>
                  <div className="panel-title">Recent Patients</div>
                  <div className="panel-sub">Latest admissions</div>
                </div>
                <button className="link-btn" onClick={() => navigate('/patients')}>View all</button>
              </div>
              <table className="mini-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Condition</th>
                    <th>Ward</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map(p => (
                    <tr key={p.id} onClick={() => { setSelectedPatient(p); navigate('/patients'); }} className="table-row-hover">
                      <td>
                        <div className="table-patient">
                          <div className="mini-av" style={{background:`hsl(${p.id.charCodeAt(1)*30},55%,55%)`}}>
                            {p.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                          </div>
                          <div>
                            <div className="pt-name">{p.name}</div>
                            <div className="pt-meta">{p.age}y · {p.gender}</div>
                          </div>
                        </div>
                      </td>
                      <td className="td-muted">{p.condition}</td>
                      <td className="td-muted">{p.ward}</td>
                      <td><span className={`status-pill status-${p.status.toLowerCase()}`}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dash-right">
            {/* Alerts */}
            <div className="panel">
              <div className="panel-head">
                <div>
                  <div className="panel-title">Live Alerts</div>
                  <div className="panel-sub">Requires attention</div>
                </div>
                <div className="live-pill">
                  <span className="live-dot"/>Live
                </div>
              </div>
              <div className="alerts-list">
                {ALERTS.map((a, i) => (
                  <div key={i} className={`alert-row alert-${a.level}`}>
                    <div className={`alert-bar bar-${a.level}`}/>
                    <div className="alert-body">
                      <div className="alert-pt">{a.patient} <span className="alert-ward">· {a.ward}</span></div>
                      <div className="alert-msg">{a.msg}</div>
                      <div className="alert-time">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dept load */}
            <div className="panel">
              <div className="panel-head">
                <div className="panel-title">Department Load</div>
              </div>
              <div className="dept-list">
                {DEPTS.map((d, i) => (
                  <div key={i} className="dept-row">
                    <div className="dept-top">
                      <span className="dept-name">{d.name}</span>
                      <span className="dept-pct" style={{color:d.color}}>{d.pct}%</span>
                    </div>
                    <div className="dept-track">
                      <div className="dept-fill" style={{width:`${d.pct}%`, background:d.color}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
