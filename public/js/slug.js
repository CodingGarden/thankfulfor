/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import { createApp, ref } from 'https://unpkg.com/vue@3.0.2/dist/vue.esm-browser.js';

const App = {
  setup() {
    const error = ref('');
    const thanks = ref(null);

    const params = new URLSearchParams(window.location.search);
    const from = ref(params.get('from') || 'Anonymous');

    const getThanks = async () => {
      const slug = window.location.pathname;
      const response = await fetch(`/api/v1/thanks${slug}`);
      const json = await response.json();
      if (response.ok) {
        thanks.value = json;
      } else {
        error.value = 'Could not find that thanks. 😔 But I\'m still thankful for you!';
      }
    };

    getThanks();

    return {
      error,
      thanks,
      from,
    };
  }
};

createApp(App)
  .mount('#app');
