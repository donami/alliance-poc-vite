import { AppContext } from 'framework';
import { createApp } from 'vue';
import AppComponent from './find.vue';

const FindApp = (ctx: AppContext) => {
  const view = ctx.createView((element) => {
    // element.innerHTML = 'I am an Find App';
    const vueApp = createApp(AppComponent, { ctx });
    vueApp.mount(element);
  });

  ctx.capability('openObjects', (args) => {
    // TODO:
  });
};

export default FindApp;
