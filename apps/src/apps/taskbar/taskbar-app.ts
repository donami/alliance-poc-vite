import { AppContext } from 'framework';
import { createApp } from 'vue';
import AppComponent from './taskbar.vue';

const TaskbarApp = (ctx: AppContext) => {
  const view = ctx.createView((element) => {
    // element.innerHTML = 'I am an Taskbar App';
    const vueApp = createApp(AppComponent);
    vueApp.mount(element);
  });

  ctx.capability('openObjects', (args) => {
    // TODO:
  });
};

export default TaskbarApp;
