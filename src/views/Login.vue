<template>
    <div>
        <div class="d-flex justify-content-end col-8 offset-2 mt-3">
            <button @click="home()" type="submit" class="px-4 py-2 rounded btn-success">Home</button>
        </div>
       <div class="col-6 offset-3 p-5">
           <div v-if="checkData" class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Alert!</strong> {{ checkData }}
            </div>
            
            <div class="row">
                <label>Email</label>
                <input type="email" v-model="userData.email" class="form-control" placeholder="Enter Email..."/>
                <small class="text-danger mt-2" v-if="userStatus.emailCk">Email field must be fill</small>
            </div>
            <div class="my-3 row">
                <label>Password</label>
                <input type="password" v-model="userData.password" class="form-control" placeholder="Enter Password..."/>
                <small class="text-danger mt-2" v-if="userStatus.passCk">Password field must be fill</small>
            </div>
            <div class="mt-5">
               <button type="submit" @click="accountLogin"
               class="px-3 py-2 btn-block rounded btn-primary">Login</button>
            </div>
            <div class="text-center my-3">
                Don't have an account ? <a href="/register" class="text-danger d-inline nav-link">Sign up</a>
            </div>
       </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapGetters } from "vuex";
    export default {
        name : "loginPage",
        data () {
            return {
                userData : {
                    email : '',
                    password : '',
                },
                userStatus: {
                    emailCk: false,
                    passCk : false
                },
                checkData : ''
            }
        },
        computed: {
            ...mapGetters(['getToken','setUserData'])
        },
        methods: {
            home () {
                this.$router.push({
                    name: "home"
                })
            },
            validationEmail() {
                if (!this.userData.email) {
                    this.userStatus.emailCk = true
                }
            },
            validationPass() {
                if (!this.userData.password) {
                    this.userStatus.passCk = true
                }
            },
            accountLogin() {
                this.validationEmail();
                this.validationPass();
                if (Object.values(this.userStatus).every(check => !check)) {
                     axios.post("http://localhost:8000/api/user/login", this.userData).then((response) => {
                    if (response.data.token == null) {
                        this.checkData = response.data.failed
                    } else {
                        localStorage.setItem('userId', response.data.user.id);
                        this.$store.dispatch('setToken', response.data.token);
                        this.$store.dispatch('setUserData', response.data.user);
                        this.home();
                    }
                })
                }
               
            },
        }
    }
</script>

<style lang="stylus" scoped>

</style>
