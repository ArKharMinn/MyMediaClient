<template>
    <div>
        <div class="d-flex justify-content-end col-8 offset-2 mt-3">
            <button @click="home()" type="submit" class="px-4 py-2 rounded btn-success">Home</button>
        </div>
       <div class="col-6 offset-3 p-5">
            <div class="row mb-3">
                <label>Name</label>
                <input type="text" v-model="userData.name" class="form-control"/>
                <small class="text-danger mt-2" v-if="userStatus.nameCk">Name field must be fill</small>
            </div>
            <div class="row">
                <label>Email</label>
                <input type="email" v-model="userData.email" class="form-control" placeholder=""/>
                <small class="text-danger mt-2" v-if="userStatus.emailCk">Email field must be fill</small>
            </div>
            <div class="my-3 row">
                <label>Password</label>
                <input type="password" v-model="userData.password" class="form-control" placeholder=""/>
                <small class="text-danger mt-2" v-if="userStatus.passCk">Password field must be fill</small>
            </div>
            <div class="mb-5 row">
                <label>Confirm Password</label>
                <input type="password" v-model="userData.conpassword" class="form-control" placeholder=""/>
                <small class="text-danger mt-2" v-if="userStatus.conpassCk">Confirm Password field must be fill</small>
                <small class="text-danger mt-2" v-if="userStatus.samePass">Confirm Password and Password are not same</small>
            </div>
            <div class="">
               <button type="submit" @click="accountRegister"
               class="px-3 py-2 btn-block rounded btn-dark"> Sign up</button>
            </div>
            <div class="text-center my-3">
                Already have an account ? <a href="/login" class="text-danger d-inline nav-link">Login</a>
            </div>
       </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapGetters } from "vuex";
    export default {
        name : "lRegisterPage",
        data () {
            return {
                userData: {
                    name : '',
                    email : '',
                    password: '',
                    conpassword : ''
                },
                userStatus: {
                    nameCk: false,
                    emailCk: false,
                    passCk: false,
                    conpassCk: false,
                    samePass : false
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
            validationName() {
                if (!this.userData.name) {
                    this.userStatus.nameCk = true
                }
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
             validationConPass() {
                if (!this.userData.conpassword) {
                    this.userStatus.conpassCk = true
                }
            },
              validationSamePass() {
                if (this.userData.password != this.userData.conpassword) {
                    this.userStatus.samePass = true
                }
            },
            accountRegister() {
                this.validationName();
                this.validationEmail();
                this.validationPass();
                this.validationConPass();
                 this.validationSamePass();
                if (Object.values(this.userStatus).every(check => !check)) {
                     axios.post("http://localhost:8000/api/user/register", this.userData).then((response) => {
                    if (response.data.token == null) {
                        this.checkData = response.data.failed
                    } else {
                        localStorage.setItem('userId', response.data.user.id);
                        this.$store.dispatch('setToken',response.data.token)
                        this.$store.dispatch('setUserData',response.data.user)
                        this.home()
                        
                    }
                })
                }
               
            },
        }
    }
</script>

<style lang="stylus" scoped>

</style>
