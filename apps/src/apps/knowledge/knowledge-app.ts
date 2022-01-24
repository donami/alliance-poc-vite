import { AppContext } from 'framework';
import { computed, createApp, reactive, ref } from 'vue';
import AppComponent from './knowledge.vue';

const KnowledgeApp = (ctx: AppContext) => {
  const view = ctx.createView((element, view) => {
    // element.innerHTML = 'I am an Knowledge App';
    const vueApp = createApp(AppComponent, { ctx });

    let props = reactive({
      ...view.props(),
    });

    view.onUpdate((data: any) => {
      Object.assign(props, data.props);
    });

    vueApp.provide(
      'viewProps',
      computed(() => props)
    );
    vueApp.mount(element);
  });

  ctx.enable('sys.launch', (args) => {
    console.log('Knowledge app just launched!');

    return Promise.resolve(true);
  });

  ctx.enable('sys.fetch', (args) => {
    // TODO: what should this capability be called
    return {
      type: 'process',
      command: 'sys.fetch',
      response: [
        {
          ref: '1',
          label: 'My Guide',
          objectType: 'guide',
        },
        {
          ref: '2',
          label: 'My Guide 2',
          objectType: 'guide',
        },
        {
          ref: '3',
          label: 'My Guide 3',
          objectType: 'guide',
        },
      ],
      args,
    };
  });

  ctx.enable('openObjects', (args) => {
    view.invoke('setProps', {
      ref: args.ref,
    });

    setTimeout(() => {
      // TODO: remove
      view.invoke('setProps', {
        updated: true,
      });
    }, 2000);

    return {
      type: 'view',
      command: 'render',
      args: args,
      view: view,
    };
  });

  ctx.enable('removeObjects', (args) => {
    view.invoke('setProps', {
      ref: args.ref,
    });

    view('removeObjects');

    return {
      type: 'view',
      command: 'render',
      args: args,
      view: view,
    };
  });
};

export default KnowledgeApp;
