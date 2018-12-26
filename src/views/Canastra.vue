<template>
<v-container>
  <v-card class="ma-3 pa-4">
    <v-layout class="my-4" column align-center>
      <p class="display-2 my-0">{{ totalEu.toLocaleString() }} / {{ totalEla.toLocaleString() }}</p>
      <v-divider width="160px" />
    </v-layout>
    <v-layout wrap>
      <v-flex xs6>
        <v-card class="pa-3 ma-2 elevation-2">
          <v-layout class="my-3" column align-center>
            <p contenteditable="true" class="my-0 text-xs-center headline">EU</p>
            <v-divider width="80px" />
          </v-layout>

          <v-layout class="ma-4" wrap>
            <v-text-field v-model="inputEu" @keyup.enter="somaEu" />
            <v-btn @click="somaEu" icon>
              <v-icon>add_circle</v-icon>
            </v-btn>
          </v-layout>
          <p :key="score" v-for="score in euScoreList"><span>{{ score }}</span></p>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card class="pa-3 ma-2 elevation-2">
          <v-layout class="my-3" column align-center>
            <p contenteditable="true" class="my-0 text-xs-center headline">ELA</p>
            <v-divider width="80px" />
          </v-layout>

          <v-layout class="ma-4" wrap>
            <v-text-field v-model="inputEla" @keyup.enter="somaEla" />
            <v-btn @click="somaEla" icon>
              <v-icon>add_circle</v-icon>
            </v-btn>
          </v-layout>
          <p :key="score" v-for="score in elaScoreList"><span>{{ score }}</span></p>
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
    inputEu: null,
    inputEla: null,
    euScoreList: [],
    elaScoreList: []
  }),
  computed: {
    totalEu() {
      let total = 0
      for (let score of this.euScoreList) {
        total += Number(score)
      }
      return total
    },
    totalEla() {
      let total = 0
      for (let score of this.elaScoreList) {
        total += Number(score)
      }
      return total
    }
  },
  methods: {
    somaEu(event) {
      const value = event.target.value || this.inputEu
      this.euScoreList.push(value)
      this.inputEu = null
    },
    somaEla(event) {
      const value = event.target.value || this.inputEla
      this.elaScoreList.push(value)
      this.inputEla = null
    }
  }
}
</script>
