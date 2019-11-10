import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Material+Icons'
      }
    ]

  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['nuxt-fire', {
      config: {
        development: {
          apiKey: "AIzaSyCEk3uUsSjCgSZ74DI_i1VLz8rYHbrq2Uk",
          authDomain: "points-counter-7f2e4.firebaseapp.com",
          databaseURL: "https://points-counter-7f2e4.firebaseio.com",
          projectId: "points-counter-7f2e4",
          storageBucket: "points-counter-7f2e4.appspot.com",
          messagingSenderId: "336663781136",
          appId: "1:336663781136:web:64f92b15e0c8cc5a3a8f95",
          measurementId: "G-0T9VS5L1MJ"
        },
        production: {
          apiKey: "AIzaSyCEk3uUsSjCgSZ74DI_i1VLz8rYHbrq2Uk",
          authDomain: "points-counter-7f2e4.firebaseapp.com",
          databaseURL: "https://points-counter-7f2e4.firebaseio.com",
          projectId: "points-counter-7f2e4",
          storageBucket: "points-counter-7f2e4.appspot.com",
          messagingSenderId: "336663781136",
          appId: "1:336663781136:web:64f92b15e0c8cc5a3a8f95",
          measurementId: "G-0T9VS5L1MJ"
        }
      },
      useOnly: ['firestore']
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
