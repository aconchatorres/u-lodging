<template>
    <div class="search">
        <HeaderBar></HeaderBar>
        <div class="centeredContent">
            <br>
            <h2>Results for: {{searchInput}}</h2>
            <div class="ui segment">
                <div v-if="pensionResults.length != 0">
                    <div v-for="(pensionInfo, index) in pensionResults" :key="index" class="singleProduct">
                        <div class="ui grid">
                            <div class="four wide column">
                                <!-- <div class="ui segment"></div> -->
                                <div class="image">
                                    <!-- <img v-bind:src="pension.cover" width="100%" height="100%"> -->
                                    <img src="http://www.parisianflat.com/images/apartments/15/salon1web.jpg" width="100%">
                                </div>
                            </div>
                            <div class="four wide column">
                                <!-- <div class="ui segment"></div> -->
                                <a v-on:click.prevent="pensionDetails"><p class="pName">{{pensionInfo.name}}</p></a>
                                <p class="pLocation">{{pensionInfo.location}}</p>
                                <p class="pType">{{pensionInfo.type}}</p>
                                <p class="pPrice">$ {{pensionInfo.price}} / {{pensionInfo.price_unit}}</p>
                            </div>
                            <div class="eight wide column">
                                <!-- <div class="ui segment"></div> -->
                                <b>Description:</b><p>{{pensionInfo.description}}</p>
                            </div>
                        </div>
                        <hr>
                    </div>
                </div>
                <div v-else>
                    <br>
                    <div class="ui centered grid">
                        <p>No pensions matches your query.</p>
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'
import firebase,{ functions } from 'firebase'

export default {
    name: 'search',
    components: {
        HeaderBar
    },
    data(){
        return{
            searchInput: '',
            pensionResults: [],
        }
    },
    methods: {
        getSearchInput(){
            this.searchInput = this.$cookie.get('search');
        },
        searchPensionsInDatabase(){
            var databaseRef = firebase.database().ref('pensions');
            var rowIndex = 0;
            const that = this;
            databaseRef.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();

                    if (childData.name.indexOf(that.searchInput) >= 0 || childData.description.indexOf(that.searchInput) >= 0
                    || childData.location.toUpperCase() == that.searchInput.toUpperCase() || childData.price == that.searchInput
                    || childData.type.toUpperCase() == that.searchInput.toUpperCase()) {
                        var pension = {
                            index: rowIndex,
                            id: childKey,
                            name: childData.name,
                            location: childData.location,
                            type: childData.type,
                            price: childData.price,
                            price_unit: childData.price_unit,
                            description: childData.description
                        };
                        // console.log('job',job);
                        that.pensionResults.push(pension);
                    }

                    rowIndex = rowIndex + 1;
                });
            });
        },
    },
    created(){
        this.getSearchInput();
        this.searchPensionsInDatabase();
    }
}
</script>

<style scoped>

</style>
