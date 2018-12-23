<template lang="html">
  <v-container>
    <v-card v-if="escuro" color="black" style="color: white">
<p >Escuro!</p>
<p>Ninguém vê nada!</p>
<p>Quem ganhou?</p>
<v-btn @click="ganharEscuro('nos')">Nos</v-btn>
<v-btn @click="ganharEscuro('eles')">Eles</v-btn>
    </v-card>
  <v-card v-else class="ma-3 pa-4">
    <v-layout  v-if="!winner" wrap>
      <v-dialog persistent width="300px" v-model="maoDeOnze.dialog">
      <v-card class="pa-2">
        <p class="headline">Mão de Onze!</p>
        <p class="subheading my-4">Vão jogar?</p>
        <v-btn color="green" @click="simOnze">Sim</v-btn>
        <v-btn color="red" @click="naoOnze">Não</v-btn>
      </v-card>
    </v-dialog >
      <v-flex xs6 class="my-3 "  >
        <p>Nós</p><p>{{ nosCounter }}</p>
        <v-btn class="green" small :disabled="maoDeOnze.dialog" @click="somarnos">Somar {{ valorRodada }} tentos</v-btn>
      </v-flex>
      <v-flex xs6 class="my-3" >
        <p>Eles</p><p>{{ elesCounter }}</p>
        <v-btn class="green" small :disabled="maoDeOnze.dialog" @click="somareles">Somar {{ valorRodada }} tentos</v-btn>
      </v-flex>
      <v-flex xs12 class="my-5">
      <v-btn class="red" @click="voltar">Voltar pontuação</v-btn>
      <v-btn class="yellow" @click="aumentarTento">Aumentar tento</v-btn>
    </v-flex>
    </v-layout>
    <v-layout v-else wrap>
      <p>{{ this.winner }} ganharam!</p>
      <v-btn color="blue" @click="reset">Próxima rodada</v-btn>
    </v-layout>
  </v-card>
</v-container>
</template>

<script>
export default {
  data: () => ({
    nosCounter: 10,
    elesCounter: 10,
    valorRodada: 1,
    ultimaRodada: {
      valor: 1,
      time: null
    },
    maoDeOnze: {
      dialog: false,
      quem: null
    },
    winner: null,
    escuro: false
  }),
  watch: {
    nosCounter(value, oldvalue) {
      this.pointsWatcher(value, oldvalue, 'nos')
    },
    elesCounter(value, oldvalue) {
      this.pointsWatcher(value, oldvalue, 'eles')
    }
  },
  methods: {
    somarnos() {
      this.nosCounter += this.valorRodada
      this.ultimaRodada = {
        valor: this.valorRodada,
        time: 'nos'
      }
      this.valorRodada = 1
    },
    somareles() {
      this.elesCounter += this.valorRodada
      this.ultimaRodada = {
        valor: this.valorRodada,
        time: 'eles'
      }
      this.valorRodada = 1
    },
    aumentarTento() {
      switch (this.valorRodada) {
        case 1:
          this.valorRodada = 3
          break
        case 3:
          this.valorRodada = 6
          break
        case 6:
          this.valorRodada = 9
          break
        case 9:
          this.valorRodada = 12
          break
        case 12:
          this.valorRodada = 1
          break
      }
    },
    voltar() {
      if (this.ultimaRodada.time) {
        this[`${this.ultimaRodada.time}Counter`] -= this.ultimaRodada.valor
        this.ultimaRodada.valor = -this.ultimaRodada.valor
      }
    },
    pointsWatcher(value, oldvalue, time) {
      if (value === 11) {
        if (this.nosCounter === this.elesCounter) {
          this.escuro = true
        }
        this.maoDeOnze = {
          dialog: true,
          quem: time
        }
      }
      if (value >= 12) {
        this.winner = time
      }
    },
    reset() {
      this.winner = null
      this.elesCounter = 0
      this.nosCounter = 0
      this.valorRodada = 1
      this.maoDeOnze = false
      this.ultimaRodada = {
        valor: 1,
        time: null
      }
    },
    simOnze() {
      this.maoDeOnze.dialog = false
      this.valorRodada = 3
    },
    naoOnze() {
      this[`${this.ultimaRodada.time}Counter`] -= 1
      this.nosCounter += 1
      this.elesCounter += 1
    },
    ganharEscuro(time) {
      this.escuro = false
      this[`${time}Counter`] = 12
    }
  }
}
</script>

<style lang="css">
</style>
