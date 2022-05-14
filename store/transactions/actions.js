export default {
  FETCH_ALL(context, filter = {}) {
    this.$axios.$get('transactions', {
      params: {
        _expand: 'category',
        ...filter
      }
    }).then(response => context.commit('SET_TRANSACTIONS', response));
  },
  UPDATE(context, { id, data }) {
    return new Promise((resolve, reject) => this.$axios.$patch(`transactions/${id}`, {...data, categoryId: parseInt(data.categoryId)}).then((response) => {
      context.commit('SET_TRANSACTION', response);
      resolve(response);
    }));
  },
  CREATE(context, data) {
    return new Promise((resolve, reject) => this.$axios.$post('transactions', {...data, categoryId: parseInt(data.categoryId)})
      .then(response => {
        context.commit('ADD_TRANSACTION', response);
        resolve(response);
      }));
  },
  DELETE(context, id) {
    return new Promise((resolve, reject) => this.$axios.$delete(`transactions/${id}`).then((_) => {
      context.commit('REMOVE_TRANSACTION', { id });
      resolve();
    }));
  }
}
