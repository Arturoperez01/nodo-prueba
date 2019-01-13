<template>
  <div>
    <h1 v-if="isLoading">
      Cargando el personaje ...
    </h1>
    <table class="rwd-table" v-if="!isLoading">
      <th  colspan="2"><h2>{{ character.name }}</h2></th>
      <tr>
        <td><h2>Casa</h2></td>
        <td>{{ character.house ? character.house :  'Ninguno' }}</td>
      </tr>
      <tr>
        <td><h2>Sexo</h2></td>
        <td>{{ character.male ? 'Hombre' : 'Mujer' }}</td>
      </tr>
      <tr>
        <td><h2>Titulos</h2></td>
        <td v-if="character.titles.length == 0">
            <p  >
                  Sin titulos
            </p>  
        </td>
        <td v-if="character.titles.length > 0">
            <ul  v-for="title in character.titles">
              <li>
                {{ title }}
              </li>
            </ul>
        </td>
      </tr>
      <tr>
        <td><h2>Libros</h2></td>
        <td>
            <ul v-for="book in character.books">
              <li>
                {{ book }}
              </li>
            </ul>
        </td>
      </tr>
      <tr >
        <td colspan="2"> <button style="float:right" @click="goBack()">Atras</button> </td>
      </tr>
    </table>
  </div>
</template>


<script>
  import { getACharacter } from '../services/got.service.js'

  export default {
    name: 'detail-component',

    /**
     * @description the data block represents all the local variable of this component.
     */
    data () {
      return {
        character: [],
        isLoading: false,
        id: this.$route.params.id
      }
    },

    /**
     * @description the create function is the first one to be execute when the component is being created (see vue js lifecycle).
     */
    created () {
      this.isLoading = true
      
      getACharacter(this.id)
        .then(res => {
          this.character = res.data
          this.isLoading = false
        })
        //*/
    },

    /**
     * @description the methods block represents all the local methods of this component.
     */
    methods: {

      /**
       * @description go to the previous page
       * @method goBack
       */
      goBack() {
        this.$router.go(-1);        
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
    margin: 2.5em 20em 0 20em;
  }

  td, th {
    
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  ul {
    list-style: none;
  }
</style>