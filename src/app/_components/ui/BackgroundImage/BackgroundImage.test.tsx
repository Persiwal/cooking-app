import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import BackgroundImage from './BackgroundImage';
import { mockBackgroundImageProps } from './BackgroundImage.mocks';

describe('BackgroundImage', () => {
    const { img } = mockBackgroundImageProps.base

    it('should render the component with the provided image', () => {
        const { getByAltText } = render(<BackgroundImage img={img} />);

        const imageElement = getByAltText('');


        expect(imageElement).toBeInTheDocument();
        // expect(imageElement).toHaveAttribute('src', img);
    });
});

