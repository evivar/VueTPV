<template>
  <v-app id="inspire">
    <v-container fluid style="min-height: 100%">
      <v-row style="min-height: 100%">
        <v-col sm="4">
          <v-sheet rounded="lg" min-height="100%" class="d-flex flex-column align-stretch" style="border: solid 1px blue">
            <div style="max-height: 56vh;height: 56vh;border: solid 1px white">

            </div>
            <div style="max-height: 40vh; height: 40vh;border: solid 1px white">

            </div>
          </v-sheet>
        </v-col>

        <v-col sm="8">
          <v-sheet
            rounded="lg"
            min-height="100%"
            id="rightPanel"
            class="d-flex flex-column align-stretch"
            style="border: solid 1px blue"
          >
            <div id="productDiv" style="max-height: 96vh; height: 100vh; border: solid 1px white" >
              <products></products>
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
