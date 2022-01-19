import './style.css';

import {
  TaskbarApp,
  TaskbarAppManifest,
  FindApp,
  FindAppManifest,
  WidgetStudioApp,
  WidgetStudioAppManifest,
  KnowledgeApp,
  KnowledgeAppManifest,
} from 'apps';
import { createFramework } from 'framework';

const setup = () => {
  const framework = createFramework();

  window.framework = framework;

  framework.registerApp(FindAppManifest, FindApp);
  framework.registerApp(TaskbarAppManifest, TaskbarApp);
  framework.registerApp(WidgetStudioAppManifest, WidgetStudioApp);
  framework.registerApp(KnowledgeAppManifest, KnowledgeApp);

  // framework.render();
  framework.renderApp('FindApp');
};

setup();
