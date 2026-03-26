import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import Header from '../components/layout/Header';
import PatientDetailModal from './components/PatientDetailModal';
import type { Patient } from '../types';
import './PatientsPage.css';

const FILTERS = ['All','Active','Critical','Inactive','Discharged'];

function Avatar({ name, id }: { name: string; id: string }) {
  return (
    <div className="pt-av" style={{background:`hsl(${id.charCodeAt(1)*30},50%,52%)`}}>
      {name.split(' ').map(n=>n[0]).join('').slice(0,2)}
    </div>
  );
}

function GridCard({ p, onClick }: { p: Patient; onClick: () => void }) {
  return (
    <div className="grid-card" onClick={onClick}>
      <div className="gc-top">
        <Avatar name={p.name} id={p.id}/>
        <span className={`status-pill status-${p.status.toLowerCase()}`}>{p.status}</span>
      </div>
      <div className="gc-name">{p.name}</div>
      <div className="gc-meta">{p.age} yrs · {p.gender} · <strong>{p.bloodType}</strong></div>
      <div className="gc-condition">{p.condition}</div>
      <div className="gc-divider"/>
      <div className="gc-info">
        <div className="gc-info-row">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          <span>{p.doctor}</span>
        </div>
        <div className="gc-info-row">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          <span>{p.ward}</span>
        </div>
      </div>
      <div className="gc-vitals">
        <span className="gc-vital">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          {p.vitals.pulse} bpm
        </span>
        <span className="gc-vital">O₂ {p.vitals.oxygen}%</span>
        <span className="gc-vital">{p.vitals.bp}</span>
      </div>
    </div>
  );
}

function ListRow({ p, onClick }: { p: Patient; onClick: () => void }) {
  return (
    <tr className="list-row" onClick={onClick}>
      <td>
        <div className="table-patient">
          <Avatar name={p.name} id={p.id}/>
          <div>
            <div className="pt-name-sm">{p.name}</div>
            <div className="pt-id">{p.id} · {p.age}y · {p.gender}</div>
          </div>
        </div>
      </td>
      <td className="td-text">{p.condition}</td>
      <td className="td-text">{p.ward}</td>
      <td className="td-text">{p.doctor}</td>
      <td>
        <div className="vitals-cell">
          <span>{p.vitals.pulse} bpm</span>
          <span>O₂ {p.vitals.oxygen}%</span>
        </div>
      </td>
      <td><span className={`status-pill status-${p.status.toLowerCase()}`}>{p.status}</span></td>
      <td className="td-text td-muted">{new Date(p.lastVisit).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</td>
    </tr>
  );
}

export default function PatientsPage() {
  const { patients, viewMode, setViewMode, patientSearch, setPatientSearch, statusFilter, setStatusFilter, setSelectedPatient, selectedPatient } = useAppStore();
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = patients.filter(p => {
    const ms = statusFilter === 'All' || p.status === statusFilter;
    const q = patientSearch.toLowerCase();
    const mq = !q || [p.name,p.id,p.condition,p.ward,p.doctor].some(f=>f.toLowerCase().includes(q));
    return ms && mq;
  });

  const open = (p: Patient) => { setSelectedPatient(p); setModalOpen(true); };
  const counts: Record<string,number> = { All: patients.length };
  FILTERS.slice(1).forEach(s => { counts[s] = patients.filter(p=>p.status===s).length; });

  return (
    <div className="patients-page">
      <Header title="Patients" subtitle={`${patients.length} total · ${patients.filter(p=>p.status==='Critical').length} critical`}/>
      <div className="patients-content">

        {/* Controls */}
        <div className="controls-bar">
          <div className="search-box">
            <svg className="search-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" placeholder="Search patients, conditions, wards..." value={patientSearch} onChange={e=>setPatientSearch(e.target.value)}/>
            {patientSearch && <button className="clear-btn" onClick={()=>setPatientSearch('')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>}
          </div>

          <div className="controls-right">
            <span className="result-count">{filtered.length} patients</span>
            <div className="view-switcher">
              <button className={`vsw-btn ${viewMode==='grid'?'active':''}`} onClick={()=>setViewMode('grid')} title="Grid">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                Grid
              </button>
              <button className={`vsw-btn ${viewMode==='list'?'active':''}`} onClick={()=>setViewMode('list')} title="List">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                List
              </button>
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className="filter-chips">
          {FILTERS.map(f => (
            <button key={f} className={`fchip ${statusFilter===f?'active':''}`} onClick={()=>setStatusFilter(f)}>
              {f} <span className="fchip-count">{counts[f]}</span>
            </button>
          ))}
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="empty-state">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{color:'var(--gray-300)'}}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <p>No patients found</p>
            <span>Try adjusting your search or filter</span>
            <button className="btn btn-outline" style={{marginTop:12}} onClick={()=>{setPatientSearch('');setStatusFilter('All');}}>Clear filters</button>
          </div>
        )}

        {/* Grid */}
        {viewMode==='grid' && filtered.length>0 && (
          <div className="patients-grid">
            {filtered.map((p,i) => (
              <div key={p.id} className="fade-in" style={{animationDelay:`${i*0.04}s`}}>
                <GridCard p={p} onClick={()=>open(p)}/>
              </div>
            ))}
          </div>
        )}

        {/* List */}
        {viewMode==='list' && filtered.length>0 && (
          <div className="list-wrap">
            <table className="patients-table">
              <thead>
                <tr>
                  <th>Patient</th><th>Condition</th><th>Ward</th>
                  <th>Doctor</th><th>Vitals</th><th>Status</th><th>Last Visit</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p,i) => (
                  <div key={p.id} className="fade-in" style={{animationDelay:`${i*0.03}s`,display:'contents'}}>
                    <ListRow p={p} onClick={()=>open(p)}/>
                  </div>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && selectedPatient && (
        <PatientDetailModal patient={selectedPatient} onClose={()=>{setModalOpen(false);setSelectedPatient(null);}}/>
      )}
    </div>
  );
}
