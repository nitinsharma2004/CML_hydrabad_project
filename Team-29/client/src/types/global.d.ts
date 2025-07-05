declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (options: any, element: string): any;
          InlineLayout: {
            SIMPLE: any;
          };
        };
      };
    };
  }
}

export {}; 