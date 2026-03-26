import { useState, useEffect } from 'react';
import type { Patient } from '../../types';
import './PatientDetailModal.css';

interface Props { patient: Patient; onClose: () => void; }

const TABS = ['Overview','Vitals','Medications','History'];

export default function PatientDetailModal({ patient, onClose }: Props) {
  const [tab, setTab] = useState('Overview');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h); };
  }, [onClose]);

  const vitals = [
    { label: 'Blood Pressure', value: patient.vitals.bp, unit: 'mmHg', ok: true },
    { label: 'Pulse Rate', value: String(patient.vitals.pulse), unit: 'bpm', ok: patient.vitals.pulse <= 100 },
    { label: 'Temperature', value: patient.vitals.temp, unit: '', ok: true },
    { label: 'SpO2', value: `${patient.vitals.oxygen}%`, unit: '', ok: patient.vitals.oxygen >= 95 },
  ];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">

        {/* Header */}
        <div className="modal-hd">
          <div className="modal-hd-left">
            <div className="modal-av" style={{background:`hsl(${patient.id.charCodeAt(1)*30},50%,52%)`}}>
              {patient.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
            </div>
            <div>
              <h2>{patient.name}</h2>
              <div className="modal-meta">
                <span>{patient.id}</span><span>·</span>
                <span>{patient.age} yrs</span><span>·</span>
                <span>{patient.gender}</span><span>·</span>
                <span className="blood-type">{patient.bloodType}</span>
              </div>
            </div>
          </div>
          <div className="modal-hd-right">
            <span className={`status-pill status-${patient.status.toLowerCase()}`}>{patient.status}</span>
            <button className="close-btn" onClick={onClose}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          {TABS.map(t => (
            <button key={t} className={`modal-tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{t}</button>
          ))}
        </div>

        {/* Body */}
        <div className="modal-body">

          {tab === 'Overview' && (
            <div className="fade-in tab-grid">
              <div className="info-section">
                <div className="section-label">Diagnosis</div>
                <div className="diagnosis-box">{patient.diagnosis}</div>
              </div>
              <div className="info-section">
                <div className="section-label">Admission Details</div>
                <div className="detail-grid">
                  {[
                    ['Ward', patient.ward],
                    ['Admitted', new Date(patient.admittedDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})],
                    ['Last Visit', new Date(patient.lastVisit).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})],
                    ['Doctor', patient.doctor],
                    ['Insurance', patient.insuranceId],
                  ].map(([l,v]) => (
                    <div key={l} className="detail-row">
                      <span className="detail-key">{l}</span>
                      <span className="detail-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="info-section">
                <div className="section-label">Contact</div>
                <div className="detail-grid">
                  {[['Phone',patient.phone],['Email',patient.email],['Address',patient.address]].map(([l,v])=>(
                    <div key={l} className="detail-row">
                      <span className="detail-key">{l}</span>
                      <span className="detail-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="info-section">
                <div className="section-label">Allergies</div>
                <div className="allergy-chips">
                  {patient.allergies.map((a,i)=>(
                    <span key={i} className={`allergy-chip ${a==='None known'?'none':''}`}>{a}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'Vitals' && (
            <div className="fade-in">
              <div className="vitals-grid">
                {vitals.map((v,i)=>(
                  <div key={i} className={`vital-card ${v.ok?'ok':'bad'}`}>
                    <div className="vital-label">{v.label}</div>
                    <div className="vital-val">{v.value} <span className="vital-unit">{v.unit}</span></div>
                    <span className={`vital-badge ${v.ok?'ok':'bad'}`}>{v.ok ? 'Normal' : 'Alert'}</span>
                  </div>
                ))}
              </div>
              <div className="vitals-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Last recorded today at {new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}. Updated every 4 hours.
              </div>
            </div>
          )}

          {tab === 'Medications' && (
            <div className="fade-in">
              <div className="meds-list">
                {patient.medications.map((m,i)=>(
                  <div key={i} className="med-row">
                    <div className="med-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    </div>
                    <div className="med-info">
                      <div className="med-name">{m}</div>
                      <div className="med-sched">{i%3===0?'Once daily — Morning':i%3===1?'Twice daily — Morning & Evening':'As needed (PRN)'}</div>
                    </div>
                    <span className={`med-badge ${i%4===3?'prn':'active'}`}>{i%4===3?'PRN':'Active'}</span>
                  </div>
                ))}
              </div>
              <div className="meds-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                All medications approved by {patient.doctor}. Changes require a prescription update.
              </div>
            </div>
          )}

          {tab === 'History' && (
            <div className="fade-in timeline">
              {[
                { date: patient.lastVisit, title: 'Routine Check-up', desc: `Vitals reviewed. ${patient.condition} assessment. Medication adherence confirmed.`, type: 'checkup' },
                { date: patient.admittedDate, title: 'Initial Admission', desc: `Patient admitted with ${patient.condition}. Diagnosis confirmed.`, type: 'admission' },
                { date: '2024-02-10', title: 'Lab Results', desc: 'Complete blood count, metabolic panel reviewed. Results within expected range.', type: 'lab' },
                { date: '2024-01-28', title: 'Prescription Update', desc: `Medication regimen updated by ${patient.doctor}. Dosage adjustment for primary medication.`, type: 'rx' },
              ].map((e,i)=>(
                <div key={i} className={`tl-event tl-${e.type}`}>
                  <div className="tl-dot"/>
                  <div className="tl-card">
                    <div className="tl-head">
                      <span className="tl-title">{e.title}</span>
                      <span className="tl-date">{new Date(e.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>
                    </div>
                    <p className="tl-desc">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-ft">
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-outline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Export
            </button>
            <button className="btn btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
