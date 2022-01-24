import { AppContext } from 'framework';
import { createApp } from 'vue';
import AppComponent from './widget-studio.vue';
// import { capabilityResponse } from 'ace-alliance';

const WidgetStudioApp = (ctx: AppContext) => {
  const view = ctx.createView((element) => {
    // element.innerHTML = 'I am an Widget Studio App';
    const vueApp = createApp(AppComponent);
    vueApp.mount(element);
  });

  // ctx.enable('init', (args) => {
  //   // framework.requestView(view);
  //   return view('init');
  // });

  ctx.enable('openObjects', (args) => {
    return {
      type: 'view',
      command: 'render',
      args: args,
      view: view,
    };
  });

  ctx.enable('sys.fetch', (args) => {
    // TODO: what should this capability be called
    return {
      type: 'process',
      command: 'sys.fetch',
      response: [
        {
          ref: '4',
          label: 'My Widget',
          objectType: 'widget',
        },
        {
          ref: '5',
          label: 'My Widget 2',
          objectType: 'widget',
        },
        {
          ref: '6',
          label: 'My Widget 3',
          objectType: 'widget',
        },
      ],
      args,
    };
  });

  // ctx.enable('deleteObjects', (args) => {
  //   return deleteObject(args.refId)
  //     .then(() => {
  //       return capabilityResponse('process', 'resolved');
  //       // return {
  //       //   type: 'process',
  //       //   status: 'resolved',
  //       // };
  //     })
  //     .catch((e) => {
  //       return {
  //         type: 'process',
  //         status: 'rejected',
  //       };
  //     });
  // });
};

export default WidgetStudioApp;
