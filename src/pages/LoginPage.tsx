import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import './LoginPage.css';

const STATS = [
  { value: '50K+', label: 'Patients managed' },
  { value: '200+', label: 'Hospitals onboarded' },
  { value: '99.9%', label: 'Platform uptime' },
  { value: '4.9/5', label: 'Customer rating' },
];

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: 'Live Dashboard',
    desc: 'Real-time patient monitoring with instant alerts and department-level visibility across your entire hospital.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Patient Management',
    desc: 'Complete patient records, vitals tracking, medication schedules, and clinical history in one unified view.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: 'Advanced Analytics',
    desc: 'Actionable insights from revenue trends to bed occupancy — presented in charts your team will actually use.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    title: 'Smart Alerts',
    desc: 'Push notifications for critical vitals, missed medications, and discharge readiness — across any device.',
  },
];

const TESTIMONIALS = [
  {
    quote: "MedCore cut our average patient wait time by 34% in the first quarter. The dashboard is something every department head checks every morning.",
    name: 'Dr. Rajesh Verma',
    role: 'CMO, Apollo Hospitals',
    initials: 'RV',
    color: '#2563eb',
  },
  {
    quote: "We've tried three other platforms. MedCore is the first one where the nursing staff actually wanted to use it without being forced.",
    name: 'Anita Sharma',
    role: 'Head of Operations, Fortis',
    initials: 'AS',
    color: '#7c3aed',
  },
  {
    quote: "The analytics module alone saved us months of manual reporting. Board-ready charts, real data, zero spreadsheets.",
    name: 'Dr. Priya Nair',
    role: 'Director, Manipal Health',
    initials: 'PN',
    color: '#0891b2',
  },
];

const PLAN_CARDS = [
  {
    name: 'Starter',
    price: '₹4,999',
    period: '/mo',
    desc: 'Perfect for single-specialty clinics and small hospitals.',
    features: ['Up to 500 patients', 'Dashboard & Analytics', 'Email notifications', '2 admin seats', 'Standard support'],
    cta: 'Start free trial',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '₹14,999',
    period: '/mo',
    desc: 'For mid-size hospitals that need the full feature set.',
    features: ['Unlimited patients', 'All modules', 'Push notifications', '15 seats + roles', 'Priority support', 'API access'],
    cta: 'Get started',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Multi-branch hospital networks and healthcare groups.',
    features: ['Multi-branch support', 'Custom integrations', 'Dedicated SLA', 'Unlimited seats', 'On-prem option', 'White-label'],
    cta: 'Contact sales',
    highlight: false,
  },
];

