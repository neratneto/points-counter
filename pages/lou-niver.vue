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
    <v-flex class="fill-height flex" v-if="memoriesLoading">
      <v-row style="min-height: 400px" align="center" justify="center">
        <v-progress-circular indeterminate color="primary" size="160"></v-progress-circular>
      </v-row>
    </v-flex>
    <v-flex v-else style="overflow-x: auto;" :class="expand && 'flex-column'" class="d-flex my-2">
      <v-card
        class="ma-2"
        min-width="300"
        min-height="400"
        v-for="(memory, index) in memories"
        :key="index"
      >
        <v-img
          style="background-color: #eaeaea; height: 300;"
          min-height="300"
          max-height="300"
          :contain="true"
          :src="memory.photoURL"
          @click="changeModalPhoto(memory.photoURL)"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="primary lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-card-text style="max-height: 64px; overflow-y: auto">
          <p class="pa-0 ma-0">{{ memory.note }}</p>
          </v-card-text>
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
            label="Manda ai uma lembrança! (somente 1 foto por post)"
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
    <ImageModal :photoURL.sync="modalPhoto" />
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ImageModal from '../components/ImageModal'

export default {
  components: {ImageModal},
  data() {
    return {
      photoURL: null,
      sender: null,
      note: null,
      loading: false,
      expand: false,
      isAdmin: false,
      memoriesLoading: true,
      modalPhoto: null
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
      "deleteDocument",
      "deleteImage"
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
      if (!this.photoURL) {
        alert("Ta faltando a foto aqui...");
        return;
      }
      if (!this.photoURL) {
        alert("Ta faltando uma descrição...");
        return;
      }
      if (!this.photoURL) {
        alert("Ta faltando dizer quem ta mandando...");
        return;
      }
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
      alert("Obrigado pelo envio, manda mais uma se tiver!");
      this.loading = false;
    },
    async deleteNote(memory) {
      // await this.deleteImage(memory.photoURL);
      await this.deleteDocument({
        collectionName: "louniver",
        documentId: memory.id
      });
    },
    changeModalPhoto(photo) {
      this.modalPhoto = ''
      this.$nextTick(() => {
        this.modalPhoto = photo
      })
    }
  },
  async mounted() {
    this.memoriesLoading = true;
    await this.getMemories();
    this.memoriesLoading = false;
    this.isAdmin = Boolean(this.$route.query.admin) 
  }
};
</script>