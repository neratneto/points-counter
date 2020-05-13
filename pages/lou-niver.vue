<template>
  <v-container flex align-items="center" justify-content="center">
    <v-card>
      <v-card-title>Seja bem vindo ao album de niver da Lou!</v-card-title>
      <v-card-text>
        <span>Abaixo você terá um arcabouço de nostalgia, aproveite.</span>
        <p>Lembrando que é surpresa, mandem pros amigos mas não pra ela!</p>
      </v-card-text>
      <v-card-text class="mt-3">
        <a @click="expand = !expand">Cadê as memórias?</a>
      </v-card-text>
    </v-card>
    <v-flex style="overflow-x: auto;" :class="expand && 'flex-column'" class="d-flex my-2">
      <v-card
        class="ma-2"
        width="300"
        height="400"
        v-for="(memory, index) in memories"
        :key="index"
      >
        <v-img
          style="background-color: #eaeaea; height: 300;"
          max-height="300"
          :contain="true"
          :src="memory.photoURL"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="primary lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-card-text>{{ memory.note }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <p style="font-size: 8px" class="ml-2 mt-2">{{ memory.sender }}</p>
          <v-btn v-if="isAdmin" @click="deleteNote(memory)">Apagar</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title>Manda ai tua foto com a Lou!</v-card-title>
        <v-card-text>
          <v-progress-linear
            v-if="loading"
            title="Revelando na IBIZA"
            v-model="loading"
            :indeterminate="true"
          ></v-progress-linear>
          <v-img max-height="300" :contain="true" v-if="photoURL" :src="photoURL" />
          <v-file-input
            v-else
            prepend-icon="mdi-camera"
            accept="image/*"
            label="Manda ai tua lembrança!"
            @change="vfileAdded"
          ></v-file-input>
          <v-text-field
            v-model="note"
            label="Sobre a lembrança"
            placeholder="Me conta um pouco sobre essa foto?"
          ></v-text-field>
          <v-text-field v-model="sender" label="Teu nome" placeholder="E teu nome ou apelido?"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn :loading="loading" @click="submit">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      photoURL: null,
      sender: null,
      note: null,
      loading: false,
      expand: false,
      isAdmin: false
    };
  },
  computed: {
    ...mapState({
      memories: state => state.louniver
    })
  },
  methods: {
    ...mapActions([
      "updateDocument",
      "getCollection",
      "addDocument",
      "addImage",
      'deleteDocument',
      'deleteImage'
    ]),
    async getMemories() {
      await this.getCollection("louniver");
    },
    async vfileAdded(file) {
      this.loading = true;
      this.photoURL = await this.addImage(file);
      this.loading = false;
    },
    async submit() {
      this.loading = true;
      this.addDocument({
        collectionName: "louniver",
        body: {
          photoURL: this.photoURL,
          note: this.note,
          sender: this.sender
        }
      });
      this.photoURL = null;
      this.note = null;
      this.sender = null;
      this.loading = false;
    },
    async deleteNote(memory) {
        await this.deleteImage(memory.photoURL)
        await this.deleteDocument({ collectionName: 'louniver', documentId: memory.id })
    }
  },
  async mounted() {
    await this.getMemories();
    this.isAdmin = localStorage.getItem('isAdmin')
  }
};
</script>