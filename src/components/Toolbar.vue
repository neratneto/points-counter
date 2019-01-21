<template>
<v-toolbar absolute>
  <a class="github" href="https://github.com/neratneto/points-counter">GitHub</a>
  <v-spacer />
  <v-toolbar-items>
    <v-btn flat to="/somador">Somador</v-btn>
    <v-btn flat to="/truco">Truco</v-btn>
  </v-toolbar-items>
  <v-spacer />
</v-toolbar>
</template>

<style>
.github {
  color: #868e96;
  font-weight: bold;
  text-decoration: none;
}
</style>
