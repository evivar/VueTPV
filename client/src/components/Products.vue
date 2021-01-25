<template>
  <v-card style="height: -webkit-fill-available;">
    <v-item-group>
      <v-container>
        <v-row>
          <v-col v-for="n in 0" :key="n" cols="12" md="3">
            <v-item v-slot="{ active, toggle }">
              <v-card
                :color="active ? 'primary' : ''"
                class="d-flex align-center"
                light
                height="200"
                @click="toggle"
              >
                <v-scroll-y-transition>
                  <div v-if="active" class="display-3 flex-grow-1 text-center">
                    Active
                  </div>
                </v-scroll-y-transition>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <v-divider></v-divider>
    <v-item-group>
      <v-container>
        <v-row>
          <v-col
            v-for="category in categories"
            :key="category.name"
            cols="12"
            md="3"
          >
            <v-item>
              <v-card
                class="d-flex align-center"
                light
                height="200"
              >
                <v-card-text class="text-center">{{
                  category.name
                }}</v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </v-card>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      categories: [{ name: "Todos" }, { name: "Desayunos" }]
    };
  },
  methods: {}
};
</script>

<style lang="css">
.v-item-group {
  height: 50%;
  overflow-y: auto;
  padding: 1em;
}

/* Scroller style */

.v-item-group::-webkit-scrollbar {
  width: 7px;
}

.v-item-group::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 20px;
  border-radius: 20px;
}

/* Handle */
.v-item-group::-webkit-scrollbar-thumb {
  -webkit-border-radius: 20px;
  border-radius: 20px;
  background: white;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
.v-item-group::-webkit-scrollbar-thumb:window-inactive {
  background: lightgrey;
}
</style>
