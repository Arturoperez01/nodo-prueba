<template>
  <div>
    <h1 v-show="isLoading">
      Cargando personajes ...
    </h1>
    <table class = "rwd-table" v-show="!isLoading">
      <tr>
        <th>Nombre</th>
        <th>Casa</th>
        <th>Detalle</th>
      </tr>
      <tr v-for="character in characters">
        <td>{{ character.name }}</td>
        <td>{{ character.house ? character.house :  'Ninguno' }}</td>
        <td> <button @click="goToDetail(character._id)">ver detalles</button> </td>
      </tr>
    </table>
  </div>
</template>


<script>
  import { listsAllCharacters } from '../services/got.service.js'

  export default {
    name: 'list-component',

    /**
     * @description the data block represents all the local variable of this component.
     */
    data () {
      return {
        characters: [],
        isLoading: false
      }
    },

    /**
     * @description the create function is the first one to be execute when the component is being created (see vue js lifecycle).
     */
    created () {
      this.isLoading = true
      listsAllCharacters()
        .then(res => {
          this.characters = res
          this.isLoading = false
        })
    },

    /**
     * @description the methods block represents all the local methods of this component.
     */
    methods: {

      /**
       * @description get the detail of a character from the GoT API.
       * @param {string} id. the "_id" of the character that we are going to request.
       * @method goToDetail
       */
      goToDetail(id) {
        // CODE HERE
        this.$router.push({ path: 'detail/'+id  })
      }
    }
  }
</script>
<style>

body {
  padding: 0 2em;
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: #444;
  background: #eee;
}

h1 {
  font-weight: normal;
  letter-spacing: -1px;
  color: #34495E;
}

.rwd-table {
  background: #34495E;
  color: #fff;
  border-radius: .4em;
  overflow: hidden;
}
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 35em;
    margin: 0 10em 0 10em;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

</style>