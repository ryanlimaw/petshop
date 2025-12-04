import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { useCrud } from '../hooks/useCrud';
import { servicoService } from '../services/servicoService';
import { clienteService } from '../services/clienteService';
import { petService } from '../services/petService';
import type { Servico, ServicoFormData, Cliente, Pet } from '../types';

const Servicos = () => {
  const { data: servicos, loading, error, createItem, updateItem, deleteItem } = useCrud<
    Servico,
    ServicoFormData
  >(servicoService);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [clientesLoading, setClientesLoading] = useState(false);
  const [petsLoading, setPetsLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingServico, setEditingServico] = useState<Servico | null>(null);
  const [formData, setFormData] = useState<ServicoFormData>({
    tipo: '',
    preco: 0,
    clienteId: 0,
    petId: undefined,
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

  const fetchPets = async (clienteId: number) => {
    setPetsLoading(true);
    try {
      const result = await petService.getAll();
      setPets(result.filter(pet => pet.clienteId === clienteId));
    } catch (error) {
      console.error('Erro ao carregar pets:', error);
      setPets([]);
    } finally {
      setPetsLoading(false);
    }
  };

  const columns = [
    { key: 'tipo', header: 'Tipo' },
    {
      key: 'preco',
      header: 'Preço',
      render: (value: number) => `R$ ${value.toFixed(2)}`
    },
    {
      key: 'cliente',
      header: 'Cliente',
      render: (_: any, servico: Servico) => servico.cliente?.nome || 'N/A'
    },
    {
      key: 'pet',
      header: 'Pet',
      render: (_: any, servico: Servico) => servico.pet?.nome || 'N/A'
    },
    {
      key: 'realizado',
      header: 'Status',
      render: (value: boolean) => value ? 'Realizado' : 'Pendente'
    },
  ];

  const handleOpenModal = (servico?: Servico) => {
    if (servico) {
      setEditingServico(servico);
      setFormData({
        tipo: servico.tipo,
        preco: servico.preco,
        clienteId: servico.clienteId,
        petId: servico.petId,
      });
      if (servico.clienteId) {
        fetchPets(servico.clienteId);
      }
    } else {
      setEditingServico(null);
      setFormData({
        tipo: '',
        preco: 0,
        clienteId: 0,
        petId: undefined,
      });
      setPets([]);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingServico(null);
    setFormData({
      tipo: '',
      preco: 0,
      clienteId: 0,
      petId: undefined,
    });
    setPets([]);
  };

  const handleClienteChange = async (clienteId: number) => {
    setFormData(prev => ({
      ...prev,
      clienteId,
      petId: undefined,
    }));
    if (clienteId > 0) {
      await fetchPets(clienteId);
    } else {
      setPets([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Preparar dados para envio, garantindo tipos corretos
      const dataToSend = {
        tipo: formData.tipo,
        preco: Number(formData.preco), // Garantir que seja number
        clienteId: Number(formData.clienteId),
        ...(formData.petId !== undefined && { petId: Number(formData.petId) })
      };

      console.log('Dados sendo enviados:', dataToSend);

      if (editingServico) {
        await updateItem(editingServico.id, dataToSend);
      } else {
        await createItem(dataToSend);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      alert('Erro ao salvar serviço');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await deleteItem(id);
      } catch (error) {
        alert('Erro ao excluir serviço');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? Number(value) :
                          name === 'petId' && value === '' ? undefined :
                          name === 'petId' && value !== '' ? Number(value) :
                          name === 'clienteId' ? Number(value) : value;

    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }));

    if (name === 'clienteId') {
      handleClienteChange(Number(value));
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h2>✂️ Serviços</h2>
            <p className="page-subtitle">Controle todos os serviços realizados</p>
          </div>
          <Link to="/" className="btn btn-secondary">
            ← Voltar ao Início
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <button
            className="btn btn-primary"
            onClick={() => handleOpenModal()}
            disabled={loading || clientesLoading}
          >
            ➕ Novo Serviço
          </button>
          {loading && <span className="loading-text">Carregando...</span>}
          {clientesLoading && <span className="loading-text">Carregando clientes...</span>}
        </div>
      </div>

      {error && <div className="error-message">❌ {error}</div>}

      <DataTable
        data={servicos}
        columns={columns}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        loading={loading}
      />

      <FormModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editingServico ? '✏️ Editar Serviço' : '➕ Novo Serviço'}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="tipo">Tipo:</label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="preco">Preço:</label>
          <input
            type="number"
            id="preco"
            name="preco"
            step="0.01"
            min="0"
            value={formData.preco}
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

        <div className="form-group">
          <label htmlFor="petId">Pet (opcional):</label>
          <select
            id="petId"
            name="petId"
            value={formData.petId || ''}
            onChange={handleInputChange}
            disabled={petsLoading || formData.clienteId === 0}
          >
            <option value="">Nenhum pet específico</option>
            {pets.map(pet => (
              <option key={pet.id} value={pet.id}>
                {pet.nome} ({pet.especie})
              </option>
            ))}
          </select>
        </div>
      </FormModal>
    </div>
  );
};

export default Servicos;
