export const createEventManager = () => {
  const events: { [key: string]: { listeners: any[] } } = {
    '*': { listeners: [] },
  };

  const dispatch = (event: string, data: any) => {
    events['*'].listeners.forEach((listener) => {
      listener(data, event);
    });

    if (!events[event]) {
      return;
    }
    events[event].listeners.forEach((listener) => {
      listener(data, event);
    });
  };

  const subscribe = (
    event: string,
    callback: (data: any, event: string) => void
  ) => {
    if (!events[event]) {
      events[event] = {
        listeners: [],
      };
    }

    events[event].listeners.push(callback);
  };

  const listen = (callback: (data: any, event: string) => void) => {
    events['*'].listeners.push(callback);

    return () => {
      events['*'].listeners = events['*'].listeners.filter(
        (listener) => listener.toString() !== callback.toString()
      );
    };
  };

  const unsubscribe = (
    event: string,
    callback: (data: any, event: string) => void
  ) => {
    if (!events[event]) {
      return;
    }
    events[event].listeners = events[event].listeners.filter(
      (listener) => listener.toString() !== callback.toString()
    );
  };

  return {
    dispatch,
    subscribe,
    unsubscribe,
    listen,
  };
};
