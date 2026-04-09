export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌟 Raushni</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Educational & Social Welfare Trust</h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Empowering communities through education and social welfare</p>
        
        <div style={{ marginTop: '3rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px' }}>
          <h3>System Status</h3>
          <div style={{ marginTop: '1rem' }}>
            <p>✅ Frontend: Running</p>
            <p id="backend-status">⏳ Backend: Checking...</p>
            <p id="python-status">⏳ Python Service: Checking...</p>
          </div>
        </div>
      </div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          async function checkServices() {
            try {
              const backendRes = await fetch('/api/health');
              if (backendRes.ok) {
                document.getElementById('backend-status').innerHTML = '✅ Backend: Connected';
              }
            } catch(e) {
              document.getElementById('backend-status').innerHTML = '❌ Backend: Not Available';
            }
            
            try {
              const pythonRes = await fetch('http://localhost:8000/health');
              if (pythonRes.ok) {
                document.getElementById('python-status').innerHTML = '✅ Python Service: Connected';
              }
            } catch(e) {
              document.getElementById('python-status').innerHTML = '⚠️ Python Service: Starting...';
            }
          }
          checkServices();
        `
      }} />
    </div>
  );
}
