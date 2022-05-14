export default {
  SET_CATEGORIES(state, payload) {
    state.entries = payload
  },
  REMOVE_CATEGORY(state, payload) {
    const idx = state.entries.findIndex(item => item.id === payload.id);
    state.entries.splice(idx, 1);
  },
  SET_CATEGORY(state, payload) {
    const idx = state.entries.findIndex(item => item.id === payload.id);
    state.entries.splice(idx, 1, payload);
  },
  ADD_CATEGORY(state, payload) {
    state.entries.push(payload)
  }
}
