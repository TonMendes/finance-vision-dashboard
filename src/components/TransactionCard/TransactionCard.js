import PropTypes from 'prop-types';
import './TransactionCard.css';

function TransactionCard({ id, descricao, valor, tipo, categoria, onDelete }) {
  const estiloValor = {
    color: tipo === 'Entrada' ? '#2ecc71' : '#e74c3c',
    fontWeight: 'bold'
  };

  return (
    <div className="transaction-card">
      <span>{descricao}</span>
      <span className="categoria">{categoria}</span>
      <span style={estiloValor}>
        {tipo === 'Entrada' ? '+ ' : '- '} R$ {Number(valor).toFixed(2)}
      </span>
      <button className="delete-btn" onClick={() => onDelete(id)}>X</button>
    </div>
  );
}

TransactionCard.propTypes = {
  id: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  tipo: PropTypes.string.isRequired,
  categoria: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TransactionCard;
