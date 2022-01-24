import { AppContext } from 'framework';
import { computed, createApp, reactive } from 'vue';
import AppComponent from './find.vue';

const FindApp = (ctx: AppContext) => {
  const view = ctx.createView((element) => {
    // const query = ctx.objects.query({ type: 'widget' });

    // let props = reactive({
    //   items: [],
    // });

    // query.request().then((response: any) => {
    //   // console.log('resp', response);
    //   props.items = response;
    // });
    // element.innerHTML = 'I am an Find App';
    const vueApp = createApp(AppComponent, { ctx });
    // vueApp.provide(
    //   'viewProps',
    //   computed(() => props)
    // );
    vueApp.mount(element);
  });

  ctx.enable('openObjects', (args) => {
    // TODO:
  });
};

export default FindApp;
