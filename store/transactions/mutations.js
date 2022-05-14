export default {
  SET_TRANSACTIONS(state, payload) {
    state.entries = payload
  },
  SET_TRANSACTION(state, payload) {
    const idx = state.entries.findIndex((item) => item.id === payload.id);
    const entry = state.entries.find((item) => item.id === payload.id);
    state.entries.splice(idx, 1, {...entry, ...payload});
  },
  REMOVE_TRANSACTION(state, payload) {
    const idx = state.entries.findIndex((item) => item.id === payload.id);
    state.entries.splice(idx, 1);
  },
  ADD_TRANSACTION(state, payload) {
    state.entries.push(payload);
  }
}
