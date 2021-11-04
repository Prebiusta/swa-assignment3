<template>
  <v-form v-model="formValid">
    <v-row>
      <v-col cols="12">
        <v-select
            v-model="selectedType"
            :items="availableTypes"
            hide-details
            label="Select Weather Type"
            outlined
            :rules="[v => !!v]"
        />
      </v-col>


      <v-col v-if="selectedType" cols="12">
        <v-row>
          <v-col cols="12" md="4">
            <CustomDatetimePicker v-model="datetime" label="Pick Time"></CustomDatetimePicker>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
                v-model="place"
                hide-details
                label="Select Place"
                outlined
                :rules="[v => !!v]"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
                v-model="value"
                hide-details
                label="Enter Value"
                outlined
                :rules="[v => !!v]"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-select
                v-model="unit"
                :items="availableUnits"
                hide-details
                label="Unit"
                outlined
                :rules="[v => !!v]"
            />
          </v-col>

          <v-col v-if="availableAdditionalValues" cols="12" md="4">
            <v-select
                v-model="additionalValue"
                :items="availableAdditionalValues"
                hide-details
                label="Select additional value"
                outlined
                :rules="[v => !!v]"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-btn :disabled="!formValid" color="success" @click="handleCreate">Create</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import CustomDatetimePicker from "@/components/CustomDatetimePicker";

export default {
  name: "PostHistoricalData",
  components: {CustomDatetimePicker},
  data() {
    return {
      types: [
        {
          type: "temperature",
          label: "Temperature",
          units: [
            "C",
            "F"
          ]
        }, {
          type: "precipitation",
          label: "Precipitation",
          units: [
            "mm",
            "inch"
          ],
          additionalValues: [
            "rain",
            "breeze"
          ]
        }, {
          type: "wind",
          label: "Wind",
          units: [
            "mph",
            "m/s"
          ],
          additionalValues: [
            "North",
            "South",
            "West",
            "East"
          ]
        }, {
          type: "cloud coverage",
          label: "Cloud Coverage",
          units: [
            "%",
          ],
        }
      ],
      selectedType: null,
      datetime: "",
      place: "",
      unit: "",
      value: "",
      additionalValue: "",

      formValid: false
    }
  },
  computed: {
    availableTypes() {
      return this.types.map(type => type.type)
    },
    selectedTypeObject() {
      return this.types.find(({type}) => type === this.selectedType)
    },
    availableUnits() {
      return this.selectedTypeObject.units
    },
    availableAdditionalValues() {
      return this.selectedTypeObject.additionalValues
    }
  },
  methods: {
    getAdditionalValues() {
      const result = {}
      if (this.additionalValue) {
        const name = this.selectedType === "precipitation" ? "precipitation_type" : "direction"
        result[name] = this.additionalValue
      }
      return result
    },
    getDataObject() {
      return {
        type: this.selectedType,
        time: this.time,
        place: this.place,
        value: this.value,
        unit: this.unit,
        ...this.getAdditionalValues()
      }
    },
    handleCreate() {
      this.$emit("create", this.getDataObject())
    }
  }
}
</script>

<style scoped>

</style>