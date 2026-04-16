import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TransactionForm from './components/TransactionForm/TransactionForm';
import TransactionCard from './components/TransactionCard/TransactionCard';
import DashboardFinancas from './components/DashboardFinancas/DashboardFinancas';

function App() {
  const [transacoes, setTransacoes] = useState(() => {
    const dadosSalvos = localStorage.getItem('transacoes');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const [darkMode, setDarkMode] = useState(true);
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
  }, [transacoes]);

  const totalEntradas = transacoes
    .filter(t => t.tipo === 'Entrada')
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const totalSaidas = transacoes
    .filter(t => t.tipo === 'Saída')
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const saldo = totalEntradas - totalSaidas;

  function adicionarTransacao(novaTransacao) {
    setTransacoes([...transacoes, novaTransacao]);
  }

  function deletarTransacao(id) {
    setTransacoes(transacoes.filter(t => t.id !== id));
  }

  const transacoesFiltradas = transacoes.filter(t => {
    if (filtro === 'Todos') return true;
    return t.tipo === filtro;
  });

  return (
    <div className={darkMode ? 'App dark' : 'App light'}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container">
      <TransactionForm onAdd={adicionarTransacao} />
      <DashboardFinancas saldo={saldo} transacoes={transacoes} />
      <div className="filtros">
        <button onClick={() => setFiltro('Todos')}>Todos</button>
        <button onClick={() => setFiltro('Entrada')}>Receitas</button>
        <button onClick={() => setFiltro('Saída')}>Despesas</button>
      </div>
      <div className="lista-transacoes">
        {transacoesFiltradas.length > 0 && (
          <div className="lista-header">
            <span>Descrição</span>
            <span>Categoria</span>
            <span>Valor</span>
            <span></span>
          </div>
        )}
        {transacoesFiltradas.map(t => (
          <TransactionCard
            key={t.id}
            id={t.id}
            descricao={t.descricao}
            valor={t.valor}
            tipo={t.tipo}
            categoria={t.categoria}
            onDelete={deletarTransacao}
          />
        ))}
      </div>
      </div>
    </div>
  );
}

export default App;
