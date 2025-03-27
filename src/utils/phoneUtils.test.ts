import { formatPhone, cleanPhone } from './phoneUtils';

describe('phoneUtils', () => {
  describe('formatPhone', () => {
    it('deve formatar um número completo corretamente', () => {
      const input = '11999999999';
      const expected = '(11) 99999-9999';
      expect(formatPhone(input)).toBe(expected);
    });

    it('deve formatar parcialmente se número incompleto', () => {
      expect(formatPhone('11')).toBe('11');
      expect(formatPhone('119')).toBe('(11) 9');
      expect(formatPhone('1199')).toBe('(11) 99');
    });

    it('deve limitar a 15 caracteres no total', () => {
      const input = '119999999999999'; // muito longo
      const formatted = formatPhone(input);
      expect(formatted.length).toBeLessThanOrEqual(15);
    });

    it('deve retornar string vazia se input for vazio', () => {
      expect(formatPhone('')).toBe('');
    });
  });

  describe('cleanPhone', () => {
    it('deve remover máscara e retornar apenas os números', () => {
      const masked = '(11) 99999-9999';
      expect(cleanPhone(masked)).toBe('11999999999');
    });

    it('deve retornar string vazia se input for vazio', () => {
      expect(cleanPhone('')).toBe('');
    });

    it('deve remover qualquer caractere não numérico', () => {
      const input = 'Tel: (11) 9.9999-9999';
      expect(cleanPhone(input)).toBe('11999999999');
    });
  });
});
