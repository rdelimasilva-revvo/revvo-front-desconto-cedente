import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  MagnifyingGlass,
  FunnelSimple,
  Download,
  Plus,
  CaretDown,
  FileText,
  TrendUp,
  Building,
  X
} from '@phosphor-icons/react';
import Modal from '../Common/Modal';

const Container = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  background: var(--background);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 24px;

  h1 {
    font-size: 28px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: var(--secondary-text);
  }
`;

const FiltersSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterHeader = styled.div`
  padding: 16px 24px;
  background: #F8F9FA;
  border-bottom: ${props => props.isOpen ? '1px solid var(--border-color)' : 'none'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  .left {
    display: flex;
    align-items: center;
    gap: 12px;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text);
      margin: 0;
    }
  }

  .icon {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const FilterContent = styled.div`
  padding: 24px;
  background: white;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const SearchBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;

  input {
    width: 100%;
    padding: 12px 12px 12px 40px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(0, 112, 242, 0.1);
    }

    &::placeholder {
      color: var(--secondary-text);
    }
  }

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--secondary-text);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;

    button {
      flex: 1;
    }
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  border: none;

  &.secondary {
    background: white;
    color: var(--primary-text);
    border: 1px solid var(--border-color);

    &:hover {
      background: var(--background);
    }
  }

  &.primary {
    background: var(--primary-blue);
    color: white;

    &:hover {
      background: #005ecf;
    }
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: var(--primary-blue);
  }

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text);
    margin: 0;
  }
`;

const CardContent = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const InvoiceItem = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8F9FA;
  }
`;

const InvoiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 16px;

  .supplier-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 4px;
  }

  .invoice-number {
    font-size: 14px;
    color: var(--secondary-text);
  }
`;

const InvoiceDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const DetailItem = styled.div`
  .label {
    font-size: 12px;
    color: var(--secondary-text);
    margin-bottom: 4px;
  }

  .value {
    font-size: 14px;
    color: var(--primary-text);
    font-weight: 500;
  }
`;

const InvoiceActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Badge = styled.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: #D1FAE5;
  color: #065F46;
`;

const RequestButton = styled.button`
  padding: 8px 16px;
  background: var(--primary-blue);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #005ecf;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: #F8F9FA;

    th {
      padding: 12px 16px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text);
      text-transform: uppercase;
      border-bottom: 1px solid var(--border-color);
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid var(--border-color);

      &:hover {
        background: #F8F9FA;
      }

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: 16px;
      font-size: 14px;
      color: var(--primary-text);
    }
  }
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

  &.pago {
    background: #D1FAE5;
    color: #065F46;
  }

  &.antecipada {
    background: #DBEAFE;
    color: #1E40AF;
  }
`;

const SupplierInfo = styled.div`
  .name {
    font-weight: 500;
    margin-bottom: 2px;
  }

  .code {
    font-size: 12px;
    color: var(--secondary-text);
  }
`;

const ModalContent = styled.div`
  padding: 24px;
