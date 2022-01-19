import { createApplication } from './create-application';
import { createEventManager } from './events';
import { AppConfiguration, Application, Framework } from './types';

type CapabilityAction = (args: any[]) => any; // TODO: return capabilityresponse

type Capabilities = {
  [key: string]: {
    [key: string]: CapabilityAction;
  };
};

const querySelector = '#main-content';

const getRelevantApps = (
  objectType: string,
  apps: Map<string, Application>
): Application[] => {
  const result: Application[] = [];
  apps.forEach((app, name) => {
    const { managedObjects = [] } = app.config();

    if (managedObjects.includes(objectType)) {
      result.push(app);
    }
  });

  return result;
};

export const createFramework = (): Framework => {
  const apps = new Map<string, Application>();
  const events = createEventManager();
  const capabilities: Capabilities = {};

  events.listen((data, event) => {
    const relevantCapabilities = getRelevantApps(data.objectType, apps).reduce<
      CapabilityAction[]
    >((acc, app) => {
      const { name } = app.config();
      if (capabilities[name] && capabilities[name][event]) {
        acc.push(capabilities[name][event]);
      }

      return acc;
    }, []);

    relevantCapabilities.forEach((capability) => {
      const response = capability(data);

      console.log('response', response);
      if (response.type === 'view') {
        response.view.invoke(response.command, response.args);
        // response.view(response.command, response.args);
      }
    });
  });

  const registerApp = (appConfig: AppConfiguration, _app: any) => {
    const application = createApplication(appConfig, _app, framework);
    apps.set(appConfig.name, application);
  };

  const render = () => {
    if (!apps.size) {
      throw new Error('No apps registered');
    }

    apps.forEach((app, key) => {
      const element = document.querySelector(querySelector);
      if (element) {
        app.render(element as HTMLElement);
      }
    });
  };

  const renderApp = (name: string) => {
    const app = apps.get(name);
    const element = document.querySelector(querySelector);

    if (app && element) {
      app.render(element as HTMLElement);
    }
  };

  const capability = (
    appName: string,
    name: string,
    fn: (args: any[]) => void
  ) => {
    if (!capabilities[appName]) {
      capabilities[appName] = {};
    }

    capabilities[appName][name] = fn;
  };

  const framework = {
    render,
    renderApp,
    capability,
    apps,
    registerApp,
    events,
  };

  return framework;
};
