import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export const useAccountsPayable = (clientId) => {
  const [accountsPayable, setAccountsPayable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAccountsPayable = async () => {
    if (!clientId) return;
    
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('accounts_payable')
        .select('*')
        .eq('supplier', clientId) // Assumindo que supplier é o ID do cliente
        .order('due_date', { ascending: true });

      if (error) throw error;

      setAccountsPayable(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar contas a pagar:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateAccountStatus = async (accountId, newStatus) => {
    try {
      const { error } = await supabase
        .from('accounts_payable')
        .update({ status: newStatus })
        .eq('id', accountId);

      if (error) throw error;

      // Atualizar o estado local
      setAccountsPayable(prev => 
        prev.map(account => 
          account.id === accountId 
            ? { ...account, status: newStatus }
            : account
        )
      );

      return true;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao atualizar status:', err);
      return false;
    }
  };

  const addNewAccount = async (accountData) => {
    try {
      const { data, error } = await supabase
        .from('accounts_payable')
        .insert([accountData])
        .select()
        .single();

      if (error) throw error;

      setAccountsPayable(prev => [...prev, data]);
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao adicionar conta:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchAccountsPayable();
  }, [clientId]);

  return {
    accountsPayable,
    loading,
    error,
    refreshData: fetchAccountsPayable,
    updateAccountStatus,
    addNewAccount
  };
};
