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
      state.list = data.list;
    },
  },
  actions: {
    loadTagsList({ commit, rootState, state }, query) {
      return new Promise(async (resolve, reject) => {
        if (state.list.length > 0) {
          resolve(state.list);
          return;
        }

        const res = await tagsApi.list(query);
        if (res) {
          commit('setTagsData', res.data);
          resolve(res.data.list);
        }

        reject();
      });
    },
  },
};

export default Tags;
