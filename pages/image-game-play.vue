<template>
  <v-container flex align-items="center" justify-content="center">
    <v-card>
      <v-card-title>Image Game - Play Mode</v-card-title>
      <v-card-text>
        <span>If you wish to add images, go to <a @click="$router.push({ name: 'image-game-editor' })">Editor Mode</a>.</span>
      </v-card-text>
    </v-card>
    <v-flex class="fill-height flex" v-if="imagesLoading">
      <v-row style="min-height: 400px" align="center" justify="center">
        <v-progress-circular indeterminate color="primary" size="160"></v-progress-circular>
      </v-row>
    </v-flex>
    <v-flex v-else style="overflow-x: auto;" :class="expand && 'flex-column'" class="d-flex my-2">
      <v-card
        class="ma-2"
        min-width="300"
        min-height="400"
        v-for="(image, index) in images"
        :key="index"
      >
        <v-img
          style="background-color: #eaeaea; height: 300;"
          min-height="300"
          max-height="300"
          :contain="true"
          :src="image.photoURL"
          @click="changePhotoModal(image.photoURL)"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="primary lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-card-actions>
          <v-spacer></v-spacer>
          <p style="font-size: 8px" class="ml-2 mt-2">{{ image.sender }}</p>
          <v-btn v-if="isAdmin" @click="deleteImage(image)">Apagar</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex>
    </v-flex>
    <ImageModal :photoURL.sync="modalPhoto" />
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ImageModal from '../components/ImageModal'
const collectionName = 'imagegame'

export default {
  components: {ImageModal},
  data() {
    return {
      photoURL: null,
      sender: null,
      loading: false,
      expand: false,
      isAdmin: false,
      imagesLoading: true,
      modalPhoto: null
    };
  },
  computed: {
    ...mapState({
      images: state => state[collectionName]
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
    async getimages() {
      await this.getCollection(collectionName);
    },
    async vfileAdded(file) {
      this.loading = true;
      this.photoURL = await this.addImage(file);
      this.loading = false;
    },
    async submit() {
      if (!this.photoURL) {
        alert("Please select an image.");
        return;
      }
      if (!this.sender) {
        alert("We need to know who sent it, for credits! You may use an alias.");
        return;
      }
      this.loading = true;
      this.addDocument({
        collectionName,
        body: {
          photoURL: this.photoURL,
          note: this.note,
          sender: this.sender
        }
      });
      this.photoURL = null;
      this.note = null;
      alert("Thank you for your submission! Your contribution is greatly appreciated. Send us more whenever you want!");
      this.loading = false;
    },
    async deleteImage(image) {
      try {
        await this.deleteDocument({
          collectionName,
          documentId: memory.id
        });
        await this.deleteImage(image.photoURL);
      } catch (err) {
        alert(`An error has ocurred: ${JSON.stringify(err)}`)
      }
    },
    changePhotoModal(photo) {
      this.modalPhoto = ''
      this.$nextTick(() => {
        this.modalPhoto = photo
      })
    }
  },
  async mounted() {
    this.imagesLoading = true;
    await this.getimages();
    this.imagesLoading = false;
    this.isAdmin = Boolean(this.$route.query.admin) 
  }
};
</script>