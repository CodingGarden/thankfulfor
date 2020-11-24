/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import { createApp, ref, reactive } from 'https://unpkg.com/vue@3.0.2/dist/vue.esm-browser.js';

const App = {
  setup() {
    const url = ref('');
    const loading = ref(false);
    const error = ref('');
    const thanks = reactive({
      name: '',
      message: '',
      slug: '',
    });

    const createThanks = async () => {
      error.value = '';
      loading.value = true;
      if (!thanks.slug) {
        thanks.slug = undefined;
      }
      const response = await fetch('/api/v1/thanks', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(thanks),
      });
      const json = await response.json();
      setTimeout(() => {
        if (response.ok) {
          thanks.name = '';
          thanks.message = '';
          thanks.slug = '';
          url.value = `${window.location.origin}/${json.slug}`;
        } else {
          error.value = json.message;
        }
        loading.value = false;
      }, 2000);
    };

    return {
      thanks,
      createThanks,
      error,
      loading,
      url,
    };
  }
};

createApp(App)
  .mount('#app');
