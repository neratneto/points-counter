<template>
  <v-container>
    <v-layout>
      <v-btn icon @click="deleteAll">
        <v-icon>clear_all</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn icon @click="changeNames">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn icon @click="addPlayer">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <v-card class="ma-3 pa-4">
      <v-layout wrap>
        <v-flex
          v-for="(playerObject, playerIndex) in currentGame.dynamicPlayers"
          :key="playerIndex"
        >
          <v-card class="pa-3 ma-2 elevation-2">
            <v-layout class="my-3" column align-center>
              <p class="my-0 text-xs-center headline">
                <v-text-field v-model="playerObject.name" v-if="editNames" />
                <span v-else>{{ playerObject.name }}</span>
                - {{ totalScore(playerIndex) }}
              </p>
              <v-divider width="80px" />
            </v-layout>

            <v-layout class="ma-4" wrap>
              <v-text-field
                v-model="playerObject.input"
                @keyup.enter="soma(playerIndex)"
                inputmode="numeric"
                type="number"
              />
              <v-btn @click="soma(playerIndex)" icon>
                <v-icon>add_circle</v-icon>
              </v-btn>
            </v-layout>
            <p :key="score" v-for="(score, scoreIndex) in playerObject.scoreList">
              <v-btn text @click="deleteScore(playerIndex, scoreIndex)">
                <v-icon left>delete</v-icon>
                {{ score }}
              </v-btn>
            </p>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const collectionName = "tranca";

export default {
  data: () => ({
    currentGame: {},
    gameId: null,
    editNames: false
  }),
  computed: {
    ...mapGetters(["getDocument"])
  },
  methods: {
    ...mapActions(["updateDocument", "getCollection", "addDocument"]),
    totalScore(playerIndex) {
      let total = 0;
      for (let score of this.currentGame.dynamicPlayers[playerIndex]
        .scoreList) {
        total += Number(score);
      }
      return total.toLocaleString();
    },
    async soma(playerIndex) {
      this.currentGame.dynamicPlayers[playerIndex].scoreList.push(
        this.currentGame.dynamicPlayers[playerIndex].input
      );
      this.currentGame.dynamicPlayers[playerIndex].input = null;
      await this.updateDocument({
        collectionName,
        documentId: this.gameId,
        body: this.currentGame
      });
    },
    async deleteScore(playerIndex, scoreIndex) {
      this.$delete(
        this.currentGame.dynamicPlayers[playerIndex].scoreList,
        scoreIndex
      );
      await this.updateDocument({
        collectionName,
        documentId: this.gameId,
        body: this.currentGame
      });
    },
    async addPlayer() {
      const newPlayerName = `Jogador ${this.currentGame.dynamicPlayers.length +
        1}`;
      this.currentGame.dynamicPlayers.push({
        name: newPlayerName,
        input: null,
        scoreList: []
      });
      await this.updateDocument({
        collectionName,
        documentId: this.gameId,
        body: this.currentGame
      });
    },
    async resetPlayers() {
      this.currentGame.dynamicPlayers = [];
      this.addPlayer();
      this.addPlayer();
      await this.updateDocument({
        collectionName,
        documentId: this.gameId,
        body: this.currentGame
      });
    },
    deleteAll() {
      if (
        confirm(
          "Deseja mesmo apagar todas as pontuações? Isso não é reversível."
        )
      ) {
        this.resetPlayers();
      }
    },
    async changeNames() {
      this.editNames = !this.editNames;
      await this.updateDocument({
        collectionName,
        documentId: this.gameId,
        body: this.currentGame
      });
    },
    async createGame() {
      const newGameId = await this.addDocument({
        collectionName,
        body: {
          new: true
        }
      }); // creates a new game and saves the id
      this.$router.push(`/tranca?gameId=${newGameId}`)
    }
  },
  mounted() {
    this.getCollection(collectionName).then(async () => {
      this.gameId = this.$route.query.gameId;
      this.currentGame = this.getDocument({
        collectionName,
        documentId: this.gameId
      });
      if (this.currentGame === undefined || !this.gameId) await this.createGame();
      else if (this.currentGame.new) {
        await this.updateDocument({
          collectionName,
          documentId: this.gameId,
          body: { new: false }
        });
        this.resetPlayers();
      }
    });
  }
};
</script>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