const CREDENTIALS = [
  { role: 'Admin', email: 'admin@medcore.health', pass: 'admin123' },
  { role: 'Doctor', email: 'doctor@medcore.health', pass: 'doctor123' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, authError, isAuthenticated } = useAppStore();
  const [email, setEmail] = useState('admin@medcore.health');
  const [password, setPassword] = useState('admin123');
  const [showPass, setShowPass] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="lp-root">
      {/* ── NAV ── */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-logo">
            <div className="lp-logo-mark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <span>MedCore</span>
          </div>
          <div className="lp-nav-links">
            <a href="#features">Features</a>
            <a href="#testimonials">Reviews</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="lp-nav-actions">
            <button className="lp-btn-ghost" onClick={scrollToForm}>Sign in</button>
            <button className="lp-btn-primary" onClick={scrollToForm}>Get started free</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <div className="lp-badge">
            <span className="badge-dot" />
            Now available — push notifications & analytics v2
          </div>
          <h1 className="lp-headline">
            Healthcare management<br />
            <span className="lp-headline-accent">built for modern hospitals</span>
          </h1>
          <p className="lp-hero-sub">
            A unified platform for patient records, real-time analytics, and clinical operations.<br />
            Trusted by 200+ hospitals across India.
          </p>
          <div className="lp-hero-cta">
            <button className="lp-btn-primary lp-btn-lg" onClick={scrollToForm}>
              Start for free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="lp-btn-outline lp-btn-lg" onClick={scrollToForm}>Sign in to dashboard</button>
          </div>

          {/* Hero visual */}
          <div className="lp-hero-visual">
            <div className="hero-screen hero-screen-main">
              <div className="hsc-bar">
                <div className="hsc-dots"><span/><span/><span/></div>
                <div className="hsc-url">medcore.health/dashboard</div>
              </div>
              <div className="hsc-body">
                <div className="hsc-sidebar">
                  <div className="hsc-nav-item active"/>
                  <div className="hsc-nav-item"/>
                  <div className="hsc-nav-item"/>
                  <div className="hsc-nav-item"/>
                </div>
                <div className="hsc-content">
                  <div className="hsc-stat-row">
                    {['#dbeafe','#ecfdf5','#fef3c7','#fce7f3'].map((c,i)=>(
                      <div key={i} className="hsc-stat-card" style={{background:c}}/>
                    ))}
                  </div>
                  <div className="hsc-chart">
                    {[60,80,50,95,70,88,65].map((h,i)=>(
                      <div key={i} className="hsc-bar" style={{height:`${h}%`, animationDelay:`${i*0.1}s`}}/>
                    ))}
                  </div>
                  <div className="hsc-rows">
                    {[1,2,3].map(i=><div key={i} className="hsc-row"/>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="hero-float-card fc-alert">
              <div className="fc-icon-red">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <div>
                <div className="fc-title">Critical Alert</div>
                <div className="fc-sub">ICU Bed 14 · SpO2 89%</div>
              </div>
              <div className="fc-time">Now</div>
            </div>

            <div className="hero-float-card fc-stat">
              <div className="fc-stat-num">834</div>
              <div className="fc-stat-label">Active patients today</div>
              <div className="fc-stat-change">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                12% vs last week
              </div>
            </div>

            <div className="hero-float-card fc-discharge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <div>
                <div className="fc-title">3 discharges approved</div>
                <div className="fc-sub">Ward 7 · Rheumatology</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="lp-stats-strip">
        {STATS.map((s, i) => (
          <div key={i} className="strip-stat">
            <div className="strip-val">{s.value}</div>
            <div className="strip-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section className="lp-features" id="features">
        <div className="lp-section-inner">
          <div className="lp-section-label">Platform features</div>
          <h2 className="lp-section-title">Everything your hospital needs,<br />nothing it doesn't.</h2>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="feature-icon-wrap">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOWCASE CARDS ── */}
      <section className="lp-showcase">
        <div className="lp-section-inner">
          <div className="showcase-grid">
            <div className="showcase-card sc-dark">
              <div className="sc-label">Patient Grid View</div>
              <h3>Every patient, at a glance</h3>
              <p>Switch between grid and list view. Search, filter by status, and drill into any patient record with a single click.</p>
              <div className="sc-patient-grid">
                {['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ef4444','#06b6d4'].map((c,i)=>(
                  <div key={i} className="sc-patient-card">
                    <div className="sc-av" style={{background:c}}/>
                    <div className="sc-lines"><span/><span/></div>
                    <div className="sc-badge"/>
                  </div>
                ))}
              </div>
            </div>

            <div className="showcase-card sc-light">
              <div className="sc-label">Analytics</div>
              <h3>Data that drives decisions</h3>
              <p>Revenue vs expenses, bed occupancy trends, and department load — all in one screen.</p>
              <div className="sc-chart-preview">
                {[45,70,55,88,62,95,78,84].map((h,i)=>(
                  <div key={i} className="sc-bar" style={{height:`${h}%`, background: i===5?'#2563eb':'#dbeafe'}}/>
                ))}
              </div>
            </div>

            <div className="showcase-card sc-blue">
              <div className="sc-label">Smart Alerts</div>
              <h3>Never miss a critical event</h3>
              <p>Real-time push notifications delivered to every device the moment something needs attention.</p>
              <div className="sc-notifs">
                {[
                  {color:'#ef4444', title:'Critical Vitals', sub:'Ravi K. · ICU'},
                  {color:'#f59e0b', title:'Medication Missed', sub:'Vikram S. · Ward 3'},
                  {color:'#10b981', title:'Discharge Approved', sub:'Lakshmi N. · Rheum'},
                ].map((n,i)=>(
                  <div key={i} className="sc-notif-row" style={{animationDelay:`${i*0.15}s`}}>
                    <div className="sc-notif-dot" style={{background:n.color}}/>
                    <div>
                      <div className="sc-notif-title">{n.title}</div>
                      <div className="sc-notif-sub">{n.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="lp-testimonials" id="testimonials">
        <div className="lp-section-inner">
          <div className="lp-section-label">What hospitals say</div>
          <h2 className="lp-section-title">Trusted by teams that care about quality care.</h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="tc-stars">
                  {[...Array(5)].map((_,s)=>(
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="tc-quote">"{t.quote}"</p>
                <div className="tc-author">
                  <div className="tc-av" style={{ background: t.color }}>{t.initials}</div>
                  <div>
                    <div className="tc-name">{t.name}</div>
                    <div className="tc-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="lp-pricing" id="pricing">
        <div className="lp-section-inner">
          <div className="lp-section-label">Pricing</div>
          <h2 className="lp-section-title">Simple pricing. No surprises.</h2>
          <div className="pricing-grid">
            {PLAN_CARDS.map((plan, i) => (
              <div key={i} className={`pricing-card ${plan.highlight ? 'pricing-highlight' : ''}`}>
                {plan.highlight && <div className="pricing-popular">Most popular</div>}
                <div className="pricing-name">{plan.name}</div>
                <div className="pricing-price">
                  {plan.price}<span className="pricing-period">{plan.period}</span>
                </div>
                <div className="pricing-desc">{plan.desc}</div>
                <div className="pricing-divider"/>
                <ul className="pricing-features">
                  {plan.features.map((f, fi) => (
                    <li key={fi}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`pricing-cta ${plan.highlight ? 'lp-btn-primary' : 'lp-btn-outline'}`} onClick={scrollToForm}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGN IN FORM ── */}
      <section className="lp-signin-section" id="signin" ref={formRef}>
        <div className="lp-signin-inner">
          <div className="lp-signin-left">
            <div className="lp-section-label">Get started today</div>
            <h2>Sign in to your<br />hospital dashboard</h2>
            <p>Use the demo credentials to explore the full platform — no credit card required.</p>
            <div className="signin-trust">
              {['HIPAA Compliant', 'SOC 2 Type II', 'ISO 27001', '99.9% Uptime'].map(b => (
                <div key={b} className="signin-trust-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {b}
                </div>
              ))}
            </div>
          </div>

          <div className="lp-signin-right">
            <div className="signin-card">
              <div className="signin-card-head">
                <h3>Sign in</h3>
                <p>Access your MedCore dashboard</p>
              </div>

              <div className="signin-quick">
                <span className="quick-label">Quick fill</span>
                <div className="quick-pills">
                  {CREDENTIALS.map(c => (
                    <button key={c.role} type="button" className="quick-pill"
                      onClick={() => { setEmail(c.email); setPassword(c.pass); }}>
                      {c.role}
                    </button>
                  ))}
                </div>
              </div>

              {authError && (
                <div className="signin-error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {authError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="signin-form">
                <div className="signin-field">
                  <label>Email address</label>
                  <div className="signin-input-wrap">
                    <svg className="si-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="doctor@medcore.health" required />
                  </div>
                </div>
                <div className="signin-field">
                  <label>Password</label>
                  <div className="signin-input-wrap">
                    <svg className="si-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                    <button type="button" className="eye-btn" onClick={() => setShowPass(s => !s)}>
                      {showPass
                        ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      }
                    </button>
                  </div>
                </div>
                <button type="submit" className="signin-submit" disabled={isLoading}>
                  {isLoading
                    ? <><span className="spinner"/>Signing in...</>
                    : <>Sign in to dashboard <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-logo">
            <div className="lp-logo-mark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <span>MedCore</span>
          </div>
          <div className="footer-copy">© 2025 MedCore Health Technologies. All rights reserved.</div>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
