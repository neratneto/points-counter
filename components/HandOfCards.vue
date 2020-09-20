<template>
  <v-flex style="overflow-x: auto;" :class="expand && 'flex-column'" class="d-flex my-2">
    <v-card
      class="ma-2"
      min-width="300"
      min-height="400"
      v-for="(card, index) in cardsInHand"
      :key="index"
    >
      <v-img
        style="background-color: #eaeaea; height: 300;"
        min-height="300"
        max-height="300"
        :contain="true"
        :src="card.photoURL"
        @click="changePhotoModal(card.photoURL)"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="primary lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-btn @click="selectCard(card)">Select</v-btn>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["cardsInHand", "modalPhoto"],
  data: {},
  methods: {
    changePhotoModal(photo) {
      this.$emit("update:modalPhoto", "");
      this.$nextTick(() => {
        this.$emit("update:modalPhoto", photo);
      });
    },
    selectCard(card) {
      this.$emit("cardSelected", card);
    },
  },
};
</script>