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
    loadTagsList({ commit, rootState, state }) {
      return new Promise(async (resolve, reject) => {
        if (state.list.length > 0) {
          resolve(state.list);
          return;
        }

        const res = await tagsApi.list({ page: -1 });
        if (res) {
          commit('setTagsData', res.data);
          resolve(res.data);
        }

        reject();
      });
    },
  },
};

export default Tags;
