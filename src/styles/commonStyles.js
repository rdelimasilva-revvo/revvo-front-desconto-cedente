import styled from 'styled-components';

// Padrão de PageHeader para todos os componentes
export const PageHeader = styled.div`
  margin-bottom: 24px;

  h1 {
    font-size: 24px;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: var(--secondary-text);
  }
`;

// Padrão de Container para todos os componentes
export const Container = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

// Padrão de SectionTitle (subtítulos dentro das páginas)
export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 16px;
`;

// Padrão de Card Title
export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-text);
`;

// Padrão de Label
export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: var(--primary-text);
`;

// Padrão de Body Text
export const BodyText = styled.p`
  font-size: 14px;
  color: var(--primary-text);
`;

// Padrão de Small Text
export const SmallText = styled.span`
  font-size: 12px;
  color: var(--secondary-text);
`;
