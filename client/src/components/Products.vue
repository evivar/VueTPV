<template>
  <v-container fluid>
    <v-layout row justify-center class="text-xs-center mb-4">
      <v-flex xs2 v-for="item in items" :key="item" class="mx-2">
        <v-card>
          <v-card-title>{{item.message}}</v-card-title>
        </v-card>
      </v-flex>
      <v-layout row class="text-xs-center">
        <v-flex>
          <v-pagination
            v-model="page"
            :length="items.length"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          ></v-pagination>
        </v-flex>
      </v-layout> </v-layout
  ></v-container>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      page: 1,
       items: [
      { message: 'Foo' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' },
      { message: 'Bar' }
    ]
    };
  }
};
</script>

<style></style>
