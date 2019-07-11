<template>
    <div class="pensionDetails">
        <HeaderBar></HeaderBar>
        <div class="centeredContent">
            <br>
            <div class="ui segment">
                <div class="ui grid">
                    <div class="eight wide column">
                        <!-- TEST CAROUSEL -->
                        <div class="ui raised segment">
                            <carousel :per-page="1">
                                <slide class="pictureFormat">
                                    <img class="iconUser" v-bind:src="pensionInfo.pictures[0]" width="100%">
                                </slide>
                                <slide class="pictureFormat">
                                    <img class="iconUser" v-bind:src="pensionInfo.pictures[1]" width="100%">
                                </slide>
                                <slide class="pictureFormat">
                                    <img class="iconUser" v-bind:src="pensionInfo.pictures[2]" width="100%">
                                </slide>
                                <slide class="pictureFormat">
                                    <img class="iconUser" v-bind:src="pensionInfo.pictures[3]" width="100%">
                                </slide>
                            </carousel>
                        </div>
                    </div>
                    <div class="eight wide column">
                        <!-- <div class="ui segment"></div>
                        <h1>Google API Embeded</h1> -->
                        <!-- <h2>Location</h2> -->
                        <!-- <img class="iconUser" src="../assets/images/demo/googleAPI.png" width="100%"> -->
                        <div class="ui raised segment">
                            <GmapMap
                                :center="{lat:10.96854, lng:-74.79032}"
                                :zoom="12"
                                map-type-id="terrain"
                                style="width: 500px; height: 395px"
                                >
                                <GmapMarker
                                    :key="index"
                                    v-for="(m, index) in markers"
                                    :position="m.position"
                                    :clickable="true"
                                    :draggable="false"
                                    @click="center=m.position"
                                />
                            </GmapMap>
                        </div>  
                        <!-- <h3>Nombre de la pension</h3> -->
                    </div>
                </div>
            </div>
            <div class="ui segment">
                <div class="ui grid">
                    <div class="twelve wide column">
                        <!-- <h2>Details</h2> -->
                        <!-- <div class="ui segment"></div> -->
                        <h3>{{pensionInfo.name}} ({{pensionInfo.space_available}} space/s available)</h3>
                        <div class="ui grid">
                            <div class="six wide column">
                                <!-- <div class="ui segment"></div> -->
                                <b>Location</b><p>{{pensionInfo.location}}</p>
                                <b>Type:</b><p>{{pensionInfo.type}}</p>
                                <b>Description:</b><p>{{pensionInfo.description}}</p>
                            </div>
                            <div class="five wide column">
                                <!-- <div class="ui segment"></div> -->
                                <b>Services:</b>
                                <p>{{pensionInfo.services}}</p>
                                <!-- <ul>
                                    <li>Wifi</li>
                                    <li>Parqueadero</li>
                                    <li>Television</li>
                                    <li>Aire Acondicionado</li>
                                    <li>Lavadora</li>
                                    <li>Cocina</li>
                                </ul> -->
                            </div>
                            <div class="five wide column">
                                <!-- <div class="ui segment"></div> -->
                                <b>Rules:</b>
                                <p>{{pensionInfo.rules}}</p>
                                <!-- <ul>
                                    <li>No fiestas</li>
                                    <li>No invitaciones</li>
                                    <li>Llegada antes de las 12 a.m</li>
                                    <li>Lavar platos despues de comer</li>
                                    <li>Dejar cerrado con seguro</li>
                                </ul> -->
                            </div>
                        </div>
                    </div>
                    <div class="four wide column">
                        <div v-if="pensionInfo.user_id == current_user_id">
                            <div class="ui centered grid">
                                <div class="registerButton">
                                    <button class="ui orange button" v-on:click.prevent="viewReservations(pensionInfo.id)">Reservations and Guests</button>
                                    <!-- <button class="ui orange button" v-on:click.prevent="reserve(pensionInfo.id)">View Reservations</button> -->
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="ui orange segment">
                                <h3>$ {{pensionInfo.price}} / {{pensionInfo.price_unit}}</h3>
                                <hr>
                                <b>In-Date</b>
                                <br>
                                <div class="ui input">
                                    <input type="text" v-model="in_date">
                                </div>
                                <br>
                                <br>
                                <b>Out-Date</b><br>
                                <div class="ui input">
                                    <input type="text" v-model="out_date">
                                </div>
                                <div class="ui centered grid">
                                    <div class="registerButton">
                                        <button class="ui orange button" v-on:click.prevent="reserve(pensionInfo.id)">Reserve</button>
                                    </div>
                                </div>
                                <br>
                                <hr>
                                <b>Contact Host:</b><p>{{pensionInfo.contact_phone}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui segment">
                <h2>Reviews</h2>
                <div v-if="reviews.length != 0">
                    <div class="ui two stackable cards">
                        <div v-for="(review, index) in reviews" :key="index">
                            <div class="cardEdit">
                                <div class="ui segment">
                                    <div class="cardInner">
                                        <div class="extra">
                                            <b class="pLocation">{{review.name}}</b>
                                            <p class="pType">{{review.text}}</p>
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
                            <p>There are currently no reviews.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'
import { Carousel, Slide } from 'vue-carousel';
import firebase from 'firebase'
import {gmapApi} from 'vue2-google-maps'

export default {
    computed: {
        google: gmapApi
    },
    name: 'pensionDetails',
    components: {
        HeaderBar,
        Carousel,
        Slide
    },
    data () {
        return {
            // pensionInfo: {
            //     id: '',
            //     name: 'Pension comoda con parque cercano',
            //     space_available: '2',
            //     location: 'Barranquilla',
            //     type: 'Cuarto Apartamento',
            //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut eros a turpis hendrerit eleifend. Maecenas in lectus malesuada, placerat dolor non, scelerisque sem. Nam ante ex, sagittis nec erat et, feugiat euismod nunc. Vivamus a gravida ante. Etiam eget bibendum diam. Aliquam sit amet turpis et dolor convallis suscipit.',
            //     services: 'Wifi, Parqueadero, Cocina, Lavadora, Aire Acondicionado',
            //     rules: 'No fumar, Llegada antes de la 1 a.m.',
            //     price: '300.000',
            //     price_unit: 'mes',
            //     contact_phone: '300-123 4567'
            // },
            pensionInfo: {
                id: '',
                name: '',
                space_available: '',
                location: '',
                type: '',
                description: '',
                services: '',
                rules: '',
                price: '',
                price_unit: '',
                contact_phone: '',
                user_id: '',
                pictures: []
            },
            current_user_id: '',

            in_date: '',
            out_date: '',

            reviews: [],
            markers: [
                {
                    position: {
                        lat: 10.96854,
                        lng: -74.78132
                    },
                }
            ]
        }
    },
    methods: {
        getPensionCookieID(){
            this.pensionInfo.id = this.$cookie.get('pension_details');
        },
        getCurrentUserCookieID(){
            this.current_user_id = this.$cookie.get('secret');
        },
        loadPensionInfo(){
            var databaseRef = firebase.database().ref('pensions/' + this.pensionInfo.id);
            const that = this;
            databaseRef.once('value', function(snapshot) {
                var childKey = snapshot.key;
                var childData = snapshot.val();
                console.log('childKey',childKey);
                console.log('childData',childData);
                that.pensionInfo.id = childKey;
                that.pensionInfo.name = childData.name;
                that.pensionInfo.space_available = childData.space_available;
                that.pensionInfo.location = childData.location;
                that.pensionInfo.type = childData.type;
                that.pensionInfo.description = childData.description;
                that.pensionInfo.services = childData.services;
                that.pensionInfo.rules = childData.rules;
                that.pensionInfo.price = childData.price;
                that.pensionInfo.price_unit = childData.price_unit;
                that.pensionInfo.contact_phone = childData.contact_phone;
                that.pensionInfo.user_id = childData.user_id;
            });

            // Get pension reviews
            var databaseRefReviews = firebase.database().ref('pensions/' + this.pensionInfo.id + '/reviews');
            databaseRefReviews.once('value',function(snapshot2) {
                if (snapshot2.val() != null) {
                    snapshot2.forEach(function(childSnapshot){
                        // console.log('REVIEWS',childSnapshot.val());
                        var reviewInfo = childSnapshot.val();
                        var reviewObject = {
                            name: reviewInfo.name,
                            text: reviewInfo.text
                        }
                        that.reviews.push(reviewObject);
                    })
                }
            })
        },
        async loadPensionPictures(){
            const that = this;
            var picLimit = 5;
            var i;
            for (i = 0; i < picLimit; i++) {
                console.log('ENTRA');
                var storageRef = firebase.storage().ref('pensions/' + this.pensionInfo.id + '/' + i);
                var picURL = storageRef.getDownloadURL().then(function(url) {
                    console.log('url',url);
                    that.pensionInfo.pictures.push(url);
                }).catch(error => {
                    // console.log('Error',error.message);
                });
            } 
        },
        reserve(){
            console.log('id',this.pensionInfo.id);
            console.log('current_user_id',this.current_user_id);

            console.log('in_date',this.in_date);
            console.log('out_date',this.out_date);

            var current_user_name;
            var current_user_university;
            var databaseRef = firebase.database().ref('users/' + this.current_user_id);
            databaseRef.once('value',function(snapshot){
                var userInfo = snapshot.val();
                current_user_name = userInfo.name;
                current_user_university = userInfo.university;
            })
            // setTimeout(() => console.log('current_user_name',current_user_name), 200);
            // setTimeout(() => console.log('current_user_university',current_user_university), 200);                
            
            var databaseRef1 = firebase.database().ref('pensions/' + this.pensionInfo.id + '/reservations/' + this.current_user_id + '/in_date');
            databaseRef1.set(this.in_date);

            var databaseRef2 = firebase.database().ref('pensions/' + this.pensionInfo.id + '/reservations/' + this.current_user_id + '/out_date');
            databaseRef2.set(this.out_date);

            var databaseRef3 = firebase.database().ref('pensions/' + this.pensionInfo.id + '/reservations/' + this.current_user_id + '/name');
            setTimeout(() => databaseRef3.set(current_user_name), 200);

            var databaseRef4 = firebase.database().ref('pensions/' + this.pensionInfo.id + '/reservations/' + this.current_user_id + '/university');
            setTimeout(() => databaseRef4.set(current_user_university), 200);

            setTimeout(() => alert('Reservation successfully created!'), 400);
            setTimeout(() => this.$router.push('/'), 450);
        },
        viewReservations(){
            console.log('id',this.pensionInfo.id);
            // console.log('id',id);
            this.$cookie.set('pension_reservations', this.pensionInfo.id, 1);
            setTimeout(() => this.$router.push('/pensionReservations'), 100);
        }
    },
    created(){
        this.getPensionCookieID();
        this.getCurrentUserCookieID();
        setTimeout(() => this.loadPensionInfo(), 300);
        setTimeout(() => this.loadPensionPictures(), 300);
    },
    mounted() {
        google.maps.event.addListener(gmapApi, 'click', function(event) {
            // placeMarker(event.latLng);
            console.log('TEST MAPS',event.latLng);
        });
    }
}
</script>

<style scoped>
    .centeredContent {
        margin: auto;
        max-width: 1110px;
    }
    .cardEdit {
        margin: 10px;
        width: 534px;
    }
    .centerMessage {
        margin: 15px;
    }
    .pictureFormat {
        margin: auto;
    }
</style>
