/**
 * 标签 store
 * @author tangsj
 */
import tagsApi from '@/api/tags';

const Tags = {
  state: {
    list: [],
  },
  mutations: {
    setTagsData(state, data) {
      state.list = data;
    },
  },
  actions: {
    async loadTagsList({ commit, rootState, state }, query) {
      if (state.list.length > 0) {
        return;
      }

      const res = await tagsApi.list(query);
      if (res) {
        commit('setTagsData', res.data);
      }
    },
  },
};

export default Tags;
