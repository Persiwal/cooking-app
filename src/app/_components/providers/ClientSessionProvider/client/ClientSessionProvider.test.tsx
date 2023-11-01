import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ClientSessionProvider from './ClientSessionProvider';
import { mockBaseTemplateProps } from './ClientSessionProvider.mocks';

describe('Base client template component', () => {
  it('Should render properly', () => {
    render(
      <ClientSessionProvider {...mockBaseTemplateProps.base}>
        <div>Child component</div>
      </ClientSessionProvider>);

    const div = screen.getByText("Child component");

    expect(div).toHaveTextContent("Child component");
  });
});
