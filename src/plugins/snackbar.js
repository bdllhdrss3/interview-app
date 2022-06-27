const snackbarPlugin = {
    install: (Vue, { store }) => {
      if (!store) {
        throw new Error('Please provide vuex store.');
      }
  
      Vue.prototype.$snackbar = {
        showMessage: function ({
          content = '',
          color = ''
        }) {
          store.commit(
            'snackbar/SHOW_MESSAGE',
            { content, color },
            { root: true }
          );
        }
      };
    },
  };
export default snackbarPlugin;