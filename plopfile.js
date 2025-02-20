module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Generate a React component with SCSS module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
      },
      {
        type: 'input',
        name: 'path',
        message:
          'Component folder path (relative to src/components, leave empty for root):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{path}}/{{kebabCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{path}}/{{pascalCase name}}/{{pascalCase name}}.module.scss',
        templateFile: 'plop-templates/styles.module.scss.hbs',
      },
    ],
  });
};
