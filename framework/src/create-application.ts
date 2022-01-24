import { createQuery } from './create-query';
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
    objects: {
      query: (input) => {
        const query = createQuery(input, appContext);

        return query;
      },
    },
    createView: (fn, initialProps = {}) => {
      const view = createView(config.name, framework, initialProps);

      renderFn = (elem: HTMLElement) => {
        fn(elem, view);
      };

      return view;
    },
    enable: (name, fn) => {
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
