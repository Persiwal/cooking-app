import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BaseClientTemplate from './BaseClientTemplate';
import { mockBaseTemplateProps } from './BaseClientTemplate.mocks';

describe('Base client template component', () => {
  it('Should render properly', () => {
    render(<BaseClientTemplate {...mockBaseTemplateProps.base} />);

    const div = screen.getByText(mockBaseTemplateProps.base.sampleTextProp);

    expect(div).toHaveTextContent(mockBaseTemplateProps.base.sampleTextProp);
  });
});
