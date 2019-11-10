import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";

Vue.use(Vuex);

const state = () => ({
  initialized: false,
  tranca: [],
  truco: []
});

const mutations = {
  setState: (state, { name, body }) => {
    state[name] = body;
  },
  updateState: async (state, { name, body }) => {
    const existing = _.findIndex(state[name], { id: body.id });
    if (~existing) {
      if (body.deleted) {
        state[name].splice(existing, 1);
      } else {
        state[name][existing] = { ...body, ...state[name][existing] };
      }
    } else if (!body.deleted) {
      state[name].push(body);
    }
  }
};

const actions = {
  async initFirebase({ dispatch, commit, state }) {
    try {
      if (!state.initialized) {
        await this.$fireStore.settings({
          cacheSizeBytes: this.$fireStoreObj.CACHE_SIZE_UNLIMITED
        });
        await this.$fireStore.enablePersistence();
        commit("setState", { name: "initialized", body: true });
        console.log("Firebase running offline");
      }
    } catch (err) {
      if (err.code == "failed-precondition") {
        console.log(
          "Multiple tabs open, persistence can only be enabled in one tab at a a time.",
          err
        );
      } else if (err.code == "unimplemented") {
        console.log(
          "The current browser does not support all of the features required to enable persistence",
          err
        );
      } else {
        console.log(err);
      }
    }

    dispatch("getCollections", ["truco", "tranca"]);
    // Subsequent queries will use persistence, if it was enabled successfully
  },
  async getCollection({ commit }, collectionName) {
    return new Promise((resolve, reject) => {
      let source;
      try {
        this.$fireStore
          .collection(collectionName)
          .onSnapshot({ includeMetadataChanges: true }, snapshot => {
            snapshot.docChanges().forEach(async change => {
              if (change.type === "added" || change.type === "modified") {
                await commit("updateState", {
                  name: collectionName,
                  body: { id: change.doc.id, ...change.doc.data() }
                });
              } else {
                console.log("Change not registered", change);
              }
            });
            source = snapshot.metadata.fromCache ? "local cache" : "server";
            console.log(collectionName + " data came from " + source);
            resolve();
          });
      } catch (e) {
        console.error(e);
        reject();
      }
    });
  },
  async getCollections({ dispatch }, collectionNamesArray) {
    collectionNamesArray.forEach(collectionName => {
      dispatch("getCollection", collectionName);
    });
  },
  async addDocument({ dispatch }, { collectionName, body }) {
    try {
      const response = await this.$fireStore
        .collection(collectionName)
        .add(body);
      return response.id;
    } catch (e) {
      console.error(e);
    }
  },
  async updateDocument({ dispatch }, { collectionName, documentId, body }) {
    try {
      if (body.id) delete body.id;
      const response = await this.$fireStore
        .collection(collectionName)
        .doc(documentId)
        .update(body);
      return response;
    } catch (e) {
      console.error(e);
    }
  },
  async deleteDocument({ dispatch }, { collectionName, documentId }) {
    const response = await dispatch("updateDocument", {
      collectionName,
      documentId,
      body: { deleted: true }
    });
    return response;
  }
};

const getters = {
  getDocument: state => ({ collectionName, documentId }) => {
    return state[collectionName].find(document => document.id === documentId);
  }
};

export default () => {
  return new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  });
};