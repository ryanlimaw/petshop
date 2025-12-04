import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Clientes from './pages/Clientes';
import Pets from './pages/Pets';
import Servicos from './pages/Servicos';

console.log('📱 App.tsx loaded');

function App() {
  console.log('🚀 App component executing');

  try {
    console.log('🔗 Setting up Router...');

    return (
      <Router>
        <div style={{
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f5f5f5',
          minHeight: '100vh'
        }}>
          <nav style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h1 style={{ color: '#2563eb', margin: 0 }}>Petshop Manager</h1>
          </nav>

          <Routes>
            <Route path="/" element={
              <div>
                <h2>Home Page</h2>
                <p>Router está funcionando!</p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px',
                  marginTop: '20px'
                }}>
                  <Link to="/clientes" style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}>
                    <h3>👥 Clientes</h3>
                    <p>Gerenciar clientes</p>
                  </Link>

                  <Link to="/pets" style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}>
                    <h3>🐾 Pets</h3>
                    <p>Gerenciar pets</p>
                  </Link>

                  <Link to="/servicos" style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}>
                    <h3>✂️ Serviços</h3>
                    <p>Gerenciar serviços</p>
                  </Link>
                </div>
              </div>
            } />

            <Route path="/clientes" element={<Clientes />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/servicos" element={<Servicos />} />
          </Routes>
        </div>
      </Router>
    );
  } catch (error) {
    console.error('❌ Error in App component:', error);
    return (
      <div style={{ padding: '20px', color: 'red', fontFamily: 'Arial, sans-serif' }}>
        <h1>Erro na Aplicação</h1>
        <p>Verifique o console para detalhes.</p>
        <pre>{error instanceof Error ? error.message : 'Erro desconhecido'}</pre>
      </div>
    );
  }
}

export default App;
