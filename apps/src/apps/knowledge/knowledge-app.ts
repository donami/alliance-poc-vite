import { AppContext } from 'framework';
import { createApp } from 'vue';
import AppComponent from './knowledge.vue';

const KnowledgeApp = (ctx: AppContext) => {
  const view = ctx.createView((element) => {
    // element.innerHTML = 'I am an Knowledge App';
    const vueApp = createApp(AppComponent, { ctx });
    vueApp.mount(element);
  });

  ctx.capability('openObjects', (args) => {
    return {
      type: 'view',
      command: 'render',
      args: args,
      view: view,
    };
  });
};

export default KnowledgeApp;
