import forecastApiService from "@/api/forecastApiService";

const state = {
    forecastValues: [],
}

const getters = {
    forecastForCity: state => city => state.forecastValues.filter(entry => entry.place === city) || [],
    availableCitiesForForecast: state => state.forecastValues.reduce((acc, weatherData) => {
        if (!acc.includes(weatherData.place))
            acc.push(weatherData.place)
        return acc
    }, [])
}

const actions = {
    async fetchForecastValues({commit}) {
        commit('setLoading', true, {root: true})
        return forecastApiService.fetchAll()
            .then(forecastValues => commit('setForecastValues', forecastValues))
            .finally(() => commit('setLoading', false, {root: true}))
    },
}

const mutations = {
    setForecastValues(state, forecastValues) {
        state.forecastValues = forecastValues
    },
}

export const forecast = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

