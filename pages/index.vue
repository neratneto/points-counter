<template>
  <v-layout column justify-center align-center>
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
          <v-btn class="ma-3" color="primary" @click="newGame('truco')">Novo contador de truco</v-btn>
          <v-btn class="ma-3" color="success" @click="newGame('tranca')">Novo contador de tranca</v-btn>
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
    async newGame(gameType) {
      this.loading = true; // start the loading
      const newGameId = await this.addDocument({
        collectionName: gameType,
        body: {
          new: true
        }
      }); // creates a new game and saves the id
      this.goToGame(newGameId, gameType); // reroutes to the game id
    },
    goToGame(gameId, gameType) {
      this.loading = true; // start the loading
      this.$router.push(`/${gameType}?gameId=${gameId}`); // reroutes to the new game's route
      this.loading = false; // stops the loading
    }
  }
};
</script>
