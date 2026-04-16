import PropTypes from 'prop-types';
import { Doughnut, Bar } from 'react-chartjs-2';
import './DashboardFinancas.css';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function DashboardFinancas({ saldo, transacoes }) {
  const despesas = transacoes.filter(t => t.tipo === 'Saída');

  const agruparPorCategoria = (lista) => {
    return lista.reduce((acumulador, item) => {
      const cat = item.categoria;
      const val = Number(item.valor);
      acumulador[cat] = (acumulador[cat] || 0) + val;
      return acumulador;
    }, {});
  };

  const totais = agruparPorCategoria(despesas);
  const labelsGrafico = Object.keys(totais);
  const dadosGrafico = Object.values(totais);

  const dataRosca = {
    labels: labelsGrafico,
    datasets: [{
      data: dadosGrafico,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  };

  const totalEntradas = transacoes
    .filter(t => t.tipo === 'Entrada')
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const totalSaidas = transacoes
    .filter(t => t.tipo === 'Saída')
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const dataBarras = {
    labels: ['Entradas', 'Saídas'],
    datasets: [{
      label: 'Fluxo de Caixa',
      data: [totalEntradas, totalSaidas],
      backgroundColor: ['#2ecc71', '#e74c3c']
    }]
  };

  return (
    <div className="dashboard">
      <div className="resumo">
        <div className="resumo-item entradas">
          <span>Entradas</span>
          <strong>R$ {totalEntradas.toFixed(2)}</strong>
        </div>
        <div className="resumo-item saldo">
          <span>Saldo</span>
          <strong>R$ {saldo.toFixed(2)}</strong>
        </div>
        <div className="resumo-item saidas">
          <span>Saídas</span>
          <strong>R$ {totalSaidas.toFixed(2)}</strong>
        </div>
      </div>
      <div className="graficos">
        {labelsGrafico.length > 0 && (
          <div className="grafico-item">
            <h3>Despesas por Categoria</h3>
            <div className="grafico-canvas">
              <Doughnut data={dataRosca} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        )}
        <div className="grafico-item">
          <h3>Entradas vs Saídas</h3>
          <div className="grafico-canvas">
            <Bar data={dataBarras} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardFinancas.propTypes = {
  saldo: PropTypes.number.isRequired,
  transacoes: PropTypes.array.isRequired
};

export default DashboardFinancas;
