<template>
  <div class="home">
    <HeaderBar></HeaderBar>
    <div class="centeredContent">
      <div class="spaceTitle"></div>
      <h2>Top Recently Pensions</h2>
      <div class="ui segment">
        <div v-if="pensions.length != 0">
          <div class="ui three stackable cards">
            <div v-for="(pension, index) in pensions" :key="index">
              <div class="cardEdit">
                <div class="ui segment">
                  <div class="cardInner">
                  <div class="pensionCover">
                    <img v-bind:src="pensionsPics[index]" width="100%" height="100%">
                    <!-- <div class="starIcon">
                      <div v-if="true">
                        <i class="yellow big star icon"></i>
                      </div>
                      <div v-else>
                        <i class="yellow big star outline  icon"></i>
                      </div>
                    </div> -->
                  </div>
                  <div class="extra">
                    <a v-on:click.prevent="pensionDetails(pension.id)"><p class="pName">{{pension.name}}</p></a>
                    <p class="pLocation">{{pension.location}}</p>
                    <p class="pType">{{pension.type}}</p>
                    <p class="pPrice">$ {{pension.price}} / {{pension.price_unit}}</p>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div v-else>
            <div class="ui centered grid">
              <br>
              <div class="centerMessage">
                <p>There are currently no pensions to show.</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'
import firebase from 'firebase'

export default {
  name: 'Home',
  components: {
    HeaderBar
  },
  data(){
    return{
      pensions: [],
      pensionsPics: [],
      // pensions2: [
      //   {
      //     cover: 'https://media-cdn.tripadvisor.com/media/photo-s/0b/35/10/3e/pension-iturriza.jpg',
      //     name: 'Pension comoda con parque cercano',
      //     location: 'Barranquilla',
      //     type: 'Cuarto Apartamento',
      //     price: '300.000',
      //     price_unit: 'mes',
      //   },
      //   {
      //     cover: 'http://www.casagalin.com/imagftp/ims_DSC4674.jpg',
      //     name: 'Apartamento completo con todo incluido',
      //     location: 'Medellin',
      //     type: 'Apartamento Completo',
      //     price: '500.000',
      //     price_unit: 'mes',
      //   },
      //   {
      //     cover: 'https://media-cdn.tripadvisor.com/media/photo-s/12/0a/e0/43/apartamento-de-dos-dormitorios.jpg',
      //     name: 'Cuarto completo amoblado',
      //     location: 'Bogota',
      //     type: 'Cuarto Apartamento',
      //     price: '600.000',
      //     price_unit: 'mes',
      //   },
      //   {
      //     cover: 'http://www.pension-altair.com/images/apartamento-02.jpg',
      //     name: 'Pension comoda con parque cercano',
      //     location: 'Barranquilla',
      //     type: 'Cuarto Apartamento',
      //     price: '300.000',
      //     price_unit: 'mes',
      //   },
      //   {
      //     cover: 'http://www.pensioncandelaria.com/images/Pension-Candelaria/12-Habitacion-15-Pension-Candelaria.jpg',
      //     name: 'Apartamento completo con todo incluido',
      //     location: 'Medellin',
      //     type: 'Apartamento Completo',
      //     price: '500.000',
      //     price_unit: 'mes',
      //   },
      //   {
      //     cover: 'https://aff.bstatic.com/images/hotel/840x460/921/92148049.jpg',
      //     name: 'Cuarto completo amoblado',
      //     location: 'Bogota',
      //     type: 'Cuarto Apartamento',
      //     price: '600.000',
      //     price_unit: 'mes',
      //   },
      // ]

    }
  },
  methods: {
    pensionDetails(){
      this.$router.push('/pensionDetails');
    },
    checkToken(){
      if (this.$cookie.get('secret') != null) {
        console.log('HAY SESION INICIADA')
      } else {
        this.$router.push('/loginRegister');
      }
    },
    loadUserPensions() {
      var databaseRef = firebase.database().ref('pensions');
      const that = this;
      databaseRef.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
              if (childData.space_available != 0) {
                var pensionObject = {
                    id: childKey,
                    name: childData.name,
                    location: childData.location,
                    type: childData.type,
                    price: childData.price,
                    price_unit: childData.price_unit,
                    description: childData.description
                }
                that.pensions.push(pensionObject);
              }
              that.loadPensionPictures(childKey);
          });
      });
    },
    async loadPensionPictures(id){
      const that = this;
      var storageRef = firebase.storage().ref('pensions/' + id + '/0');
      var picURL = storageRef.getDownloadURL().then(function(url) {
        console.log('url',url);
        that.pensionsPics.push(url);
      }).catch(error => {
        // console.log('Error',error.message);
      });
    },
    pensionDetails(id){
      console.log('id',id);
      this.$cookie.set('pension_details', id, 1);
      setTimeout(() => this.$router.push('/pensionDetails'), 100);
    }
  },
  created(){
    this.checkToken();
    this.loadUserPensions();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .centeredContent {
    margin: auto;
    max-width: 1110px;
  }
  .pName {
    font-weight: bold;
    font-size: 16px;
    color: black;
  }
  .pName:hover{
    color: #5d8aa8;
    cursor: pointer;
  }
  .pLocation{
    font-size: 14px;
    color: grey;
  }
  .pType {
    font-size: 14px;
    color: grey;
    font-weight: bold;
  }
  .pPrice{
    font-size: 19px;
    color: black;
  }
  .pensionCover{
    max-height: 210px;
    height: 100%;
    margin-bottom: 10px;
  }
  .cardEdit{
    margin: 9px;
    margin-bottom: 0px;
    padding: 5px;
    width: 350px;
    height: 400px;
  }
  .cardInner{
    height: 360px;
  }
  .spaceTitle {
    height: 0px;
  }
  .starIcon{
    margin-top: -67%;
    margin-left: 88%;
    cursor: pointer;
  }
  .centerMessage{
      margin: 15px;
  }
</style>
