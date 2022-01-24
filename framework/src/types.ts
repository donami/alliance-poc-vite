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
  framework: Framework;
  dispatch: (action: string, data: { [key: string]: any }) => void;
  createView: (
    fn: (elem: HTMLElement, view: View) => void,
    initialProps?: ViewProps
  ) => View;
  objects: {
    query: (input: QueryInputArgs) => Query;
  };
  // createView: (
  //   fn: (elem: HTMLElement) => void
  // ) => (command: string, args?: any) => void;
  enable: (name: string, fn: (args: any[]) => CapabilityResponse) => void;
};

export type Framework = {
  initialize: () => Promise<boolean>;
  render: () => void;
  renderApp: (name: string) => void;
  capability: (
    appName: string,
    name: string,
    fn: (args: any[]) => void
  ) => void;
  capabilitiesByKey: (
    key: string,
    filter: QueryInputArgs
  ) => CapabilityAction[];
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

export type CapabilityAction = (args: any[]) => any; // TODO: return capabilityresponse

export type View = {
  setProps: (updated: { [key: string]: any }) => void;
  render: () => void;
  invoke: (command: string, args?: any) => void;
  props: ViewProps;
  events: any;
  onUpdate: (fn: (data: any) => void) => void;
};

export type ViewProps = { [key: string]: any };

export type Query = {
  request: () => Promise<any>;
  watch: (fn: (updatedResponse: any) => Function) => void;
};

export type QueryInputArgs = {
  type: string;
  where?: {
    [key: string]: any;
  };
};

export type ObjectType = {
  ref: string;
  label: string;
  objectType: string;
};
