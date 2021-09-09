<template>
  <v-layout column justify-center align-center>
    <v-card class="pa-3 mb-5">
      <v-card-title @click="goToGame('', 'image-game-play')">Image Game?</v-card-title>

      <v-card-text>
      <v-btn @click="goToGame('', 'image-game-play')" large  color="primary">Click here</v-btn>

        <p class="pt-5 mt-5">Quer explorar? Fique à vontade!</p>
        </v-card-text>
    </v-card>
      <v-card class="pa-3">
        <v-card-title class="headline">Bem-vindo ao contador!</v-card-title>
        <v-divider class="mt-4" />
        <v-card-text class="my-4">
          <h2 class="mx-3 mb-4">Quero ir a um jogo existente</h2>
          <v-text-field class="mx-3" solo label="ID do jogo existente" v-model="gameId"/>
          <v-btn class="ma-3 mt-0" small color="warning" @click="goToGame(gameId, 'truco')">Ir ao jogo de truco</v-btn>
          <v-btn class="ma-3 mt-0" small color="error" @click="goToGame(gameId, 'tranca')">Ir ao jogo de tranca</v-btn>
        </v-card-text>
        <v-divider />
        <v-card-text class="my-4">
          <h2  class="mx-3 mb-4">Quero criar um novo jogo</h2>
          <v-btn class="ma-3" color="primary" @click="goToGame('new', 'truco')">Novo contador de truco</v-btn>
          <v-btn class="ma-3" color="success" @click="goToGame('new', 'tranca')">Novo contador de tranca</v-btn>
        </v-card-text>
      </v-card>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({ // Variables of the pages
    loading: false, // controls the loaders
    gameId: null // variable for  keeping the inputted gameId
  }),
  methods: { // Functions of the page
    ...mapActions(["addDocument"]), // maps the existing methods
    goToGame(gameId, gameType) {
      this.loading = true; // start the loading
      this.$router.push({ name: gameType, query: { gameId } }); // reroutes to the new game's route
      this.loading = false; // stops the loading
    }
  }
};
</script>
