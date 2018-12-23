<template>
<v-container>
  <v-card class="ma-3 pa-4">
    <v-layout wrap>
      <v-flex>
        <v-card class="pa-3 ma-2 elevation-2">
          <v-toolbar color="green" class="text-xs-center">
            <p style="color: white" contenteditable="true" class="title">EU</p>
          </v-toolbar>
          <v-text-field v-model="inputEu" @keyup.enter="somaEu" />
          <p :key="score" v-for="score in euScoreList"><span>{{ score }}</span></p>
          <p><strong>{{ totalEu }}</strong></p>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card class="pa-3 ma-2 elevation-2">
          <v-toolbar color="blue" class="text-xs-center">
            <p style="color: white" contenteditable="true" class="title">ELA</p>
          </v-toolbar>
          <v-text-field v-model="inputEla" @keyup.enter="somaEla" />
          <p :key="score" v-for="score in elaScoreList"><span>{{ score }}</span></p>
          <p><strong>{{ totalEla }}</strong></p>
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
      this.euScoreList.push(event.target.value)
      this.inputEu = null
    },
    somaEla(event) {
      this.elaScoreList.push(event.target.value)
      this.inputEla = null
    }
  }
}
</script>
