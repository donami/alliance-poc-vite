import { createApplication } from './create-application';
import { createEventManager } from './events';
import {
  AppConfiguration,
  Application,
  CapabilityAction,
  Framework,
  QueryInputArgs,
} from './types';

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
    if (objectType === '*') {
      result.push(app);
    } else {
      const { managedObjects = [] } = app.config();

      if (managedObjects.includes(objectType)) {
        result.push(app);
      }
    }
  });

  return result;
};

const getEnabledCapabilities = (capabilities: Capabilities) => {
  return Object.entries(capabilities).reduce<{
    [key: string]: CapabilityAction;
  }>((acc, [key, commands]) => {
    Object.entries(commands).forEach(([command, fn]) => {
      acc[`${key}-${command}`] = fn;
    });

    return acc;
  }, {});
};

const getCapabilitiesByCommand = (
  command: string,
  capabilities: Capabilities,
  relevantApps: Application[]
) => {
  const commands = getEnabledCapabilities(capabilities);
  const appNames = relevantApps.map((app) => app.config().name);

  return Object.entries(commands).reduce<CapabilityAction[]>(
    (acc, [key, fn]) => {
      // const [commandKey] = key.split('-').slice(-1);
      const [appName, commandKey] = key.split('-');

      if (appNames.includes(appName) && commandKey === command) {
        acc.push(fn);
      }

      return acc;
    },
    []
  );
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

      if (response.type === 'view') {
        response.view.invoke(response.command, response.args);
      }
    });
  });

  const initialize = async () => {
    const matchingCapabilities = framework.capabilitiesByKey('sys.launch', {
      type: '*',
    });

    const promises = matchingCapabilities.map((capability) => {
      return capability([]);
    });

    await Promise.all(promises);

    return Promise.resolve(true);
  };

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

  const renderApp = (name: string, selector?: string) => {
    const app = apps.get(name);
    // TODO: get querySelector from outside
    const element = document.querySelector(selector || querySelector);

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

  const framework: Framework = {
    initialize,
    render,
    renderApp,
    capability,
    capabilitiesByKey: (key, filter) => {
      const relevantApps = getRelevantApps(filter.type, apps);

      return getCapabilitiesByCommand(key, capabilities, relevantApps);
    },
    apps,
    registerApp,
    events,
  };

  return framework;
};
