'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [pythonStatus, setPythonStatus] = useState('checking');

  useEffect(() => {
    // Check backend
    fetch('/api/health')
      .then(res => res.ok ? setBackendStatus('connected') : setBackendStatus('error'))
      .catch(() => setBackendStatus('error'));

    // Check Python service
    fetch('http://localhost:8000/health')
      .then(res => res.ok ? setPythonStatus('connected') : setPythonStatus('error'))
      .catch(() => setPythonStatus('error'));
  }, []);

  const getStatusColor = (status) => {
    if (status === 'connected') return '#4CAF50';
    if (status === 'checking') return '#FFC107';
    return '#F44336';
  };

  const getStatusText = (status) => {
    if (status === 'connected') return '✅ Connected';
    if (status === 'checking') return '⏳ Checking...';
    return '❌ Not Available';
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌟 Raushni</h1>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Educational & Social Welfare Trust</h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
          Empowering communities through education and social welfare
        </p>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '2rem',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          marginTop: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>System Status</h3>
          <div style={{ textAlign: 'left', marginTop: '1rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Frontend:</strong> ✅ Running
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Backend:</strong>{' '}
              <span style={{ color: getStatusColor(backendStatus) }}>
                {getStatusText(backendStatus)}
              </span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Python Service:</strong>{' '}
              <span style={{ color: getStatusColor(pythonStatus) }}>
                {getStatusText(pythonStatus)}
              </span>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <FeatureCard title="Member ID Cards" description="Generate digital ID cards with QR codes" />
          <FeatureCard title="80G Receipts" description="Tax-deductible donation receipts" />
          <FeatureCard title="Appointment Letters" description="Automated offer letters" />
          <FeatureCard title="Certificates" description="Achievement recognition" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      padding: '1rem',
      borderRadius: '10px',
      textAlign: 'center'
    }}>
      <h4 style={{ marginBottom: '0.5rem' }}>{title}</h4>
      <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{description}</p>
    </div>
  );
}
