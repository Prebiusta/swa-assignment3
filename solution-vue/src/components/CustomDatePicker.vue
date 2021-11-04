<template>
  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="internalDate"
      transition="scale-transition"
      offset-y
      min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-model="internalDate"
          :label="label"
          prepend-icon="mdi-clock"
          readonly
          outlined
          v-bind="attrs"
          v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
        v-model="internalDate"
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
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "CustomDatePicker",
  data() {
    return {
      menu: false,
      internalDate: this.date
    }
  },
  model: {
    props: "date",
    event: "change"
  },
  methods: {
    handleConfirm() {
      this.$refs.menu.save(this.internalDate)
      this.$emit('change', this.internalDate)
    }
  },
  props: ['date', 'label']
}
</script>

<style scoped>

</style>