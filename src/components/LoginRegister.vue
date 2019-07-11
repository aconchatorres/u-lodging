<template>
    <div class="LoginRegister">

        <!-- <button class="ui white inverted button" v-on:click.prevent="gotoNewUserJobs">Set User Jobs</button> -->
        <div class="squareSegment">
            <div class="centeredContent">
                <div class="ui grid">
                    <div class="three wide column">
                        <router-link to="/">
                            <div class="ui small image">
                                <img src="../assets/images/uLodgingLogo.png" width="100%">
                            </div>
                        </router-link>
                    </div>
                    <div class="nine wide right floated right aligned column">
                        <div class="ui input">
                            <input placeholder="Email" type="text" v-model="emailLogin">
                        </div>
                        <div class="spaceElements"></div>
                        <div class="ui input">
                            <input placeholder="Password" type="password" v-model="passwordLogin">
                        </div>
                        <div class="spaceElements"></div>
                        <button class="ui white inverted button" v-on:click.prevent="loginUser">Log in</button>
                    </div>
                </div>
            </div>
            <!-- <button class="ui blue button" v-on:click.prevent="test">Test</button> -->
        </div>

        <div class="backImage">
            <img src="../assets/images/backRegister2.jpg" width="100%">
        </div>
        

        <div class="marginRegisterSegment">
            <form class="ui large form">
                <div class="ui stacked segment">
                    <div class="ui checkbox">
                        <input name="company" type="checkbox" v-model="newUser.is_host">
                        <label>Host User</label>
                    </div>
                    <br>
                    <br>
                    <div v-if="!newUser.is_host">
                        <p>Full Name</p>
                        <div class="ui input">
                            <div class="widthInput">
                                <input type="text" v-model="newUser.name">
                            </div>
                        </div>

                        <p>Email</p>
                        <div class="ui input">
                            <div class="widthInput">
                                <input type="text" v-model="newUser.email">
                            </div>
                        </div>

                        <p>Password</p>
                        <div class="ui input">
                            <div class="widthInput">
                                <input type="password" v-model="newUser.password">
                            </div>
                        </div>

                        <p>University</p>
                        <div class="ui input">
                            <div class="widthInput">
                                <input type="text" v-model="newUser.university">
                            </div>
                        </div>

                        <p>Career</p>
                        <select name="category" id="category" v-model="newUser.career">
                            <option v-for ="career in careers" :key="career" :value="career"> {{ career }} </option>
                        </select>

                        <p>Semester</p>
                        <div class="ui input">
                            <div class="widthInput">
                                <input type="text" v-model="newUser.semester">
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <p>Full Name</p>
                        <div class="ui input">
                            <div class="widthInput">
                                <input type="text" v-model="newUser.name">
                            </div>
                        </div>

                        <p>Phone</p>
                        <div class="ui input">
                            <div class="widthInput">
                                <input type="text" v-model="newUser.phone">
                            </div>
                        </div>

                        <p>Email</p>
                        <div class="ui input">
                            <div class="widthInput">
                                <input type="text" v-model="newUser.email">
                            </div>
                        </div>

                        <p>Password</p>
                        <div class="ui input">
                            <div class="widthInput">
                                <input type="password" v-model="newUser.password">
                            </div>
                        </div>
                    </div>

                    <div class="ui centered grid">
                        <div class="registerButton">
                            <button class="ui orange button" v-on:click.prevent="registerUser">Register</button>
                        </div>
                    </div>
                </div>
            </form>
            <!-- <button class="ui blue button" v-on:click.prevent="test">TEST</button> -->
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

var db = firebase.database();

export default {
    name: 'LoginRegister',
    data(){
        return{
            newUser: {
                name: '',
                email: '',
                password: '',
                university: '',
                career: '',
                semester: '',
                phone: '',
                is_host: false,
            },
            emailLogin: '',
            passwordLogin: '',
            uid: '',
            careers: []
        }
    },
    methods: {
        loadCareers(){
            const that = this;
            var databaseRef = firebase.database().ref('careers');
            databaseRef.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    that.careers.push(childSnapshot.key);
                    // console.log(childSnapshot.key);
                })
            })
        },
        test(){
            var databaseRef = firebase.database().ref('careers');
            databaseRef.once('value', function(snapshot) {
                console.log(snapshot.val());    
            })
            

            // var databaseRef = firebase.database().ref('users/2k6STX0T8iNzUv7ixKsb7ohARiK2');
            // databaseRef.once('value', function(snapshot) {
            //     console.log(snapshot.val().career);
            // })
        },
        loginUser(){
            var uid = '';
            const that = this;
            firebase.auth().signInWithEmailAndPassword(this.emailLogin, this.passwordLogin).then(
                function(response) {
                    uid = response.user.uid;
                    // console.log('uid adentro',uid);
                    setTimeout(() => that.$cookie.set('secret', uid, 1), 510);
                    setTimeout(() => console.log(that.$cookie.get('secret')), 520);
                    setTimeout(() => that.$router.push('/'), 600);
                    setTimeout(() => location.reload(), 610);
                },
                function(err){
                    console.log('err',err.message)
                    alert(err.message);
                }
            )
            // setTimeout(() => console.log('uid afuera',uid), 500);
            
        },
        gotoNewUserJobs(){
            this.$router.push('newUserJob');
        },
        registerUser(){
            var auth = firebase.auth();
            var name = this.newUser.name;
            var email = this.newUser.email;
            var university = this.newUser.university;
            var career = this.newUser.career;
            var semester = this.newUser.semester;
            var is_host = this.newUser.is_host;

            var phone = this.newUser.phone;

            var uid;
            const that = this;
            auth.createUserWithEmailAndPassword(this.newUser.email, this.newUser.password)
            .then(function(result){
                var user = firebase.auth().currentUser;
                console.log('current user',user.uid);
                uid = user.uid;
				
				var users = db.ref().child("users");
                var key = user.uid;
                var data;
                if (is_host) {
                    data = {
                        "is_host": is_host,
                        "name": name,
                        "email": email,
                        "phone": phone
                    }
                } else {
                    data = {
                        "is_host": is_host,
                        "name": name,
                        "email": email,
                        "university": university,
                        "career": career,
                        "semester": semester
                    }
                }
                
                users.child(key).set(data);
                console.log(data);

                setTimeout(() => that.$cookie.set('secret', uid, 1), 500);
                setTimeout(() => console.log(that.$cookie.get('secret')), 500);
                setTimeout(() => that.$router.push('/'), 500);
                setTimeout(() => location.reload(), 510);
            })
            .catch(function(error){
				console.log('err',error.message)
                alert(error.message);
            });
        },
    },
    created(){
        this.loadCareers();
        // setTimeout(() => console.log(this.careers), 1000);
    }
}
</script>

<style>
    body {
        background: #434649;
    }
    .centeredContent {
        margin: auto;
        max-width: 1110px;
    }
    .gridMargin {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .spaceElements{
        width: 10px;
        display: inline-block;
    }
    .marginRegisterSegment{
        max-width: 400px;
        margin: auto;
    }
    .segmentSize{
        width: 400px;
    }
    .widthInput {
        width: 360px;
        margin-left: 5px;
        margin-right: 5px;
    }
    p {
        margin-left: 5px;
        margin-top: 15px;
        margin-bottom: 5px;
    }
    .backImage {
        margin-top: -15px;
        margin-bottom: -620px;
    }
    .registerButton {
        margin-top: 25px;
        margin-bottom: 10px;
    }
    .squareSegment{
        background: #F2711C;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    /* .LoginRegister{
        margin-bottom: -500;
    } */
</style>
