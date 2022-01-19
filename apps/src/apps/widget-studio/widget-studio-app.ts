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

  // ctx.capability('init', (args) => {
  //   // framework.requestView(view);
  //   return view('init');
  // });

  ctx.capability('openObjects', (args) => {
    // return view('openObjects')
    return {
      type: 'view',
      command: 'render',
      args: args,
      view: view,
    };
  });

  // ctx.capability('deleteObjects', (args) => {
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
