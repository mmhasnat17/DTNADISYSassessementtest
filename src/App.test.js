import { getByTestId, render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/AGAAA/);
  expect(linkElement).toBeInTheDocument();
});

it("testing the input field",()=>{
  const input=document.getElementsByTagName('input').val;
  expect(input=="");
})