`;

const CondicoesSection = styled.div`
  margin-bottom: 24px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 16px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  .label {
    font-size: 12px;
    color: var(--secondary-text);
    margin-bottom: 4px;
    text-transform: uppercase;
    font-weight: 500;
  }

  .value {
    font-size: 16px;
    color: var(--primary-text);
    font-weight: 600;
  }

  &.highlight {
    .value {
      color: var(--primary-blue);
      font-size: 20px;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border-color);
  margin: 20px 0;
`;

const CondicoesTexto = styled.div`
  background: #F8F9FA;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;

  p {
    font-size: 14px;
    color: var(--secondary-text);
    margin: 0 0 8px 0;
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: var(--primary-text);
    font-weight: 600;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;

  button {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &.cancel {
      background: white;
      color: var(--primary-text);
      border: 1px solid var(--border-color);

      &:hover {
        background: var(--background);
      }
    }

    &.confirm {
      background: var(--primary-blue);
      color: white;

      &:hover {
        background: #005ecf;
      }
    }
  }
`;

const Negociacoes = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedNota, setSelectedNota] = useState(null);

  // Dados mockados para Notas Fiscais Disponíveis
  const notasFiscais = [
    {
      id: 1,
      fornecedor: 'Parceiro de Ferragens LTDA',
      nf: 'NF-e 123456',
      emissao: '09/06/2024',
      vencimento: '14/07/2024',
      valor: 'R$ 45.000,00'
    },
    {
      id: 2,
      fornecedor: 'Parceiro de Ferragens LTDA',
      nf: 'NF-e 789012',
      emissao: '07/06/2024',
      vencimento: '09/07/2024',
      valor: 'R$ 27.500,00'
    },
    {
      id: 3,
      fornecedor: 'Parceiro de Ferragens LTDA',
      nf: 'NF-e 345678',
      emissao: '08/06/2024',
      vencimento: '10/07/2024',
      valor: 'R$ 32.800,00'
    },
    {
      id: 4,
      fornecedor: 'Parceiro de Ferragens LTDA',
      nf: 'NF-e 901234',
      emissao: '12/06/2024',
      vencimento: '17/07/2024',
      valor: 'R$ 65.000,00'
    },
    {
      id: 5,
      fornecedor: 'Global Health Suprimentos',
      nf: 'NF-e 567890',
      emissao: '10/06/2024',
      vencimento: '15/07/2024',
      valor: 'R$ 33.200,00'
    },
    {
      id: 6,
      fornecedor: 'Distribuidora Medicamentos Brasil',
      nf: 'NF-e 654321',
      emissao: '15/06/2024',
      vencimento: '20/07/2024',
      valor: 'R$ 52.800,00'
    },
    {
      id: 7,
      fornecedor: 'Pharma Suprimentos S.A.',
      nf: 'NF-e 112233',
      emissao: '11/06/2024',
      vencimento: '16/07/2024',
      valor: 'R$ 41.500,00'
    },
    {
      id: 8,
      fornecedor: 'Instrumental Cirúrgico Brasil',
      nf: 'NF-e 445566',
      emissao: '13/06/2024',
      vencimento: '18/07/2024',
      valor: 'R$ 38.900,00'
    },
    {
      id: 9,
      fornecedor: 'Distribuidora Farmacêutica Nacional',
      nf: 'NF-e 778899',
      emissao: '14/06/2024',
      vencimento: '19/07/2024',
      valor: 'R$ 56.200,00'
    },
    {
      id: 10,
      fornecedor: 'Distribuidora Saúde Total',
      nf: 'NF-e 998877',
      emissao: '16/06/2024',
      vencimento: '21/07/2024',
      valor: 'R$ 29.600,00'
    },
    {
      id: 11,
      fornecedor: 'Farmácia Popular Express',
      nf: 'NF-e 334455',
      emissao: '17/06/2024',
      vencimento: '22/07/2024',
      valor: 'R$ 48.700,00'
    },
    {
      id: 12,
      fornecedor: 'Drogaria São Lucas',
      nf: 'NF-e 223344',
      emissao: '18/06/2024',
      vencimento: '23/07/2024',
      valor: 'R$ 36.400,00'
    },
    {
      id: 13,
      fornecedor: 'Distribuidora Médica Express',
      nf: 'NF-e 556677',
      emissao: '19/06/2024',
      vencimento: '24/07/2024',
      valor: 'R$ 44.100,00'
    },
    {
      id: 14,
      fornecedor: 'Farmácia Central',
      nf: 'NF-e 889900',
      emissao: '20/06/2024',
      vencimento: '25/07/2024',
      valor: 'R$ 51.300,00'
    },
    {
      id: 15,
      fornecedor: 'Drogaria Pharma Plus',
      nf: 'NF-e 112244',
      emissao: '21/06/2024',
      vencimento: '26/07/2024',
      valor: 'R$ 37.500,00'
    },
    {
      id: 16,
      fornecedor: 'Suprimentos Hospitalares ABC',
      nf: 'NF-e 335566',
      emissao: '22/06/2024',
      vencimento: '27/07/2024',
      valor: 'R$ 59.800,00'
    },
    {
      id: 17,
      fornecedor: 'Farmácia Integrada',
      nf: 'NF-e 778800',
      emissao: '23/06/2024',
      vencimento: '28/07/2024',
      valor: 'R$ 42.900,00'
    },
    {
      id: 18,
      fornecedor: 'Drogaria Mais Saúde',
      nf: 'NF-e 990011',
      emissao: '24/06/2024',
      vencimento: '29/07/2024',
      valor: 'R$ 34.700,00'
    },
    {
      id: 19,
      fornecedor: 'Distribuidora Alpha Med',
      nf: 'NF-e 445577',
      emissao: '25/06/2024',
      vencimento: '30/07/2024',
      valor: 'R$ 47.200,00'
    },
    {
      id: 20,
      fornecedor: 'Farmácia Vitória',
      nf: 'NF-e 667788',
      emissao: '26/06/2024',
      vencimento: '31/07/2024',
      valor: 'R$ 39.600,00'
    }
  ];

  // Dados mockados para Operações Realizadas
  const operacoes = [
    {
      id: 1,
      operacao: '15/10/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0324 %',
      valor: 'R$ 52.400,00'
    },
    {
      id: 2,
      operacao: '14/10/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0718 %',
      valor: 'R$ 43.200,00'
    },
    {
      id: 3,
      operacao: '12/10/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.9870 %',
      valor: 'R$ 38.500,00'
    },
    {
      id: 4,
      operacao: '10/10/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.2000 %',
      valor: 'R$ 27.300,00'
    },
    {
      id: 5,
      operacao: '08/10/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.1904 %',
      valor: 'R$ 19.800,00'
    },
    {
      id: 6,
      operacao: '05/10/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.4951 %',
      valor: 'R$ 31.200,00'
    },
    {
      id: 7,
      operacao: '02/10/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.1250 %',
      valor: 'R$ 45.800,00'
    },
    {
      id: 8,
      operacao: '28/09/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.9550 %',
      valor: 'R$ 62.100,00'
    },
    {
      id: 9,
      operacao: '25/09/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0890 %',
      valor: 'R$ 35.600,00'
    },
    {
      id: 10,
      operacao: '20/09/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.3200 %',
      valor: 'R$ 28.900,00'
    },
    {
      id: 11,
      operacao: '18/09/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0150 %',
      valor: 'R$ 41.700,00'
    },
    {
      id: 12,
      operacao: '15/09/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.9920 %',
      valor: 'R$ 56.300,00'
    },
    {
      id: 13,
      operacao: '10/09/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.1580 %',
      valor: 'R$ 33.400,00'
    },
    {
      id: 14,
      operacao: '05/09/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.2450 %',
      valor: 'R$ 49.200,00'
    },
    {
      id: 15,
      operacao: '01/09/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.8750 %',
      valor: 'R$ 58.600,00'
    },
    {
      id: 16,
      operacao: '28/08/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0680 %',
      valor: 'R$ 37.500,00'
    },
    {
      id: 17,
      operacao: '25/08/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.1920 %',
      valor: 'R$ 44.100,00'
    },
    {
      id: 18,
      operacao: '20/08/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.9280 %',
      valor: 'R$ 51.800,00'
    },
    {
      id: 19,
      operacao: '15/08/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.3500 %',
      valor: 'R$ 29.700,00'
    },
    {
      id: 20,
      operacao: '10/08/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0420 %',
      valor: 'R$ 47.900,00'
    },
    {
      id: 21,
      operacao: '05/08/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.9850 %',
      valor: 'R$ 51.200,00'
    },
    {
      id: 22,
      operacao: '01/08/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.1250 %',
      valor: 'R$ 39.700,00'
    },
    {
      id: 23,
      operacao: '28/07/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0590 %',
      valor: 'R$ 44.800,00'
    },
    {
      id: 24,
      operacao: '25/07/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.9320 %',
      valor: 'R$ 57.600,00'
    },
    {
      id: 25,
      operacao: '20/07/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.1780 %',
      valor: 'R$ 36.900,00'
    },
    {
      id: 26,
      operacao: '15/07/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0220 %',
      valor: 'R$ 48.300,00'
    },
    {
      id: 27,
      operacao: '10/07/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.8950 %',
      valor: 'R$ 61.400,00'
    },
    {
      id: 28,
      operacao: '05/07/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.1450 %',
      valor: 'R$ 42.100,00'
    },
    {
      id: 29,
      operacao: '01/07/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0780 %',
      valor: 'R$ 38.600,00'
    },
    {
      id: 30,
      operacao: '28/06/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.9680 %',
      valor: 'R$ 53.900,00'
    },
    {
      id: 31,
      operacao: '25/06/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.2150 %',
      valor: 'R$ 34.200,00'
    },
    {
      id: 32,
      operacao: '20/06/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0350 %',
      valor: 'R$ 46.700,00'
    },
    {
      id: 33,
      operacao: '15/06/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.9120 %',
      valor: 'R$ 59.800,00'
    },
    {
      id: 34,
      operacao: '10/06/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.1650 %',
      valor: 'R$ 40.500,00'
    },
    {
      id: 35,
      operacao: '05/06/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0890 %',
      valor: 'R$ 35.300,00'
    },
    {
      id: 36,
      operacao: '01/06/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.9450 %',
      valor: 'R$ 55.100,00'
    },
    {
      id: 37,
      operacao: '28/05/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.2280 %',
      valor: 'R$ 32.800,00'
    },
    {
      id: 38,
      operacao: '25/05/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0520 %',
      valor: 'R$ 43.600,00'
    },
    {
      id: 39,
      operacao: '20/05/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.8780 %',
      valor: 'R$ 62.500,00'
    },
    {
      id: 40,
      operacao: '15/05/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.1320 %',
      valor: 'R$ 41.900,00'
    },
    {
      id: 41,
      operacao: '10/05/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0650 %',
      valor: 'R$ 37.400,00'
    },
    {
      id: 42,
      operacao: '05/05/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.9580 %',
      valor: 'R$ 52.700,00'
    },
    {
      id: 43,
      operacao: '01/05/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.1980 %',
      valor: 'R$ 33.500,00'
    },
    {
      id: 44,
      operacao: '28/04/2024',
      status: 'PAGO',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '1.0180 %',
      valor: 'R$ 49.800,00'
    },
    {
      id: 45,
      operacao: '25/04/2024',
      status: 'ANTECIPADA',
      ancora: 'Raia Drogasil S.A.',
      codigo: '07.401.436/0001-31',
      taxaMedia: '0.9240 %',
      valor: 'R$ 58.300,00'
    }
  ];

  const handleSolicitarAntecipacao = (nota) => {
    setSelectedNota(nota);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNota(null);
  };

  const handleConfirmarSolicitacao = () => {
    // Aqui você pode adicionar a lógica para confirmar a solicitação
    console.log('Solicitação confirmada para:', selectedNota);
    handleCloseModal();
    // Abrir modal de sucesso
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setSelectedNota(null);
  };

  return (
    <Container>
      <PageHeader>
        <h1>Negociações</h1>
        <p>Controle todas as operações da sua empresa</p>
      </PageHeader>

      <FiltersSection>
        <FilterHeader
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          isOpen={isFilterOpen}
        >
          <div className="left">
            <FunnelSimple size={20} />
            <h3>Filtros</h3>
          </div>
          <CaretDown size={20} className="icon" />
        </FilterHeader>
        <FilterContent isOpen={isFilterOpen}>
          {/* Aqui você pode adicionar filtros específicos no futuro */}
          <p style={{ color: 'var(--secondary-text)', margin: 0 }}>
            Filtros adicionais podem ser configurados aqui
          </p>
        </FilterContent>
      </FiltersSection>

      <SearchBar>
        <SearchInput>
          <MagnifyingGlass size={20} />
          <input
            type="text"
            placeholder="Filtre por CNPJ ou nome do Âncora"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        <ActionButtons>
          <Button className="secondary">
            <Download size={18} />
            Exportar
          </Button>
          <Button className="primary">
            <Plus size={18} />
            Nova Antecipação
          </Button>
        </ActionButtons>
      </SearchBar>

      <CardsContainer>
        <Card>
          <CardHeader>
            <FileText size={24} />
            <h2>Notas Fiscais Disponíveis</h2>
          </CardHeader>
          <CardContent>
            {notasFiscais.map(nota => (
              <InvoiceItem key={nota.id}>
                <InvoiceHeader>
                  <div>
                    <div className="supplier-name">{nota.fornecedor}</div>
                    <div className="invoice-number">{nota.nf}</div>
                  </div>
                </InvoiceHeader>
                <InvoiceDetails>
                  <DetailItem>
                    <div className="label">Emissão</div>
                    <div className="value">{nota.emissao}</div>
                  </DetailItem>
                  <DetailItem>
                    <div className="label">Vencimento</div>
                    <div className="value">{nota.vencimento}</div>
                  </DetailItem>
                  <DetailItem>
                    <div className="label">Valor</div>
                    <div className="value">{nota.valor}</div>
                  </DetailItem>
                </InvoiceDetails>
                <InvoiceActions>
                  <Badge>Disponível para Antecipação</Badge>
                  <RequestButton onClick={() => handleSolicitarAntecipacao(nota)}>
                    Solicitar Antecipação
                  </RequestButton>
                </InvoiceActions>
              </InvoiceItem>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <TrendUp size={24} />
            <h2>Operações Realizadas</h2>
          </CardHeader>
          <CardContent>
            <Table>
              <thead>
                <tr>
                  <th>Operação</th>
                  <th>Âncora</th>
                  <th>Taxa Média</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {operacoes.map(op => (
                  <tr key={op.id}>
                    <td>
                      <StatusBadge className={op.status.toLowerCase()}>
                        {op.status}
                      </StatusBadge>
                      <div style={{ fontSize: '12px', color: 'var(--secondary-text)', marginTop: '4px' }}>
                        {op.operacao}
                      </div>
                    </td>
                    <td>
                      <SupplierInfo>
                        <div className="name">{op.ancora}</div>
                        <div className="code">{op.codigo}</div>
                      </SupplierInfo>
                    </td>
                    <td>{op.taxaMedia}</td>
                    <td style={{ fontWeight: '600' }}>{op.valor}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      </CardsContainer>

      {/* Modal de Condições */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Condições da Antecipação"
      >
        <ModalContent>
          {selectedNota && (
            <>
              <CondicoesSection>
                <h3>Informações da Nota Fiscal</h3>
                <InfoGrid>
                  <InfoItem>
                    <div className="label">Fornecedor</div>
                    <div className="value">{selectedNota.fornecedor}</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Número da NF</div>
                    <div className="value">{selectedNota.nf}</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Data de Emissão</div>
                    <div className="value">{selectedNota.emissao}</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Data de Vencimento</div>
                    <div className="value">{selectedNota.vencimento}</div>
                  </InfoItem>
                  <InfoItem className="highlight">
                    <div className="label">Valor da Nota</div>
                    <div className="value">{selectedNota.valor}</div>
                  </InfoItem>
                </InfoGrid>
              </CondicoesSection>

              <Divider />

              <CondicoesSection>
                <h3>Condições de Antecipação</h3>
                <InfoGrid>
                  <InfoItem>
                    <div className="label">Taxa de Desconto</div>
                    <div className="value">1,05% a.m.</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Dias até o Vencimento</div>
                    <div className="value">35 dias</div>
                  </InfoItem>
                  <InfoItem className="highlight">
                    <div className="label">Valor Líquido a Receber</div>
                    <div className="value">R$ 43.785,00</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Desconto Total</div>
                    <div className="value">R$ 1.215,00</div>
                  </InfoItem>
                </InfoGrid>

                <CondicoesTexto>
                  <p>
                    <strong>Âncora:</strong> Raia Drogasil S.A. (CNPJ: 07.401.436/0001-31)
                  </p>
                  <p>
                    <strong>Prazo de Liquidação:</strong> O valor será creditado em até 2 dias úteis após a aprovação da solicitação.
                  </p>
                  <p>
                    <strong>Observações:</strong> A taxa de desconto pode variar de acordo com o prazo até o vencimento e o histórico de relacionamento com o âncora.
                  </p>
                </CondicoesTexto>
              </CondicoesSection>

              <ModalActions>
                <button className="cancel" onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button className="confirm" onClick={handleConfirmarSolicitacao}>
                  Confirmar Solicitação
                </button>
              </ModalActions>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal de Sucesso */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        title="Solicitação Confirmada com Sucesso!"
      >
        <ModalContent>
          <CondicoesSection>
            <div style={{
              textAlign: 'center',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11L12 14L22 4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#22c55e',
                  marginBottom: '12px'
                }}>
                  Antecipação Solicitada!
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: 'var(--secondary-text)',
                  lineHeight: '1.6',
                  marginBottom: '24px'
                }}>
                  Sua solicitação de antecipação foi registrada com sucesso e está sendo processada.
                </p>
              </div>

              <div style={{
                width: '100%',
                padding: '20px',
                background: 'rgba(59, 130, 246, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <FileText size={24} color="#3b82f6" weight="fill" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'var(--primary-text)',
                      marginBottom: '8px'
                    }}>
                      Termo de Cessão
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--secondary-text)',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      O <strong>Termo de Cessão</strong> será gerado e disponibilizado em breve na aba "Formalização".
                      Você receberá uma notificação assim que o documento estiver pronto para assinatura.
                    </p>
                  </div>
                </div>
              </div>

              {selectedNota && (
                <div style={{
                  width: '100%',
                  padding: '16px',
                  background: 'var(--background)',
                  borderRadius: '8px',
                  textAlign: 'left'
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--secondary-text)',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Resumo da Solicitação
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px'
                  }}>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--secondary-text)', marginBottom: '4px' }}>
                        Nota Fiscal
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary-text)' }}>
                        {selectedNota.nf}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--secondary-text)', marginBottom: '4px' }}>
                        Valor
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary-text)' }}>
                        {selectedNota.valor}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--secondary-text)', marginBottom: '4px' }}>
                        Fornecedor
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary-text)' }}>
                        {selectedNota.fornecedor}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--secondary-text)', marginBottom: '4px' }}>
                        Vencimento
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary-text)' }}>
                        {selectedNota.vencimento}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CondicoesSection>

          <ModalActions>
            <button className="confirm" onClick={handleCloseSuccessModal} style={{ width: '100%' }}>
              Entendi
            </button>
          </ModalActions>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Negociacoes;
