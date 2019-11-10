<template>
  <v-app light>
    <v-content light>
    <toolbar />
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    Toolbar
  },
  methods: {
    ...mapActions(['initFirebase'])
  },
  async mounted() {
    await this.initFirebase()
  }
};
</script>
