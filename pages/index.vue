<template>
<v-layout style="height: 100vh" class="pa-5" @click="next" column justify-center align-center>
      <p class="ma-5 pa-5 pb-0 subheading">{{ afirmative }}</p>
        <div style="background-color: #ffe066; width: 40px; height: 4px" />
    </v-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      afirmatives: [
    "At any given moment in my life, I have the choice to be happy.",
    "I always choose it!",
    "I am a calm and tranquil person",
    "I have a vibrant and vigorous posture",
    "I am positive",
    "I am free of judgement",
    "I give only constructive criticism",
    "I accept the choices of others",
    "I know that everyone has their own pace and way of dealing with situations",
    "I live my own life",
    "I love my life",
    "I help people in the way they wish to be helped",
    "People know what is better for them",
    "I radiate happiness inside me and in others ",
    "I smile all the time",
    "I am grateful for life and all that happens inside it",
    "My mind is capable of anything",
    "I feel ready for every oportunity that life brings me ",
    "I am sorrounded by love",
    "I inspire others to do what makes them happy, but their choices are what matters",
    "I respect people's personal space ",
    "I deal with confrontation in the most peaceful manner",
    "I am responsible for My behaviour and My choices, only",
    "I make daring moves towards my dreams, everyday, that makes me unstoppable",
    "I do the impossible",
    "I feel free",
    "We live all around the world",
    "I follow a healthy diet ",
    "My body is perfectly healthy. It can deal with any sickness right away",
    "I exercise everyday",
    "I am extremely grateful for my life. ",
    "My expectations are low, my surprises are high ",
    "I am an extremely inteligent student, who learns anything with ease",
    "I use my time to be happy",
    "In anything i do, i always succeed, because what i am doing is learning, growing and becoming better than i was before",
    "I chase freedom ",
    "I am great at meditating",
    "I am serene and act to situations with patience and tolerance",
    "My breath is calm and deep",
    "I am and have been useful",
    "I am great at inducing and influencing others",
    "I am careful with what I lead people into and what I propagate",
    "My days are filled with only good habits"
  ],
      index: 0
    }
  },
  computed: {
    afirmative() {
      return this.afirmatives[this.index]
    }
  },
  methods: {
    ...mapActions(['disableToolbar']),
        shuffle(array) {
      let currentIndex = array.length;
      let randomIndex = 0;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    },
    reset() {
      this.afirmatives = this.shuffle(this.afirmatives);
      this.index = 0;
    },
    next() {
      this.index += 1
      if (this.index >= this.afirmatives.length) {
        this.reset();
      }
    }
  },
  mounted() {
    this.disableToolbar();
    this.reset();
    this.next();
  }
}
</script>
