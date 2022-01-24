import { createEventManager } from './events';
import { Framework, View, ViewProps } from './types';

export const createView = (
  appName: string,
  framework: Framework,
  initialProps: ViewProps
) => {
  let props: ViewProps = initialProps;
  const events = createEventManager();

  const view: View = {
    setProps: (updated: { [key: string]: any }) => {
      props = {
        ...props,
        ...updated,
      };
      events.dispatch('updated', { props });
    },
    onUpdate: (fn) => {
      view.events.subscribe('updated', (data: any) => {
        fn(data);
      });
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
    props: () => props,
    events,
  };

  return view;
};
