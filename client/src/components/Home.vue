<template>
  <v-app id="inspire">
    <v-container fluid style="min-height: 100%">
      <v-row style="min-height: 100%">
        <v-col sm="4">
          <v-sheet rounded="lg" min-height="100%" class="d-flex flex-column align-stretch">
            <div style="height: 56vh">

            </div>
            <div style="height: 40vh">

            </div>
          </v-sheet>
        </v-col>

        <v-col sm="8">
          <v-sheet
            rounded="lg"
            min-height="100%"
            id="rightPanel"
            class="d-flex flex-column align-stretch"
          >
            <div style="max-height: 48vh">
              <products></products>
            </div>
            <div style="height: 48vh">

            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Products from "./Products";

export default {
  name: "Home",
  components:{
    Products
  },
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"]
  })
};
</script>

<style lang="css">
#rightPanel {
  display: flex;
  flex-direction: column;
}
</style>
