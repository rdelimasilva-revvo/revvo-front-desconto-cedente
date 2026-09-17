import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import Input from '../Common/Input';
import Button from '../Common/Button';
import Select from 'react-select';

const NovaAntecipacaoModal = ({ isOpen, onClose, notaFiscal }) => {
  // Estados dos campos principais
  const [cedente, setCedente] = useState({ razaoSocial: '', cnpj: '' });
  const [sacado, setSacado] = useState({ razaoSocial: '', cnpj: '' });
  const [valorNF, setValorNF] = useState('');
  const [chaveNFe, setChaveNFe] = useState('');
  const [domicilioPgto, setDomicilioPgto] = useState('');
  const [parcelas, setParcelas] = useState([
    { vencimento: '', valor: '' }
  ]);
  
  // Carregar dados da nota fiscal quando disponíveis
  useEffect(() => {
    if (notaFiscal) {
      // Preencher dados do cedente (distribuidor)
      setCedente({ 
        razaoSocial: 'Distribuidora Farmacêutica Nacional', 
        cnpj: '12.345.678/0001-90' 
      });
      
      // Preencher dados do sacado (farmácia)
      setSacado({ 
        razaoSocial: notaFiscal.fornecedor, 
        cnpj: '98.765.432/0001-10' 
      });
      
      // Preencher valor da NF
      setValorNF(notaFiscal.valor.toString());
      
      // Gerar chave NFe fictícia (em produção seria a chave real)
      setChaveNFe('12345678901234567890123456789012345678901234');
      
      // Configurar parcela com vencimento da nota
      setParcelas([{
        vencimento: notaFiscal.vencimento.split('T')[0], // Formato YYYY-MM-DD
        valor: notaFiscal.valor.toString()
      }]);
    }
  }, [notaFiscal]);

  // Handlers
  const handleCedenteChange = (e) => {
    setCedente({ ...cedente, [e.target.name]: e.target.value });
  };
  const handleSacadoChange = (e) => {
    setSacado({ ...sacado, [e.target.name]: e.target.value });
  };
  const handleParcelaChange = (idx, field, value) => {
    const novasParcelas = parcelas.map((p, i) =>
      i === idx ? { ...p, [field]: value } : p
    );
    setParcelas(novasParcelas);
  };
  const adicionarParcela = () => {
    setParcelas([...parcelas, { vencimento: '', valor: '' }]);
  };
  const removerParcela = (idx) => {
    setParcelas(parcelas.filter((_, i) => i !== idx));
  };

  // Validação simples para chave NFe
  const chaveNFeValida = chaveNFe.length === 44;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Antecipação">
      <form onSubmit={handleSubmit} style={{ padding: 24, minWidth: 320 }}>
        <h4 style={{ fontWeight: 700 }}>Cedente (Distribuidor)</h4>
        <div style={{ display: 'flex', gap: 12 }}>
          <Input
            label="Razão Social"
            name="razaoSocial"
            value={cedente.razaoSocial}
            onChange={handleCedenteChange}
            required
          />
          <Input
            label="CNPJ"
            name="cnpj"
            value={cedente.cnpj}
            onChange={handleCedenteChange}
            required
            maxLength={18}
            placeholder="00.000.000/0000-00"
          />
        </div>
        <h4 style={{ marginTop: 16, fontWeight: 700 }}>Sacado (Farmácia/Drogaria)</h4>
        <div style={{ display: 'flex', gap: 12 }}>
          <Input
            label="Razão Social"
            name="razaoSocial"
            value={sacado.razaoSocial}
            onChange={handleSacadoChange}
            required
          />
          <Input
            label="CNPJ"
            name="cnpj"
            value={sacado.cnpj}
            onChange={handleSacadoChange}
            required
            maxLength={18}
            placeholder="00.000.000/0000-00"
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <Input
            label="Valor da NF"
            type="number"
            name="valorNF"
            value={valorNF}
            onChange={e => setValorNF(e.target.value)}
            required
            min={0}
            step="0.01"
            placeholder="R$ 0,00"
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <label style={{ fontSize: 14, fontWeight: 700 }}>Parcelas</label>
          {parcelas.map((parcela, idx) => (
            <React.Fragment key={idx}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <Input
                  label="Vencimento"
                  name={`vencimento-${idx}`}
                  type="date"
                  value={parcela.vencimento}
                  onChange={e => handleParcelaChange(idx, 'vencimento', e.target.value)}
                  required
                  style={{ minWidth: 140 }}
                />
                <Input
                  label="Valor"
                  type="number"
                  name={`valor-${idx}`}
                  value={parcela.valor}
                  onChange={e => handleParcelaChange(idx, 'valor', e.target.value)}
                  required
                  min={0}
                  step="0.01"
                  style={{ minWidth: 120 }}
                />
                {parcelas.length > 1 && (
                  <Button type="button" variant="danger" onClick={() => removerParcela(idx)} style={{ minWidth: 32, padding: 0 }}>
                    &times;
                  </Button>
                )}
              </div>
            </React.Fragment>
          ))}
        <div style={{ marginBottom: 12 }}>
          <Button type="button" variant="secondary" onClick={adicionarParcela} style={{ marginTop: 4 }}>
            + Adicionar Parcela
          </Button>
        </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <Input
            label="Chave NF-e (44 posições)"
            name="chaveNFe"
            value={chaveNFe}
            onChange={e => setChaveNFe(e.target.value.replace(/\D/g, ''))}
            required
            maxLength={44}
            error={chaveNFe && !chaveNFeValida ? 'A chave deve ter 44 dígitos' : ''}
            placeholder="Somente números"
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 700 }}>Domicílio de Pagamento</label>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Select
              placeholder="Selecione o banco para recebimento..."
              options={[
                { value: 'itau', label: 'Itaú (341)' },
                { value: 'bradesco', label: 'Bradesco (237)' },
                { value: 'santander', label: 'Santander (033)' },
                { value: 'bb', label: 'Banco do Brasil (001)' },
                { value: 'caixa', label: 'Caixa Econômica Federal (104)' }
              ]}
              onChange={(option) => setDomicilioPgto(option.value)}
            />
          </div>
          
          <div style={{ marginTop: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 700 }}>Observações</label>
            <textarea
              style={{ 
                width: '100%', 
                minHeight: '80px', 
                padding: '8px', 
                borderRadius: '4px',
                border: '1px solid var(--border-color)'
              }}
              placeholder="Informações adicionais sobre esta antecipação..."
            />

          <div style={{ display: 'flex', gap: 12, marginBottom: 16, marginTop: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 14, fontWeight: 500, display: 'block', marginBottom: 4 }}>Agência</label>
              <input
                type="text"
                placeholder="0000"
                style={{ 
                  width: '100%', 
                  height: '40px',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 14, fontWeight: 500, display: 'block', marginBottom: 4 }}>Conta</label>
              <input
                type="text"
                placeholder="00000-0"
                style={{ 
                  width: '100%', 
                  height: '40px',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)'
                }}
              />
            </div>
          </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 24 }}>
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="primary" disabled={!chaveNFeValida}>Solicitar Antecipação</Button>
        </div>
      </form>
    </Modal>
  );
};

NovaAntecipacaoModal.defaultProps = {
  notaFiscal: null
};

export default NovaAntecipacaoModal; 