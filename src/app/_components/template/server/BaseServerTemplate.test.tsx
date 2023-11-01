import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BaseServerTemplate from './BaseServerTemplate';
import { mockBaseTemplateProps } from './BaseServerTemplate.mocks';

describe('Base Server template component', () => {
  it('Should render properly', () => {
    render(<BaseServerTemplate {...mockBaseTemplateProps.base} />);

    const div = screen.getByText(mockBaseTemplateProps.base.sampleTextProp);

    expect(div).toHaveTextContent(mockBaseTemplateProps.base.sampleTextProp);
  });
});
