import { render, screen } from '@testing-library/react';
import CardLocation from './cardLocation';

describe('CardLocation component', () => {
  const mockProps = {
    imageUrl: 'https://example.com/image.jpg',
    locationName: 'Espaço Jardim',
    date: '27 de Setembro de 2025',
    mapsEmbedUrl: 'https://maps.google.com/embed?pb=mock-maps-url',
  };

  it('deve renderizar o nome do local', () => {
    render(<CardLocation {...mockProps} />);
    expect(screen.getByText(mockProps.locationName)).toBeInTheDocument();
  });

  it('deve renderizar a data', () => {
    render(<CardLocation {...mockProps} />);
    expect(screen.getByText(mockProps.date)).toBeInTheDocument();
  });

  it('deve renderizar a imagem com o alt correto', () => {
    render(<CardLocation {...mockProps} />);
    const image = screen.getByAltText(mockProps.locationName);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProps.imageUrl);
  });

  it('deve renderizar o iframe com o src correto', () => {
    render(<CardLocation {...mockProps} />);
    const iframe = screen.getByTitle('mapa-localizacao');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', mockProps.mapsEmbedUrl);
  });
});
