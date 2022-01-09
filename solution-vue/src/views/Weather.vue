<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>Weather Data</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-select
                  v-model="selectedWeatherValuesCity"
                  :items="availableCitiesForWeatherData"
                  label="Select City for Weather Data"
                  outlined
              />
            </v-col>

            <v-col cols="12" md="6">
              <CustomTimePicker v-model="weatherValuesStartTime" label="Weather Data Start Time"/>
            </v-col>

            <v-col cols="12" md="6">
              <CustomTimePicker v-model="weatherValuesEndTime" label="Weather Data End Time"/>
            </v-col>

            <v-col cols="12">
              <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="fetchWeatherData">Reload Weather Data</v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>Forecast</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-select
                  v-model="selectedForecastCity"
                  :items="availableCitiesForForecast"
                  label="Select City for Forecast"
                  outlined
              />
            </v-col>

            <v-col cols="12" md="6">
              <CustomTimePicker v-model="forecastStartTime" label="Forecast Start Time"/>
            </v-col>

            <v-col cols="12" md="6">
              <CustomTimePicker v-model="forecastEndTime" label="Forecast End Time"/>
            </v-col>

            <v-col cols="12">
              <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="fetchForecastValues">Reload Forecast Values</v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <CityWrapper
          :forecast-values="filteredForecastValues"
          :forecast-values-loading="loading"
          :weather-data-values="filteredValues"
          :weather-data-values-loading="loading"
      />
    </v-col>
    <div>
      <input v-model="text" style="border: 1px solid black">
      <p>{{text}}</p>
    </div>
  </v-row>
</template>

<script>
import {format} from 'date-fns'
import CityWrapper from "@/components/CityWrapper";
import {mapActions, mapGetters, mapState} from "vuex";
import CustomTimePicker from "@/components/CustomTimePicker";

const DEFAULT_TIME_FORMAT = 'HH:mm:ss'

export default {
  name: "Weather",
  components: {CustomTimePicker, CityWrapper},
  data() {
    return {
      text: "Initial text",
      selectedWeatherValuesCity: "",
      weatherValuesStartTime: "",
      weatherValuesEndTime: "",

      selectedForecastCity: "",
      forecastStartTime: "",
      forecastEndTime: ""
    }
  },
  computed: {
    ...mapGetters('data', [
      'valuesForCity',
      'availableCitiesForWeatherData'
    ]),
    ...mapGetters('forecast', [
      'forecastForCity',
      'availableCitiesForForecast'
    ]),
    ...mapState(['loading']),
    filteredForecastValues() {
      const forecastsForSelectedCity = this.forecastForCity(this.selectedForecastCity)
      return forecastsForSelectedCity.filter((forecast) => {
        if (this.forecastStartTime === "" || this.forecastEndTime === "")
          return true
        const forecastTimeString = this.getTimeString(new Date(forecast.time))
        return forecastTimeString >= this.forecastStartTime && forecastTimeString <= this.forecastEndTime
      })
    },
    filteredValues() {
      const valuesForCity = this.valuesForCity(this.selectedWeatherValuesCity)
      return valuesForCity.filter((value) => {
        if (this.weatherValuesStartTime === "" || this.weatherValuesEndTime === "")
          return true
        const weatherValueTimeString = this.getTimeString(new Date(value.time))
        return weatherValueTimeString >= this.weatherValuesStartTime && weatherValueTimeString <= this.weatherValuesEndTime
      })

    }
  },
  methods: {
    ...mapActions('forecast', [
      'fetchForecastValues'
    ]),
    ...mapActions('data', [
      'fetchWeatherData',
      'createWeatherData'
    ]),
    getTimeString(date) {
      return format(date, DEFAULT_TIME_FORMAT)
    }
  },
  created() {
    this.fetchWeatherData()
    this.fetchForecastValues()
  }
}
</script>

<style scoped>

</style>