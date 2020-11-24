/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import { createApp, ref, reactive, watch } from 'https://unpkg.com/vue@3.0.2/dist/vue.esm-browser.js';

const App = {
  setup() {
    const url = ref('');
    const loading = ref(false);
    const error = ref('');
    const thanks = reactive({
      name: '',
      message: '',
      slug: '',
      from: '',
    });

    watch(thanks, () => {
      if (thanks.message.length > 280) {
        thanks.message = thanks.message.slice(0, 280);
      }
    });

    const createThanks = async () => {
      error.value = '';
      loading.value = true;
      let { from } = thanks;
      if (!thanks.slug) {
        thanks.slug = undefined;
      }
      thanks.name = thanks.name.trim();
      thanks.message = thanks.message.trim();
      from = from.trim();
      thanks.from = undefined;
      const response = await fetch('/api/v1/thanks', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(thanks),
      });
      thanks.from = from;
      const json = await response.json();
      setTimeout(() => {
        if (response.ok) {
          let shareUrl = `${window.location.origin}/${json.slug}`;
          if (from) {
            shareUrl = `${shareUrl}?from=${from}`;
          }
          url.value = shareUrl;
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
