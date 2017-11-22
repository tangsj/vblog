/**
 * 文章 store
 * @author tangsj
 */
import postsApi from '@/api/posts';

const Posts = {
  state: {
    total: 0,
    listObj: {},
  },
  mutations: {
    setPostsData(state, data) {
      state.listObj[data.page] = data.list;
    },
    setPostsTotal(state, data) {
      state.total = data;
    },
  },
  actions: {
    loadPostList({ commit, dispatch, rootState, state }, query) {
      return new Promise(async (resolve, reject) => {
        if (state.listObj[query.page]) {
          resolve(state.listObj[query.page]);
          return;
        }
        const tagsRes = await dispatch('loadTagsList');
        const res = await postsApi.list(query);

        if (res && tagsRes) {
          res.data.list.forEach((item) => {
            const tags = item.tag.split(',').map(a => parseInt(a, 10));
            const tagsName = [];
            rootState.tags.list.forEach((t) => {
              if (tags.indexOf(t.id) !== -1) {
                tagsName.push(t.name);
              }
            });
            item.tagsName = tagsName.join(',');
          });

          commit('setPostsData', {
            page: query.page,
            list: res.data.list,
          });
          commit('setPostsTotal', res.data.total);
          resolve(res.data.list);
        }
      });
    },
  },
};

export default Posts;
