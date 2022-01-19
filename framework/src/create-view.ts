import { Framework, View } from './types';

export const createView = (appName: string, framework: Framework) => {
  let props: { [key: string]: any } = {};

  const view: View = {
    setProps: (updated: { [key: string]: any }) => {
      props = {
        ...props,
        ...updated,
      };
    },
    render: () => {
      framework.renderApp(appName);
    },
    invoke: (command: string, args?: any) => {
      if (command === 'render') {
        view.render();
        // framework.renderApp(config.name);
      } else if (command === 'setProps') {
        view.setProps(args);
      }
    },
    props,
  };

  return view;
};
