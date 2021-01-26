<template>
  <v-card style="height: -webkit-fill-available">
    <v-item-group>
      <v-container>
        <v-row>
          <v-col
            v-for="product in products"
            :key="product._id"
            cols="12"
            md="3"
          >
            <v-item>
              <v-card class="d-flex align-center" light height="200">
                <v-card-text class="text-center">{{
                  product.name
                }}</v-card-text>
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
            v-for="category in childrenCategories"
            :key="category._id"
            cols="12"
            md="3"
            @click="categoryClick(category)"
          >
            <v-item>
              <v-card class="d-flex align-center" light height="200">
                <v-card-text class="text-center">{{
                  category.name
                }}</v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>

      <v-btn
        elevation="2"
        fab
        style="position: absolute; bottom: 2em; right: 2em"
        color="purple"
        @click="categoryUp()"
      ></v-btn>
    </v-item-group>
  </v-card>
</template>

<script>
export default {
  name: "Products",
  created() {
    this.$store.dispatch("getRootCategories");
  },
  computed: {
    currentCateogry() {
      return this.$store.getters.currentCateogry;
    },
    childrenCategories() {
      return this.$store.getters.childrenCategories;
    },
    products() {
      return this.$store.getters.products;
    },
  },
  data() {
    return {
      categories: [{ name: "Todos" }, { name: "Desayunos" }],
    };
  },
  methods: {
    categoryClick(category) {
      this.$store
        .dispatch("getChildrenCategoriesByParentId", category)
        .then(() => {
          this.$store.dispatch("getProductsByCategoryId", category._id);
        });
    },

    categoryUp() {
      this.$store
        .dispatch("getParentCategoriesByChildId", this.currentCateogry)
        .then(() => {
          this.$store.dispatch("getProductsByCategoryId", this.currentCateogry.parentId);
        });
    },
  },
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
