// SolicitacoesContext.js
import React, { createContext, useContext, useState } from 'react';

const SolicitacoesContext = createContext();

export const SolicitacoesProvider = ({ children }) => {
  const [temSolicitacoesPendentes, setTemSolicitacoesPendentes] = useState(false);

  const setSolicitacoesPendentes = (value) => {
    setTemSolicitacoesPendentes(value);
  };

  return (
    <SolicitacoesContext.Provider value={{ temSolicitacoesPendentes, setSolicitacoesPendentes }}>
      {children}
    </SolicitacoesContext.Provider>
  );
};

export const useSolicitacoes = () => {
  const context = useContext(SolicitacoesContext);
  if (!context) {
    throw new Error('useSolicitacoes deve ser usado dentro de um SolicitacoesProvider');
  }
  return context;
};