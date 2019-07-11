<template>
    <div class="headerbar">
        <div class="squareSegment">
            <div class="centeredContent">
                <router-link to="/">
                    <div class="ui small image">
                        <img src="../assets/images/uLodgingLogo.png" width="100%">
                    </div>
                </router-link>
                <div class="serchInput">
                    <div class="ui fluid action input">
                        <input placeholder="Search..." type="text" v-model="searchInput">
                        <div class="ui button" v-on:click.prevent="search">Search</div>
                    </div>
                </div>
                <div class="ui simple dropdown item">
				        <i class="fa fa-users"></i>
				        <!-- <div class="circular ui icon button"> -->
					        <div class="iconoCentradoUser">
						        <i class="user inverted outline large icon"></i>
                                <i class="caret down white icon"></i>
					        </div>
				        <!-- </div> -->
				        <!-- Drop down menu usuario -->
				        <i class="fa fa-caret-down"></i>
				        <div class="menu">
					        <a class="item" v-on:click.prevent="myProfile"><i></i>My Profile</a>
					        <!-- <a class="item"><i></i>Sales</a> -->
					        <!-- <a class="item"><i></i>Purchases</a> -->
					        <a class="item" v-on:click.prevent="logout"><i></i>Logout</a>
				        </div>
			        </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'HeaderBar',
    data(){
        return{
            searchInput: ''
        }
    },
    methods: {
        myProfile(){
            console.log('MY PROFILE BUTTON');
            this.$router.push('/userProfile');
        },
        userLogout(){
            console.log('BOTON LOGOUT');
        },
        logout(){
            // console.log('funciona')
            firebase.auth().signOut().then(() =>{
                this.$cookie.delete('secret');
                // this.$router.push('/');
                setTimeout(() => location.reload(), 300);
                
                setTimeout(() => this.$router.push('/'), 300);
            })
        },
        search(){
            if (this.searchInput != '') {
                this.$cookie.set('search', this.searchInput, 1);
                this.$router.push('/search');
                setTimeout(() => location.reload(), 10);
            }
        },
        test(){
            console.log('funciona', this.searchInput);
        }
    }
}
</script>

<style scoped>
    .centeredContent {
        max-width: 1110px;
        margin: auto;
    }
    .serchInput{
        width: 876px;
        display: inline-block;
        margin-left: 15px;
        margin-right: 5px;
    }
    .logout{
        display: inline-block;
        margin-left: 15px;
        margin-top: 0px;
        margin-bottom: -10px;
        cursor: pointer;
    }
    .squareSegment{
        background: #F2711C;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .whiteText{
        color: white;
    }
</style>