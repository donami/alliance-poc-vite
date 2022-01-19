export type AppMeta = {
  displayName: string;
  icon: string;
};

export type AppConfiguration = {
  name: string;
  meta: AppMeta;
  managedObjects: string[];
};

export type Application = {
  meta: () => AppMeta;
  config: () => AppConfiguration;
  render(element: HTMLElement): void;
};

export type AppContext = {
  config: AppConfiguration;
  framework: any;
  dispatch: (action: string, data: { [key: string]: any }) => void;
  createView: (fn: (elem: HTMLElement) => void) => View;
  // createView: (
  //   fn: (elem: HTMLElement) => void
  // ) => (command: string, args?: any) => void;
  capability: (name: string, fn: (args: any[]) => CapabilityResponse) => void;
};

export type Framework = {
  render: () => void;
  renderApp: (name: string) => void;
  capability: (
    appName: string,
    name: string,
    fn: (args: any[]) => void
  ) => void;
  apps: Map<string, Application>;
  registerApp: (appConfig: AppConfiguration, _app: any) => void;
  events: any;
};

export type CapabilityResponse = {
  type: 'view';
  command: string;
  args: {
    ref: string;
    objectType: string;
    [key: string]: any;
  };
  view?: View;
};

export type View = {
  setProps: (updated: { [key: string]: any }) => void;
  render: () => void;
  invoke: (command: string, args?: any) => void;
  props: { [key: string]: any };
};
