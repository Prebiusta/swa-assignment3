<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-row no-gutters align="center" justify="center" class="text-center">
        <v-col cols="12">
          <v-row no-gutters justify="center" align="center">
            <router-link class="mx-2" to="/">Weather</router-link>
            <router-link class="mx-2" to="/submit">Add Data</router-link>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style scoped>
a {
  color: white !important;
  text-decoration: none;
}

a:hover {
  color: aqua !important;
}

.router-link-exact-active {
  color: aqua !important;
}
</style>
