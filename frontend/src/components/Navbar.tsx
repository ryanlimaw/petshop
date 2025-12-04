import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Petshop Manager</h1>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/" className="navbar-link">
            Início
          </Link>
        </li>
        <li>
          <Link to="/clientes" className="navbar-link">
            Clientes
          </Link>
        </li>
        <li>
          <Link to="/pets" className="navbar-link">
            Pets
          </Link>
        </li>
        <li>
          <Link to="/servicos" className="navbar-link">
            Serviços
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
