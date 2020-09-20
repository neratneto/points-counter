<template>
  <v-container flex align-items="center" justify-content="center">
    <v-card>
      <v-card-title>Image Game - Play Mode</v-card-title>
      <v-card-text>
        <span>
          If you wish to add images, go to
          <a @click="$router.push({ name: 'image-game-editor' })">Editor Mode</a>.
        </span>
      </v-card-text>
    </v-card>
    <v-flex class="fill-height flex" v-if="imagesLoading">
      <v-row style="min-height: 400px" align="center" justify="center">
        <v-progress-circular indeterminate color="primary" size="160"></v-progress-circular>
      </v-row>
    </v-flex>
    <v-flex v-if="selectedCard">
      <v-card class="ma-5 pa-5">
          <v-img max-height="300" :contain="true" v-if="selectedCard.photoURL" :src="selectedCard.photoURL" />
          <v-text-field v-model="selectedTip" label="Tip" placeholder="What's your tip?"></v-text-field>
                  <v-card-actions>
          <v-btn :loading="loading" @click="submitTip">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <HandOfCards
      v-else
      :cardsInHand.sync="cardsInHand"
      :modalPhoto.sync="modalPhoto"
      @cardSelected="cardSelected"
    />
    <v-flex></v-flex>
    <ImageModal :photoURL.sync="modalPhoto" />
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ImageModal from "../components/ImageModal";
import HandOfCards from "../components/HandOfCards";
const collectionName = "imagegame";

const shuffleArray = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export default {
  components: { ImageModal, HandOfCards },
  data() {
    return {
      photoURL: null,
      sender: null,
      loading: false,
      expand: false,
      isAdmin: false,
      imagesLoading: true,
      modalPhoto: null,
      cardsInHand: [],
      deck: [],
      selectedCard: null,
      selectedTip: null,
    };
  },
  computed: {
    ...mapState({
      images: (state) => state[collectionName],
    }),
  },
  methods: {
    ...mapActions(["updateDocument", "getCollection"]),
    async getimages() {
      await this.getCollection(collectionName);
    },
    addCardToHand() {
      const firstCardOfDeck = this.deck.shift();
      // if (!this.cardsInHand.includes(firstCardOfDeck)) {
      this.cardsInHand.push(firstCardOfDeck);
      console.log("added a card to hand");
      // }
    },
    addMultipleCardsToHand(amount) {
      console.log("adding cards to hand", amount);
      Array(amount)
        .fill(amount)
        .forEach((i) => {
          console.log("a");
          this.addCardToHand();
        });
    },
    shuffleDeck() {
      this.deck = shuffleArray(this.images);
    },
    cardSelected(card) {
      this.selectedCard = card;
      this.selectedTip = null;
      this.cardsInHand = this.cardsInHand.filter(c => card.id !== c.id)
      this.addCardToHand();
    },
    submitTip() {
      console.log(`Tip submitted: ${this.selectedTip} - ${this.selectedCard.photoURL}`, this.selectedCard)
      this.selectedTip = null
      this.selectedCard = null
    }
  },
  async mounted() {
    this.imagesLoading = true;
    await this.getimages();
    this.shuffleDeck();
    this.addMultipleCardsToHand(4);
    this.imagesLoading = false;
    this.isAdmin = Boolean(this.$route.query.admin);
  },
};
</script>