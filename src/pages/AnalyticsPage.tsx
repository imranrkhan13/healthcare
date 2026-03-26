import Header from '../components/layout/Header';
import { analyticsData } from '../utils/mockData';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import './AnalyticsPage.css';

const KPIS = [
  { label: 'Total Patients', value: '1,247', change: '+12.4%', up: true },
  { label: 'Avg Stay (Days)', value: '4.7', change: '-0.3d', up: true },
  { label: 'Bed Occupancy', value: '87%', change: '+2.1%', up: false },
  { label: 'Revenue', value: '₹54.1L', change: '+8.3%', up: true },
  { label: 'Critical Cases', value: '43', change: '-3', up: true },
  { label: 'Discharged/Mo', value: '128', change: '+14%', up: true },
];

const PIE_COLORS = ['#2563eb','#7c3aed','#0891b2','#059669','#d97706','#94a3b8'];

export default function AnalyticsPage() {
  const { monthlyAdmissions, departmentLoad, conditionBreakdown, revenueData } = analyticsData;

  return (
    <div className="analytics-page">
      <Header title="Analytics" subtitle="Performance insights and operational metrics" />
      <div className="analytics-content">

        {/* KPIs */}
        <div className="kpi-row">
          {KPIS.map((k, i) => (
            <div key={i} className="kpi-card fade-in" style={{animationDelay:`${i*0.06}s`}}>
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-value">{k.value}</div>
              <span className={`kpi-change ${k.up ? 'up' : 'down'}`}>{k.change}</span>
            </div>
          ))}
        </div>

        {/* Row 1 */}
        <div className="charts-2">
          <div className="panel">
            <div className="panel-head-sm">
              <div className="panel-title">Admissions vs Discharges</div>
              <div className="panel-sub-sm">6-month comparison</div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyAdmissions} barCategoryGap="35%" barGap={3} margin={{top:8,right:8,left:-18,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:11,fontFamily:'Poppins',fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fontFamily:'Poppins',fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{fontFamily:'Poppins',fontSize:12,border:'1px solid #e2e8f0',borderRadius:8}}/>
                <Legend wrapperStyle={{fontFamily:'Poppins',fontSize:11,paddingTop:10}}/>
                <Bar dataKey="admissions" name="Admissions" fill="#2563eb" radius={[4,4,0,0]}/>
                <Bar dataKey="discharges" name="Discharges" fill="#bfdbfe" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="panel">
            <div className="panel-head-sm">
              <div className="panel-title">Condition Breakdown</div>
              <div className="panel-sub-sm">By primary diagnosis</div>
            </div>
            <div className="pie-layout">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={conditionBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={82} paddingAngle={3} dataKey="value">
                    {conditionBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]}/>)}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`,'Share']} contentStyle={{fontFamily:'Poppins',fontSize:12,borderRadius:8}}/>
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {conditionBreakdown.map((d, i) => (
                  <div key={i} className="pie-leg-item">
                    <span className="pie-leg-dot" style={{background:PIE_COLORS[i%PIE_COLORS.length]}}/>
                    <span className="pie-leg-name">{d.name}</span>
                    <span className="pie-leg-val">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="charts-2">
          <div className="panel">
            <div className="panel-head-sm">
              <div className="panel-title">Revenue vs Expenses</div>
              <div className="panel-sub-sm">Monthly financials (Lakhs ₹)</div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData} margin={{top:8,right:8,left:-18,bottom:0}}>
                <defs>
                  <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="ge" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.12}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:11,fontFamily:'Poppins',fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fontFamily:'Poppins',fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{fontFamily:'Poppins',fontSize:12,border:'1px solid #e2e8f0',borderRadius:8}} formatter={(v:any)=>[`₹${v}L`]}/>
                <Legend wrapperStyle={{fontFamily:'Poppins',fontSize:11,paddingTop:10}}/>
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2563eb" strokeWidth={2} fill="url(#gr)" dot={{r:3}} activeDot={{r:5}}/>
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={2} fill="url(#ge)" dot={{r:3}} activeDot={{r:5}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="panel">
            <div className="panel-head-sm">
              <div className="panel-title">Department Capacity</div>
              <div className="panel-sub-sm">Patients vs available beds</div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={departmentLoad} layout="vertical" margin={{top:4,right:16,left:4,bottom:4}} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false}/>
                <XAxis type="number" tick={{fontSize:11,fontFamily:'Poppins',fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                <YAxis type="category" dataKey="dept" tick={{fontSize:11,fontFamily:'Poppins',fill:'#64748b',fontWeight:500}} axisLine={false} tickLine={false} width={80}/>
                <Tooltip contentStyle={{fontFamily:'Poppins',fontSize:12,borderRadius:8}}/>
                <Bar dataKey="patients" name="Patients" fill="#2563eb" radius={[0,4,4,0]}/>
                <Bar dataKey="capacity" name="Capacity" fill="#dbeafe" radius={[0,4,4,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary metrics */}
        <div className="metrics-row">
          {[
            {label:'Patient Satisfaction', value:'94.2%', sub:'847 surveys', pct:94, color:'#059669'},
            {label:'Avg Wait Time', value:'18 min', sub:'Emergency dept', pct:68, color:'#d97706'},
            {label:'Staff Efficiency', value:'91.5%', sub:'On-time task completion', pct:91, color:'#2563eb'},
            {label:'Readmission Rate', value:'4.8%', sub:'Within 30 days', pct:5, color:'#ef4444'},
          ].map((m, i) => (
            <div key={i} className="metric-card panel">
              <div className="metric-top">
                <span className="metric-label">{m.label}</span>
                <span className="metric-value" style={{color:m.color}}>{m.value}</span>
              </div>
              <div className="metric-track">
                <div className="metric-fill" style={{width:`${Math.min(m.pct,100)}%`, background:m.color}}/>
              </div>
              <div className="metric-sub">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
