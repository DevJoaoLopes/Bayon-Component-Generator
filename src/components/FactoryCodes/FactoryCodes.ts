import type { ITypes } from './FactoryCodes.types';


const codeTsComponent = (nameComponent: string) => (
`import React from 'react';
import * as Styles from './${nameComponent}.styles'

export const ${nameComponent} = () => {
    return (
        <Styles.Container>
          <div></div>
        </Styles.Container>
    );
};
`
);


const codeStyleComponent = () => (
`import { styled } from '@bayon/commons';

export const Container = styled('div')(() => ({
  display: 'flex',
  boxSizing: 'border-box',
}));
`
);


const codeIndex = (nameComponent: string) => (
`export { ${nameComponent} } from './${nameComponent}';
`
);


const codeTestComponent = (nameComponent: string) => (
`import React from 'react';
import { render, screen } from '@bayon/testing';

import { ${nameComponent} } from './${nameComponent}';

describe('<${nameComponent} />', () => {
  it('should render component', () => {
    createComponent();
    expect(screen.getByText('')).toBeInTheDocument();
  });
});

const createComponent = (props = {}) => {
  const defaultProps = {
    ...props,
  };

  return render(<${nameComponent} {...defaultProps} />);
};
`
);




const getTemplates = (name: string, type: ITypes) => {
  const dictionaryTemplate = {
    'COMPONENT': codeTsComponent(name),
    'STYLES': codeStyleComponent(),
    'INDEX': codeIndex(name),
    'TEST': codeTestComponent(name)
  };

  return dictionaryTemplate[type];
};

export default getTemplates;