import { Link } from 'react-router-dom';
import { useStats } from '../hooks/useStats';

const Home = () => {
  const { stats, loading } = useStats();

  return (
    <div className="home">
      <div className="home-welcome">
        <h2>🏠 Bem-vindo ao Petshop Manager</h2>
        <p>Gerencie seu petshop de forma simples e eficiente</p>
      </div>

      <div className="home-stats">
        <div className="stat-card">
          <h4>Total de Clientes</h4>
          <div className="stat-number">
            {loading ? '...' : stats.clientes}
          </div>
        </div>
        <div className="stat-card">
          <h4>Total de Pets</h4>
          <div className="stat-number">
            {loading ? '...' : stats.pets}
          </div>
        </div>
        <div className="stat-card">
          <h4>Total de Serviços</h4>
          <div className="stat-number">
            {loading ? '...' : stats.servicos}
          </div>
        </div>
      </div>

      <div className="home-content">
        <Link to="/clientes" className="feature-card">
          <div className="card-icon">👥</div>
          <h3>Clientes</h3>
          <p>Cadastre e gerencie seus clientes de forma organizada</p>
          <div className="card-button">Acessar Clientes</div>
        </Link>

        <Link to="/pets" className="feature-card">
          <div className="card-icon">🐾</div>
          <h3>Pets</h3>
          <p>Gerencie os pets dos seus clientes com facilidade</p>
          <div className="card-button">Acessar Pets</div>
        </Link>

        <Link to="/servicos" className="feature-card">
          <div className="card-icon">✂️</div>
          <h3>Serviços</h3>
          <p>Controle todos os serviços realizados no petshop</p>
          <div className="card-button">Acessar Serviços</div>
        </Link>
      </div>

      <div className="home-footer">
        <p>💡 <strong>Dica:</strong> Comece cadastrando seus clientes para depois adicionar seus pets e serviços!</p>
      </div>
    </div>
  );
};

export default Home;