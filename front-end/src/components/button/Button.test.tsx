import 'jest-styled-components';
import { Button } from './Button.component';
import { render } from '@testing-library/react';

describe('Button', () => {
  it('should render with correct styles', async () => {
    const tree = render(<Button>Test</Button>);
    const button = tree.getByText('Test');
    expect(button).toHaveStyleRule('background-color', 'rgb(212 212 216)');
    expect(button).toHaveStyleRule('color', 'rgb(55 65 81)');
    expect(button).toHaveStyleRule('padding', '0.5rem 1rem');
    expect(button).toHaveStyleRule('text-transform', 'uppercase');
    expect(button).toHaveStyleRule('background-color', 'rgb(228 228 231)', { modifier: ':hover' });
  });
});
