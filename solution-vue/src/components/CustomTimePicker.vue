<template>
  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="internalTime"
      transition="scale-transition"
      offset-y
      min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-model="internalTime"
          :label="label"
          prepend-icon="mdi-clock"
          readonly
          outlined
          v-bind="attrs"
          v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
        v-model="internalTime"
        use-seconds
    >
      <v-spacer></v-spacer>
      <v-btn
          text
          color="primary"
          @click="menu = false"
      >
        Cancel
      </v-btn>
      <v-btn
          text
          color="primary"
          @click="handleConfirm"
      >
        OK
      </v-btn>
    </v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: "CustomTimePicker",
  data() {
    return {
      menu: false,
      internalTime: this.time
    }
  },
  model: {
    props: "time",
    event: "change"
  },
  methods: {
    handleConfirm() {
      this.$refs.menu.save(this.internalTime)
      this.$emit('change', this.internalTime)
    }
  },
  props: ['time', 'label']
}
</script>

<style scoped>

</style>