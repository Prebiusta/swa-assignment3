<template>
  <PostHistoricalData
      @create="handleCreateData"
  />
</template>

<script>
import PostHistoricalData from "@/components/PostHistoricalData";
import {mapActions} from "vuex";

export default {
  name: "SubmitData",
  components: {PostHistoricalData},
  methods: {
    ...mapActions("data", [
        'createWeatherData',
        'fetchWeatherData'
    ]),
    handleCreateData(data) {
      this.createWeatherData(data)
      .then(() => this.fetchWeatherData())
      .then(() => this.$router.push("/"))
    }
  }
}
</script>

<style scoped>

</style>