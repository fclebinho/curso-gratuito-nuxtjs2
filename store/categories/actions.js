export default {
  FETCH_ALL(context) {
    this.$axios.$get('categories').then(response => context.commit('SET_CATEGORIES', response));
  },
  DELETE(context, id) {
    this.$axios.$delete(`categories/${id}`).then((_) => context.commit('REMOVE_CATEGORY', {id}));
  },
  UPDATE(context, { id, data }) {
    return new Promise((resolve, reject) => this.$axios.$patch(`categories/${id}`, data).then((response) => {
      context.commit('SET_CATEGORY', response);
      resolve(response);
    }));
  },
  CREATE(context, data) {
    return new Promise((resolve, reject) => this.$axios.$post('categories', data).then((response) => {
      context.commit('ADD_CATEGORY', response);
      resolve(response);
    }));
  },
}
