import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { useCrud } from '../hooks/useCrud';
import { petService } from '../services/petService';
import { clienteService } from '../services/clienteService';
import type { Pet, PetFormData, Cliente } from '../types';

const Pets = () => {
  const { data: pets, loading, error, createItem, updateItem, deleteItem } = useCrud<
    Pet,
    PetFormData
  >(petService);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesLoading, setClientesLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [formData, setFormData] = useState<PetFormData>({
    nome: '',
    especie: '',
    clienteId: 0,
  });

  useEffect(() => {
    const fetchClientes = async () => {
      setClientesLoading(true);
      try {
        const result = await clienteService.getAll();
        setClientes(result);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      } finally {
        setClientesLoading(false);
      }
    };
    fetchClientes();
  }, []);

  const columns = [
    { key: 'nome', header: 'Nome' },
    { key: 'especie', header: 'Espécie' },
    {
      key: 'cliente',
      header: 'Cliente',
      render: (_: any, pet: Pet) => pet.cliente?.nome || 'N/A'
    },
  ];

  const handleOpenModal = (pet?: Pet) => {
    if (pet) {
      setEditingPet(pet);
      setFormData({
        nome: pet.nome,
        especie: pet.especie,
        clienteId: pet.clienteId,
      });
    } else {
      setEditingPet(null);
      setFormData({
        nome: '',
        especie: '',
        clienteId: 0,
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingPet(null);
    setFormData({
      nome: '',
      especie: '',
      clienteId: 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPet) {
        await updateItem(editingPet.id, formData);
      } else {
        await createItem(formData);
      }
      handleCloseModal();
    } catch (error) {
      alert('Erro ao salvar pet');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este pet?')) {
      try {
        await deleteItem(id);
      } catch (error) {
        alert('Erro ao excluir pet');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'clienteId' ? Number(value) : value,
    }));
  };

  return (
    <div className="page">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Pets</h2>
          <Link to="/" className="btn btn-secondary" style={{ marginRight: '10px' }}>
            ← Voltar
          </Link>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => handleOpenModal()}
        >
          Novo Pet
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <DataTable
        data={pets}
        columns={columns}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        loading={loading}
      />

      <FormModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editingPet ? 'Editar Pet' : 'Novo Pet'}
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
          <label htmlFor="especie">Espécie:</label>
          <input
            type="text"
            id="especie"
            name="especie"
            value={formData.especie}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="clienteId">Cliente:</label>
          <select
            id="clienteId"
            name="clienteId"
            value={formData.clienteId}
            onChange={handleInputChange}
            required
            disabled={clientesLoading}
          >
            <option value={0}>Selecione um cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>
      </FormModal>
    </div>
  );
};

export default Pets;
