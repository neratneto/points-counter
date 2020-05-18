<template>
  <v-dialog v-model="dialog">
    <v-card style="background-color: #eaeaea;">
      <v-img
        @click="dialog = false"
        max-height="90vh"
        :contain="true"
        :src="photoURL"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="primary lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["photoURL"],
  computed: {
    dialog: {
      get() {
        return Boolean(this.photoURL);
      },
      set(val) {
        if (!val) this.$emit("update:photoURL", "");
      }
    }
  }
};
</script>