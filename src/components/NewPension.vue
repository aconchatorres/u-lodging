<template>
    <div class="newPension">
        <HeaderBar></HeaderBar>
        <div class="centeredContent">
           <div class="spaceTitle"></div>
            <h2>New Pension</h2>
            <div class="ui segment">
                <div class="ui grid">
                    <div class="six wide column">
                        <!-- <div class="ui segment"></div> -->
                        <div class="ui fluid input">
                            <input placeholder="Pension Name" type="text" v-model="newPension.name">
                        </div>
                        <br>
                        <div class="ui fluid input">
                            <input placeholder="Description" type="text" v-model="newPension.description">
                        </div>
                        <br>
                        <div class="ui fluid input">
                            <input placeholder="Rules" type="text" v-model="newPension.rules">
                        </div>
                    </div>
                    <div class="five wide column">
                        <!-- <div class="ui segment"></div> -->
                        <div class="ui fluid input">
                            <input placeholder="Location" type="text" v-model="newPension.location">
                        </div>
                        <br>
                        <div class="ui fluid input">
                            <input placeholder="Contact Phone" type="text" v-model="newPension.contact_phone">
                        </div>
                        <br>
                        <div class="ui fluid input">
                            <input placeholder="Space Available" type="text" v-model="newPension.space_available">
                        </div>
                    </div>
                    <div class="five wide column">
                        <!-- <div class="ui segment"></div> -->
                        <div class="dropTypes">
                            Type<br><select name="category" id="category" v-model="newPension.type">
                                <option v-for ="pensionType in pensionTypes" :key="pensionType" :value="pensionType"> {{ pensionType }} </option>
                            </select>
                        </div>
                        <br>
                        <div class="ui fluid input">
                            <input placeholder="Services" type="text" v-model="newPension.services">
                        </div>
                        <br>
                        <div class="ui input">
                            <input placeholder="Price" type="text" v-model="newPension.price">
                        </div>
                        <select name="category" id="category" v-model="newPension.price_unit">
                            <option v-for ="priceUnit in priceUnits" :key="priceUnit" :value="priceUnit"> {{ priceUnit }} </option>
                        </select>
                    </div>
                </div>
                <br>
                <div class="ui grid">
                    <div class="eight wide column">
                        <!-- <div class="ui segment"></div> -->
                        <h2>Pictures</h2>
                        <div class="examinar">
                            <input type="file" @change="onFileChanged" multiple>
                        </div>
                    </div>
                    <div class="eight wide column">
                        <div class="ui raised segment">
                            <GmapMap
                                :center="{lat:10.96854, lng:-74.79032}"
                                :zoom="12"
                                map-type-id="terrain"
                                style="width: 500px; height: 395px"
                                >
                                <GmapMarker
                                    :position="marker.position"
                                    :clickable="true"
                                    :draggable="true"
                                    @click="center=marker.position"
                                />
                            </GmapMap>

                            <!-- <h3 v-model="marker.position"></h3> -->
                            <input placeholder="Services" type="text" v-model="marker.position">
                        </div>  
                    </div>
                </div>
                <div class="ui centered grid">
                    <div class="newButtons">
                        <button class="ui orange button" v-on:click.prevent="createPension">Create</button>
                        <button class="ui orange inverted button" v-on:click.prevent="cancelPension">Cancel</button>
                    </div>
                </div>
            </div>
            <!-- <button class="ui blue button" v-on:click.prevent="test">Test</button> -->
            <!-- <pre>
        {{ $data | json }}
    </pre> -->
        </div>
    </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'
import firebase from 'firebase'
import {gmapApi} from 'vue2-google-maps'

export default {
    computed: {
        google: gmapApi
    },
    name: 'newPension',
    components: {
        HeaderBar
    },
    data(){
        return{
            selectedFile: null,
            selectedFiles: [],
            newPension: {
                user_id: '',
                name: '',
                location: '',
                type: '',
                description: '',
                contact_phone: '',
                services: '',
                rules: '',
                space_available: '',
                price: '',
                price_unit: ''
            },
            pensionTypes: ['Full Apartment', 'Apartment Room', 'Full House', 'House Room'],
            priceUnits: ['night', 'week', 'month', 'semester', 'year'],
            // marker: {
            //     position: {
            //         lat: '',
            //         lng: ''
            //     },
            // }
            marker: ''
        }
    },
    methods: {
        async uploadPictures(id) {
            // console.log('selectedFiles',this.selectedFiles);
            // var id = '-LDKj9ihT0nOqi86ioPo';
            var i;
            for (i = 0; i < this.selectedFiles.length; i++) {
                var storageRef = firebase.storage().ref('pensions/' + id + '/' + i);
                await storageRef.put(this.selectedFiles[i])
            }
        },
        getToken(){
            this.newPension.user_id = this.$cookie.get('secret');
        },
        cancelPension(){
            this.$router.push('/userProfile');
        },
        createPension(){
            // console.log(this.marker.getPosition().lat());
            // console.log(this.marker.getPosition().lng());

            var newID;
            var databaseRef = firebase.database().ref('pensions').push(this.newPension).then((snap) => {
                newID = snap.key;
            });

            setTimeout(() => this.uploadPictures(newID), 200);

            setTimeout(() => alert("Pension successfully created."), 400);
            setTimeout(() => this.$router.push('/userProfile'), 500);
        },
        onFileChanged (event) {
            // this.selectedFile = event.target.files[0];

            console.log('length files selected',event.target.files.length);
            this.selectedFiles = event.target.files;

            if (event.target.files.length != 4) {
                alert('Please choose 4 pictures.');
            }

            // var reader = new FileReader();

            // reader.readAsDataURL(this.selectedFile)
            // console.log(reader.result)
            // reader.onload = (event) => {
            //     console.log(event.target.result)
            //     this.selectedFile = event.target.result
            // }
        },
    },
    created(){
        this.getToken();
        // this.marker.position.lat = 10.96854;
        // this.marker.position.lng = -74.79032;

this.marker = new google.maps.Marker({
                position: {
                    lat: 10.96854,
                    lng: -74.79032
                },
                map: gmapApi,
                draggable: true
            })
        
    },
    mounted() {
        this.$nextTick(() => {
            var map = new google.maps.Map(document.getElementById('map-canvas'),{
                center: {
                    lat: 10.96854,
                    lng: -74.79032
                },
                zoom: 12
            });
            
            var marker = new google.maps.Marker({
                position: {
                    lat: 10.96854,
                    lng: -74.79032
                },
                map: map,
                draggable: true
            })

            google.maps.event.addListener(marker, 'dragend', function() {
                // placeMarker(event.latLng);
                // console.log('TEST MAPS',event.latLng);

                // var lat = marker.getPosition().lat();
                // var lng = marker.getPosition().lng();

                console.log(marker.getPosition().lat());
                console.log(marker.getPosition().lng());
            });
        });
    }
    
}
</script>

<style scoped>
    .centeredContent {
        margin: auto;
        max-width: 1110px;
    }
    .spaceTitle {
        height: 0px;
    }
    .newButtons{
        margin: 10px;
    }
    .dropTypes{
        margin-bottom: -4px;
    }
    .priceUnit{
        display: inline-block;
    }
</style>
