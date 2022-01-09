import weatherDataApiService from "@/api/weatherDataApiService";

const state = {
    weatherDataValues: [],
}

const getters = {
    valuesForCity: state => city => state.weatherDataValues.filter(entry => entry.place === city) || [],
    availableCitiesForWeatherData: state => state.weatherDataValues.reduce((acc, weatherData) => {
        if (!acc.includes(weatherData.place))
            acc.push(weatherData.place)
        return acc
    }, [])

}

const actions = {
    async fetchWeatherData({commit}) {
        commit('setLoading', true, {root: true})
        return weatherDataApiService.fetchAll()
            .then(data => commit("setWeatherDataValues", data))
            .finally(() => commit('setLoading', false, {root: true}))
    },
    async fetchWeatherDataAwait({commit}) {
        commit('setLoading', true, {root: true})
        const data = await weatherDataApiService.fetchAll();
        commit("setWeatherDataValues", data)
        commit('setLoading', false, {root: true})
    },
    async createWeatherData({commit}, data) {
        commit('setLoading', true, {root: true})
        return weatherDataApiService.create(data)
            .finally(() => commit('setLoading', false, {root: true}))
    },
    async createWeatherDataAwait({commit}, data) {
        commit('setLoading', true, {root: true})
        await weatherDataApiService.create(data)
        commit('setLoading', false, {root: true})
    }
}

const mutations = {
    setWeatherDataValues(state, weatherDataValues) {
        state.weatherDataValues = weatherDataValues
    },
}

export const data = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

