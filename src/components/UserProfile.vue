<template>
    <div class="userProfile">
        <HeaderBar></HeaderBar>
        <div class="centeredContent">
            <br>
            <div class="ui orange segment">
                <div v-if="userInfo.is_host">
                    <div class="ui grid">
                        <div class="two wide column">
                            <div class="image">
                                <img class="iconUser" src="../assets/images/hostImage.png" width="100%">
                            </div>
                        </div>
                        <div class="thirteen wide column">
                            <h3>{{userInfo.name}}</h3>
                            <div class="ui grid">
                                <div class="four wide column">
                                    <b>Email:</b><p>{{userInfo.email}}</p>
                                </div>
                                <div class="four wide column">
                                    <b>Phone:</b><p>{{userInfo.phone}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="ui grid">
                        <div class="two wide column">
                            <div class="image">
                                <img class="iconUser" src="../assets/images/studentImage.png" width="100%">
                            </div>
                        </div>
                        <div class="thirteen wide column">
                            <h3>{{userInfo.name}}</h3>
                            <div class="ui grid">
                                <div class="four wide column">
                                    <b>Email:</b><p>{{userInfo.email}}</p>
                                </div>
                                <div class="four wide column">
                                    <b>University:</b><p>{{userInfo.university}}</p>
                                </div>
                                <div class="four wide column">
                                    <b>Career:</b><p>{{userInfo.career}}</p>
                                </div>
                                <div class="four wide column">
                                    <b>Semester:</b><p>{{userInfo.semester}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- IF USER IS STUDENT -->
            <div v-if="!userInfo.is_host">
                <h2>Current Pension</h2>
                <div class="ui segment">
                    <div v-if="has_current_pension">
                        <div class="ui grid">
                            <div class="four wide column">
                                <!-- <div class="ui segment"></div> -->
                                <div class="image">
                                    <img v-bind:src="pensionInfo.cover" width="100%" height="100%">
                                    <!-- <img src="http://www.parisianflat.com/images/apartments/15/salon1web.jpg" width="100%"> -->
                                </div>
                            </div>
                            <div class="four wide column">
                                <!-- <div class="ui segment"></div> -->
                                <a v-on:click.prevent="pensionDetails"><p class="pName">{{pensionInfo.name}}</p></a>
                                <p class="pLocation">{{pensionInfo.location}}</p>
                                <p class="pType">{{pensionInfo.type}}</p>
                                <p class="pPrice">$ {{pensionInfo.price}} / {{pensionInfo.price_unit}}</p>
                            </div>
                            <div class="six wide column">
                                <!-- <div class="ui segment"></div> -->
                                <b>Description:</b><p>{{pensionInfo.description}}</p>
                            </div>
                            <div class="two wide column">
                                <!-- <div class="ui segment"></div> -->
                                <b>In-Date:</b><p>{{pensionInfo.in_date}}</p>
                                <b>Out-Date:</b><p>{{pensionInfo.out_date}}</p>
                            </div>
                        </div>
                        <div class="ui segment">
                            <h3>Review Pension</h3>
                            <div class="ui grid">
                                <div class="fourteen wide column">
                                    <!-- <div class="ui segment"></div> -->
                                    <div class="ui fluid input">
                                        <input type="text" v-model="review">
                                    </div>
                                </div>
                                <div class="two wide column">
                                    <!-- <div class="ui segment"></div> -->
                                    <div class="ui centered grid">
                                        <div class="btnSendRev">
                                            <button class="ui fluid orange button" v-on:click.prevent="sendReview">Send</button>
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
                                <p>You are currently not in a pension.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <h2>Favorites</h2>
                <div class="ui segment">
                    <div v-if="true">
                        <div class="ui three stackable cards">
                            <div v-for="(pension, index) in pensions" :key="index">
                                <div class="cardEdit">
                                <div class="ui segment">
                                    <div class="cardInner">
                                    <div class="pensionCover">
                                    <img v-bind:src="pension.cover" width="100%" height="100%">
                                    </div>
                                    <div class="extra">
                                    <a v-on:click.prevent="pensionDetails"><p class="pName">{{pension.name}}</p></a>
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
                                <p>You have currently no favorite pensions.</p>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>

            <!-- IF USER IS HOST -->
            <div v-else>
                <div class="ui segment">
                    <div class="ui grid">
                        <div class="eight wide column">
                            <!-- <div class="ui segment"></div> -->
                            <h2>My Pensions</h2>
                        </div>
                        <div class="eight wide column">
                            <!-- <div class="ui segment"></div> -->
                            <button class="ui right floated orange inverted button" v-on:click.prevent="newPension">New Pension</button>
                        </div>
                    </div>
                    
                    <div v-if="pensions.length != 0">
                        <div v-for="(pension, index) in pensions" :key="index">
                            <div class="ui grid">
                                <div class="four wide column">
                                    <!-- <div class="ui segment"></div> -->
                                    <div class="image">
                                        <img v-bind:src="pensionsPics[index]" width="100%" height="100%">
                                        <!-- <img src="http://www.parisianflat.com/images/apartments/15/salon1web.jpg" width="100%"> -->
                                    </div>
                                </div>
                                <div class="four wide column">
                                    <!-- <div class="ui segment"></div> -->
                                    <a v-on:click.prevent="pensionDetails"><p class="pName">{{pension.name}}</p></a>
                                    <p class="pLocation">{{pension.location}}</p>
                                    <p class="pType">{{pension.type}}</p>
                                    <p class="pPrice">$ {{pension.price}} / {{pension.price_unit}}</p>
                                </div>
                                <div class="six wide column">
                                    <!-- <div class="ui segment"></div> -->
                                    <b>Description:</b><p>{{pension.description}}</p>
                                </div>
                                <div class="two wide column">
                                    <!-- <div class="ui segment"></div> -->
                                    <div class="ui centered grid">
                                        <div class="editButton">
                                            <button class="ui right floated orange inverted button" v-on:click.prevent="editPension(pension.id)">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
                    <div v-else>
                        <div class="ui centered grid">
                            <br>
                            <div class="centerMessage">
                                <p>You have currently no pensions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'
import firebase,{ functions } from 'firebase'

export default {
    name: 'userProfile',
    components: {
        HeaderBar
    },
    data(){
        return{
            pensions: [],
            pensionsPics: [],
            user_id: '',
            has_current_pension: false,
            current_pension_id: '',
            review: '',

            userInfo: {
                is_host: '',
                name: '',
                email: '',
                phone: '',
                university: '',
                career: '',
                semester: ''
            },

            pensionInfo: {
                name: '',
                type: '',
                location: '',
                price: '',
                price_unit: '',
                description: '',
                in_date: '',
                out_date: '',
                cover: ''
            }
        }
    },
    methods: {
        getToken(){
            this.user_id = this.$cookie.get('secret');
        },
        pensionDetails(){
            this.$router.push('/pensionDetails');
        },
        newPension(){
            this.$router.push('/newPension');
        },
        loadUserInfo(){
            console.log(this.$cookie.get('secret'));
            var databaseRef = firebase.database().ref('users/' + this.user_id);
            const that = this;
            databaseRef.once('value', function(snapshot) {
                // console.log('snapshot',snapshot.val());

                that.userInfo.is_host = snapshot.val().is_host;
                that.userInfo.name = snapshot.val().name;
                that.userInfo.email = snapshot.val().email;
                that.userInfo.phone = snapshot.val().phone;
                that.userInfo.university = snapshot.val().university;
                that.userInfo.career = snapshot.val().career;
                that.userInfo.semester = snapshot.val().semester;

                that.pensionInfo.in_date = snapshot.val().in_date;
                that.pensionInfo.out_date = snapshot.val().out_date;
            })
            setTimeout(function(){
                if (that.userInfo.is_host) {
                    that.loadUserPensions();
                } else {
                    that.loadCurrentPension();
                }
            }, 600);
        },
        loadUserPensions(){
            var databaseRef = firebase.database().ref('pensions');
            const that = this;
            databaseRef.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if (childData.user_id == that.user_id) {
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
        editPension(id){
            console.log('id',id);
        },
        async loadCurrentPensionPicture(id){
            const that = this;
            var storageRef = firebase.storage().ref('pensions/' + id + '/0');
            var picURL = storageRef.getDownloadURL().then(function(url) {
                console.log('url',url);
                that.pensionInfo.cover = url;
            }).catch(error => {
                // console.log('Error',error.message);
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
        loadCurrentPension(){
            const that = this;

            var databaseRef = firebase.database().ref('users/' + this.user_id + '/current_pension');
            databaseRef.once('value',function(snapshot){
                var pension_id = snapshot.val();
                that.current_pension_id = pension_id;
                var databaseRef2 = firebase.database().ref('pensions/' + pension_id);
                databaseRef2.once('value', function(snapshot2) {
                    var pensionInfoFire = snapshot2.val();
                    if (pensionInfoFire != null) {
                        that.pensionInfo.name = pensionInfoFire.name;
                        that.pensionInfo.type = pensionInfoFire.type;
                        that.pensionInfo.location = pensionInfoFire.location;
                        that.pensionInfo.price = pensionInfoFire.price;
                        that.pensionInfo.price_unit = pensionInfoFire.price_unit;
                        that.pensionInfo.description = pensionInfoFire.description;
                        
                        that.has_current_pension = true;
                    }
                })
                that.loadCurrentPensionPicture(pension_id);
            })
            setTimeout(() => console.log(this.pensionInfo), 1000);
        },
        sendReview(){
            console.log('review',this.review);
            console.log('current_pension_id',this.current_pension_id);
            console.log('user_id',this.user_id);
            console.log('userInfo.name',this.userInfo.name);

            var databaseRefName = firebase.database().ref('pensions/' + this.current_pension_id + '/reviews/' + this.user_id + '/name');
            databaseRefName.set(this.userInfo.name);

            var databaseRefReview = firebase.database().ref('pensions/' + this.current_pension_id + '/reviews/' + this.user_id + '/text');
            databaseRefReview.set(this.review);

            setTimeout(() => alert('Your review has been sent.'), 300);
            setTimeout(() => this.review = '', 350);
            
        }
    },
    created(){
        this.getToken();
        setTimeout(() => this.loadUserInfo(), 300);
    }
}
</script>

<style scoped>
    .centeredContent {
        margin: auto;
        max-width: 1110px;
    }
    .iconUser {
        border-radius: 20%;
    }
    .centerMessage{
        margin: 15px;
    }
    .pName {
        font-weight: bold;
        font-size: 16px;
        color: black;
        cursor: pointer;
    }
    .pName:hover{
        color: #5d8aa8;
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
    .editButton{
        margin-top: 30px;
    }
    .btnSendRev{
        margin-top: 14px;
    }
</style>
