import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import './TransactionForm.css';

const INITIAL_VALUES = { descricao: '', valor: '', tipo: 'Entrada', categoria: '' };

function TransactionForm({ onAdd }) {
  const [formData, setFormData] = useState(INITIAL_VALUES);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit() {
    onAdd({ ...formData, valor: Number(formData.valor), id: uuidv4() });
    setFormData(INITIAL_VALUES);
  }

  const isInvalid = !formData.descricao || !formData.valor || !formData.categoria || Number(formData.valor) <= 0;

  return (
    <form className="transaction-form">
      <input
        name="descricao"
        placeholder="Descrição"
        value={formData.descricao}
        onChange={handleChange}
      />
      <input
        name="valor"
        type="number"
        placeholder="Valor"
        value={formData.valor}
        onChange={handleChange}
        min="0"
      />
      <select name="tipo" value={formData.tipo} onChange={handleChange}>
        <option value="Entrada">Entrada</option>
        <option value="Saída">Saída</option>
      </select>
      <select name="categoria" value={formData.categoria} onChange={handleChange}>
        <option value="">Selecione uma categoria</option>
        <option value="Salário">Salário</option>
        <option value="Alimentação">Alimentação</option>
        <option value="Aluguel">Aluguel</option>
        <option value="Lazer">Lazer</option>
        <option value="Outros">Outros</option>
      </select>
      <button disabled={isInvalid} onClick={handleSubmit} type="button">
        Adicionar
      </button>
    </form>
  );
}

TransactionForm.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default TransactionForm;
