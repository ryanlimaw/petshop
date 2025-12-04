import { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { useCrud } from '../hooks/useCrud';
import { clienteService } from '../services/clienteService';
import type { Cliente, ClienteFormData } from '../types';

const Clientes = () => {
  const { data: clientes, loading, error, createItem, updateItem, deleteItem } = useCrud<
    Cliente,
    ClienteFormData
  >(clienteService);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState<ClienteFormData>({
    nome: '',
    email: '',
    telefone: '',
  });

  const columns = [
    { key: 'nome', header: 'Nome' },
    { key: 'email', header: 'Email' },
    { key: 'telefone', header: 'Telefone' },
  ];

  const handleOpenModal = (cliente?: Cliente) => {
    if (cliente) {
      setEditingCliente(cliente);
      setFormData({
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
      });
    } else {
      setEditingCliente(null);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingCliente(null);
    setFormData({
      nome: '',
      email: '',
      telefone: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCliente) {
        await updateItem(editingCliente.id, formData);
      } else {
        await createItem(formData);
      }
      handleCloseModal();
    } catch (error) {
      alert('Erro ao salvar cliente');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await deleteItem(id);
      } catch (error) {
        alert('Erro ao excluir cliente');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="page">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h2>👥 Clientes</h2>
            <p className="page-subtitle">Gerencie seus clientes cadastrados</p>
          </div>
          <Link to="/" className="btn btn-secondary">
            ← Voltar ao Início
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <button
            className="btn btn-primary"
            onClick={() => handleOpenModal()}
            disabled={loading}
          >
            ➕ Novo Cliente
          </button>
          {loading && <span className="loading-text">Carregando...</span>}
        </div>
      </div>

      {error && <div className="error-message">❌ {error}</div>}

      <DataTable
        data={clientes}
        columns={columns}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        loading={loading}
      />

      <FormModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editingCliente ? '✏️ Editar Cliente' : '➕ Novo Cliente'}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            required
          />
        </div>
      </FormModal>
    </div>
  );
};

export default Clientes;