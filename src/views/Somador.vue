<template>
<v-container>
  <v-layout>
    <v-btn icon @click="resetPlayers">
      <v-icon>clear_all</v-icon>
    </v-btn>
    <v-spacer />
    <v-btn icon @click="addPlayer">
      <v-icon>add</v-icon>
    </v-btn>
  </v-layout>
  <v-card class="ma-3 pa-4">
    <v-layout wrap>
      <v-flex v-for="(playerObject, playerIndex) in dynamicPlayers" :key="playerIndex">
        <v-card class="pa-3 ma-2 elevation-2">
          <v-layout class="my-3" column align-center>
            <p class="my-0 text-xs-center headline"><span contenteditable="true">{{ playerObject.name }}</span> - {{ totalScore(playerIndex) }}</p>
            <v-divider width="80px" />
          </v-layout>

          <v-layout class="ma-4" wrap>
            <v-text-field v-model="playerObject.input" @keyup.enter="soma(playerIndex)" inputmode="numeric" />
            <v-btn @click="soma(playerIndex)" icon>
              <v-icon>add_circle</v-icon>
            </v-btn>
          </v-layout>
          <p :key="score" v-for="score in playerObject.scoreList"><span>{{ score }}</span></p>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</v-container>
</template>

<script>
export default {
  name: 'home',
  data: () => ({
    dynamicPlayers: []
  }),
  methods: {
    totalScore(playerIndex) {
      let total = 0
      for (let score of this.dynamicPlayers[playerIndex].scoreList) {
        total += Number(score)
      }
      return total.toLocaleString()
    },
    soma(playerIndex) {
      this.dynamicPlayers[playerIndex].scoreList.push(this.dynamicPlayers[playerIndex].input)
      this.dynamicPlayers[playerIndex].input = null
    },
    addPlayer() {
      const newPlayerName = `Jogador ${this.dynamicPlayers.length + 1}`
      this.dynamicPlayers.push({
        name: newPlayerName,
        input: null,
        scoreList: []
      })
    },
    resetPlayers() {
      this.dynamicPlayers = []
      this.addPlayer()
      this.addPlayer()
    }
  },
  mounted() {
    this.resetPlayers()
  }
}
</script>

<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
