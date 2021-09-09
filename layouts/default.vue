<template>
  <v-app light>
    <v-content light>
    <toolbar v-if="toolbar" />
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Toolbar
  },
  computed: {
    ...mapState(['toolbar'])
  },
  methods: {
    ...mapActions(['initFirebase'])
  },
  async mounted() {
    await this.initFirebase()
  }
};
</script>
