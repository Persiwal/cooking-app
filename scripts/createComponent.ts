//example of use 
//npm run create-component ExampleComponent src/app/_components/ui

const fs = require('fs');
const path = require('path');

function createComponentFiles() {
    const componentName = process.argv[2];
    const targetPath = process.argv[3];
    const componentDirectory = path.join(process.cwd() + "/" + targetPath, componentName);

    if (!fs.existsSync(componentDirectory)) {
        fs.mkdirSync(componentDirectory);
    } else {
        console.error(`Component '${componentName}' already exists.`);
        return;
    }

    // Generate the component file (ExampleComponent.tsx)
    const componentContent = `
import styles from './${componentName}.module.css';

export type Props = {
  sampleTextProp: string;
}

const ${componentName}: React.FC<Props> = ({
  sampleTextProp,
}) => {
  return <div className={styles.container}>{sampleTextProp}</div>;
};

export default ${componentName};
`;

    fs.writeFileSync(path.join(componentDirectory, `${componentName}.tsx`), componentContent);

    // Generate the mock file (ExampleComponent.mock.ts)
    const mockContent = `
    import { Props } from './${componentName}';
    
    const base: Props = {
        sampleTextProp: 'Hello world!',
    };

    export const mock${componentName}Props = {
        base,
    };
    `;

    fs.writeFileSync(path.join(componentDirectory, `${componentName}.mocks.ts`), mockContent);

    // Generate the test file (ExampleComponent.test.ts)
    const testContent = `
    import '@testing-library/jest-dom';
    import { render, screen } from '@testing-library/react';
    import ${componentName} from './${componentName}';
    import { mock${componentName}Props } from './${componentName}.mocks';

    describe('Base client template component', () => {
    it('Should render properly', () => {
        render(<${componentName} {...mock${componentName}Props.base} />);

        const div = screen.getByText(mock${componentName}Props.base.sampleTextProp);

        expect(div).toHaveTextContent(mock${componentName}Props.base.sampleTextProp);
    });
    });
    `;

    fs.writeFileSync(path.join(componentDirectory, `${componentName}.test.tsx`), testContent);

    // Generate the stylesheet file (ExampleComponent.module.scss)
    fs.writeFileSync(path.join(componentDirectory, `${componentName}.module.scss`), '');

    console.log(`Component '${componentName}' has been created.`);
}

const componentName = process.argv[2];
const componentPath = process.argv[3];

if (!componentName) {
    console.error('Please provide a component name.');
} else if (!componentPath) {
    console.error("Please provide component path")
} else {
    createComponentFiles();
}
