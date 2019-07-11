<template>
    <div class="pensionReservations">
        <HeaderBar></HeaderBar>
        <div class="centeredContent">
            <div class="spaceTitle"></div>
            <h2>Reservations</h2>
            <div class="ui segment">
                <!-- <div v-if="reservations.length != 0"> -->
                <div v-if="reservations.length != 0">
                    <div class="ui two stackable cards">
                        <div v-for="(reservation, index) in reservations" :key="index">
                            <div class="cardEdit">
                                <div class="ui segment">
                                    <div class="cardInner">
                                        <b class="pLocation">{{reservation.name}}</b>
                                        <p class="pType">{{reservation.university}}</p>
                                        <div class="ui grid">
                                            <div class="five wide column">
                                                <!-- <div class="ui segment"></div> -->
                                                <b class="pLocation">In-date:</b>
                                                <p class="pType">{{reservation.in_date}}</p>
                                            </div>
                                            <div class="five wide column">
                                                <!-- <div class="ui segment"></div> -->
                                                <b class="pLocation">Out-date:</b>
                                                <p class="pType">{{reservation.out_date}}</p>
                                            </div>
                                            <div class="six wide column">
                                                <div class="ui centered grid">
                                                    <button class="ui orange button" v-on:click.prevent="acceptReservation(reservation)">Accept</button>
                                                </div>
                                            </div> 
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
                            <p>There are currently no reservations.</p>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Guests</h2>
            <h3>({{pension_space_available}} space/s available)</h3>
            <div class="ui segment">
                <div v-if="guests.length != 0">
                    <div class="ui two stackable cards">
                        <div v-for="(guests, index) in guests" :key="index">
                            <div class="cardEdit">
                                <div class="ui segment">
                                    <div class="cardInner">
                                        <b class="pLocation">{{guests.name}}</b>
                                        <p class="pType">{{guests.university}}</p>
                                        <div class="ui grid">
                                            <div class="five wide column">
                                                <!-- <div class="ui segment"></div> -->
                                                <b class="pLocation">In-date:</b>
                                                <p class="pType">{{guests.in_date}}</p>
                                            </div>
                                            <div class="five wide column">
                                                <!-- <div class="ui segment"></div> -->
                                                <b class="pLocation">Out-date:</b>
                                                <p class="pType">{{guests.out_date}}</p>
                                            </div>
                                            <div class="six wide column">
                                                <div class="ui centered grid">
                                                    <button class="ui orange button" v-on:click.prevent="kickGuest(guests.id)">Kick</button>
                                                </div>
                                            </div> 
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
                            <p>There are currently no guests.</p>
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
    name: 'pensionReservations',
    components: {
        HeaderBar
    },
    data(){
        return{
            pension_id: '',
            reservations: [],
            guests: [],
            pension_space_available: ''
        }
    },
    methods:{
        getPensionSpaceAvailable(){
            const that = this;
            var databaseRef = firebase.database().ref('pensions/' + this.pension_id);
            databaseRef.once('value',function(snapshot){
                var pensionInfo = snapshot.val();
                that.pension_space_available = pensionInfo.space_available;
            })
        },
        getPensionReservationsID(){
            this.pension_id = this.$cookie.get('pension_reservations');
        },
        getReservatorsInfo(){
            const that = this;
            var databaseRef = firebase.database().ref('pensions/' + this.pension_id + '/reservations');
            databaseRef.once('value', function(snapshot){
                console.log('snapshot',snapshot.val());
                snapshot.forEach(function(childSnapshot){
                    console.log('childSnapshotKEY',childSnapshot.key);
                    var reservationInfo = childSnapshot.val();
                    var reservationObject = {
                        name: reservationInfo.name,
                        university: reservationInfo.university,
                        in_date: reservationInfo.in_date,
                        out_date: reservationInfo.out_date,
                        id: childSnapshot.key
                    }
                    that.reservations.push(reservationObject);
                })
            })
        },
        acceptReservation(reservationObject){
            console.log('reservationObject',reservationObject);

            const that = this;
            var databaseRef = firebase.database().ref('pensions/' + this.pension_id);
            databaseRef.once('value',function(snapshot){
                var space_available = snapshot.val().space_available;
                if (space_available == 0) {
                    alert('This pension is full!');
                } else {
                    var databaseRef1 = firebase.database().ref('pensions/' + that.pension_id + '/guests/' + reservationObject.id + '/name');
                    databaseRef1.set(reservationObject.name);
                    
                    var databaseRef2 = firebase.database().ref('pensions/' + that.pension_id + '/guests/' + reservationObject.id + '/university');
                    databaseRef2.set(reservationObject.university);

                    var databaseRef3 = firebase.database().ref('pensions/' + that.pension_id + '/guests/' + reservationObject.id + '/in_date');
                    databaseRef3.set(reservationObject.in_date);

                    var databaseRef4 = firebase.database().ref('pensions/' + that.pension_id + '/guests/' + reservationObject.id + '/out_date');
                    databaseRef4.set(reservationObject.out_date);

                    var databaseRefSpace = firebase.database().ref('pensions/' + that.pension_id + '/space_available');
                    databaseRefSpace.set(space_available - 1);

                    var databaseRefDelReserve = firebase.database().ref('pensions/' + that.pension_id + '/reservations/' + reservationObject.id);
                    setTimeout(() => databaseRefDelReserve.remove(), 300);
                    
                    that.setCurrentPensionUser(reservationObject);

                    setTimeout(() => location.reload(), 500);
                }
            })
        },
        setCurrentPensionUser(reservationObject) {
            var databaseRef = firebase.database().ref('users/' + reservationObject.id + '/current_pension');
            databaseRef.set(this.pension_id);

            var databaseRef2 = firebase.database().ref('users/' + reservationObject.id + '/in_date');
            databaseRef2.set(reservationObject.in_date);

            var databaseRef3 = firebase.database().ref('users/' + reservationObject.id + '/out_date');
            databaseRef3.set(reservationObject.out_date);
        },
        getGuestsInfo(){
            const that = this;
            var databaseRef = firebase.database().ref('pensions/' + this.pension_id + '/guests');
            databaseRef.once('value', function(snapshot){
                console.log('snapshot',snapshot.val());
                snapshot.forEach(function(childSnapshot){
                    console.log('childSnapshotKEY',childSnapshot.key);
                    var guestInfo = childSnapshot.val();
                    var guestObject = {
                        name: guestInfo.name,
                        university: guestInfo.university,
                        in_date: guestInfo.in_date,
                        out_date: guestInfo.out_date,
                        id: childSnapshot.key
                    }
                    that.guests.push(guestObject);
                })
            })
        },
        kickGuest(id){
            console.log('kick id',id);

            var space_available;
            var databaseRef = firebase.database().ref('pensions/' + this.pension_id);
            databaseRef.once('value',function(snapshot){
                space_available = snapshot.val().space_available;
            })

            var databaseRefSpace = firebase.database().ref('pensions/' + this.pension_id + '/space_available');
            setTimeout(() => databaseRefSpace.set(space_available + 1), 500);

            var databaseRefKickGest = firebase.database().ref('pensions/' + this.pension_id + '/guests/' + id);
            databaseRefKickGest.remove();

            var refRemoveCurrentPension = firebase.database().ref('users/' + id + '/current_pension');
            refRemoveCurrentPension.remove();

            alert('Guest kicked');
            setTimeout(() => location.reload(), 600);
        }
    },
    created(){
        this.getPensionReservationsID();
        this.getReservatorsInfo();
        this.getPensionSpaceAvailable();
        this.getGuestsInfo();
    }
}
</script>

<style scoped>
    .centerMessage{
        margin: 15px;
    }
    .cardEdit {
        margin: 10px;
        width: 534px;
    }
    .contenidoCard {
        margin: 5px;
    }
</style>
