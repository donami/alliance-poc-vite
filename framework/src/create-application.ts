import { createView } from './create-view';
import { AppConfiguration, AppContext, CapabilityResponse } from './types';

export const createApplication = (
  config: AppConfiguration,
  _app: any,
  framework: any
) => {
  let renderFn = (elem: HTMLElement) => {};

  const appContext: AppContext = {
    config,
    framework,
    dispatch: (key, data) => {
      framework.events.dispatch(key, data);
    },
    createView: (fn) => {
      renderFn = (elem: HTMLElement) => {
        fn(elem);
      };

      const view = createView(config.name, framework);

      return view;
      // return (command: string, args?: any) => {
      //   console.log('command', command, args);
      //   if (command === 'render') {
      //     view.render();
      //     // framework.renderApp(config.name);
      //   } else if (command === 'setProps') {
      //     view.setProps(args);
      //   }
      // };
    },
    capability: (name, fn) => {
      framework.capability(config.name, name, fn);
    },
  };

  const setup = () => {
    _app(appContext);
  };

  const render = (element: HTMLElement) => {
    renderFn(element);
  };

  const meta = () => {
    return {
      displayName: config.meta.displayName,
      icon: config.meta.icon,
    };
  };

  setup();

  return {
    render,
    config: () => config,
    meta,
  };
};
