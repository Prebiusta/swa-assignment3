import Vue from 'vue'
import Vuex from 'vuex'
import {data} from "@/store/modules/data.module";
import {forecast} from "@/store/modules/forecast.module";

Vue.use(Vuex)

const state = {
  loading: false
}

const mutations = {
  setLoading(state, loading) {
    state.loading = loading
  }
}

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    data,
    forecast
  }
})
