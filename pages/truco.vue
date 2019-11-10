<template lang="html">
  <v-container align-center fill-height justify-center>
    <v-card v-if="escuro" color="black" class="escurinho elevation-5">
      <p class="title font-weight-black">11 a 11</p>
      <p class="title font-weight-black">Escurinho!</p>
      <p class="title font-weight-black">Ninguém vê nada!</p>
<v-divider class="my-5" dark />
      <p class="title font-weight-black">Quem ganhou?</p>
      <v-btn large  @click="ganharEscuro('nos')">Nos</v-btn>
      <v-btn large  @click="ganharEscuro('eles')">Eles</v-btn>
    </v-card>
    <v-layout  v-else-if="!winner" wrap>
      <v-dialog persistent width="300px" v-model="maoDeOnze.dialog">
      <v-card class="pa-2">
        <p class="headline">Mão de Onze!</p>
        <p class="subheading my-4">Vão jogar?</p>
        <v-btn large color="green" @click="simOnze">Sim</v-btn>
        <v-btn large color="red" @click="naoOnze">Não</v-btn>
      </v-card>
    </v-dialog >
      <v-flex class="my-3 "  >
        <p class="title">Nós</p><p class="title">{{ nosCounter }}</p>
        <v-btn large class="green" small :disabled="maoDeOnze.dialog" @click="somarnos">Somar {{ valorRodada }} tentos <v-icon right>add</v-icon></v-btn>
      </v-flex>
      <v-flex class="my-3" >
        <p class="title">Eles</p><p class="title">{{ elesCounter }}</p>
        <v-btn large class="green" small :disabled="maoDeOnze.dialog" @click="somareles">Somar {{ valorRodada }} tentos <v-icon right>add</v-icon></v-btn>
      </v-flex>
      <v-flex xs12 class="my-5">
      <v-btn large class="red" @click="voltar">Voltar pontuação <v-icon right>undo</v-icon></v-btn>
      <v-btn large class="yellow" @click="aumentarTento">Aumentar tento <v-icon right>trending_up</v-icon></v-btn>
      <v-layout class="mt-5" row wrap>
        <v-spacer />
        <v-btn @click="reset">Recomeçar jogo<v-icon right>settings_backup_restore</v-icon></v-btn>
      </v-layout>
    </v-flex>
    </v-layout>
    <v-card v-else class="pa-4 elevation-5">
      <v-icon large class="my-2">done_outline</v-icon>
      <v-divider class="my-3" />
      <p class="headline my-4">Parabéns para {{ this.winner }}, ganhadores!</p>
      <v-btn large color="blue" @click="reset">Próxima rodada</v-btn>
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
      this.pointsWatcher()
    },
    elesCounter(value, oldvalue) {
      this.pointsWatcher()
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
    pointsWatcher() {
      for (let time of ['nos', 'eles']) {
        if (this[`${time}Counter`] === 11) {
          if (this.nosCounter === this.elesCounter) {
            this.escuro = true
          }
          this.maoDeOnze = {
            dialog: true,
            quem: time
          }
        }
        if (this[`${time}Counter`] >= 12) {
          this.winner = time
        }
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
.escurinho {
  color: white !important;
  border-radius: 16px !important;
  padding: 64px;
}
</style>
