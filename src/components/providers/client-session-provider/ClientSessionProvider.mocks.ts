import { Props } from './ClientSessionProvider';

const base: Omit<Props, 'children'> = {
  session: { name: 'John Doe' },
};

export const mockBaseTemplateProps = {
  base,
};
