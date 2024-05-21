<template>
  <div>
    <div class="home">
     <!-- Whats New Start -->
     <section class="whats-news-area pt-50 pb-20">
            <div class="container">
              <div class="d-flex justify-content-end">
                <button @click="login()" v-if="!userId" type="submit" class="px-4 py-2 rounded btn-dark">Login</button>
                <button @click="logout()" v-else type="submit" class="px-4 rounded py-2 btn-danger">Logout</button>
              </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row d-flex justify-content-between">
                            <div class="col-12">
                                <div class="properties__button">
                                    <!--Nav Button  -->
                                    <nav class=" d-flex justify-content-start">
                                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                            <a class="nav-item nav-link active" v-if="category.length != 0" 
                                            @click="categorySearch('')" id="nav-home-tab" data-toggle="tab" href="#" 
                                            role="tab" aria-controls="nav-home" aria-selected="true">All</a>
                                            <a
                                             class="nav-item nav-link"
                                             id="nav-profile-tab"
                                             data-toggle="tab"
                                             href="details.htmlnav-profile"
                                             role="tab"
                                             aria-controls="nav-profile"
                                             aria-selected="false" @click="categorySearch(category.title)" v-for="(category,index) in category" :key="index"
                                             >{{ category.title }}</a>
                        
                                        </div>
                                    </nav>
                                    <!--End Nav Button  -->
                                </div>
                            </div>
                        </div>
              <div class="row">
                <div class="col-12">
                  <div class="d-flex justify-content-end mb-5">
                    <input type="text" class="form-control col-4" v-model="searchKey" @keyup.enter="search()">
                    <button type="submit" class="btn-success" @click="search()">
                      <i class="fa-solid fa-magnifying-glass p-2 "></i>
                    </button>
                  </div>
                  <!-- Nav Card -->
                   <div>
                    <div v-if="!userId" class="my-5 p-5">
                      <h1 class="text-danger">You don't have Permission for that</h1>
                      <h5 class="text-danger ">Please Login first</h5>
                    </div>
                    <div class="tab-content" v-if="userId" id="nav-tabContent">
                    <!-- card one -->
                    <div v-if="post.length == 0" class="my-5">
                      <h1 class="text-danger">There is no Post</h1>
                    </div>
                    <div 
                      class="tab-pane fade show active"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <div class="whats-news-caption">
                        <div class="row">
                          <div class="col-lg-6 col-md-6" v-for="(post,index) in post" :key="index">
                            <div class="single-what-news mb-100" @click="newDetails(post.id)">
                              <div class="what-img border col-10 shadow-sm">
                                <img v-bind:src=" 'http://localhost:8000/storage/'+ post.image "
                                  alt="" class="col-10"/>
                              </div>
                              <div class="what-cap border shadow-sm">
                                <span class="color1">{{ post.title }}</span>
                                <h4>
                                  <a href="details.html"
                                    >{{ post.description }}</a
                                  >
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                   </div>
                  <!-- End Nav Card -->
                </div>
              </div>
            </div>
           </div>
           </div>
        </section>
        <!-- Whats New End -->
  </div> 
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
  export default {
    name: 'HomeView',
    data () {
      return {
        post : [],
        category : [],
        searchKey : '',
        tokenStatus : false
      }
    },
    computed: {
            ...mapGetters(['getToken','getUser'])
      },
    methods: {
      data () {
        axios.get("http://localhost:8000/api/post").then((response) => {
          this.post = response.data.post;
        })
      },
      login(){
        this.$router.push({
          name : 'loginPage'
        })
      },
      getCategory(){
        axios.get("http://localhost:8000/api/category").then((response) => {
          this.category = response.data.category;
        })
      },
      newDetails(id){
        this.$router.push({
           name: 'newDetails',
           query: {
            newsId: id 
          },
           userId : '',
        });
      },
      search(){
        let search = {
          key : this.searchKey
        }
        axios.post("http://localhost:8000/api/search",search).then((response) => {
          this.post = response.data.searchData;
        })
      },
      categorySearch(searchKey){
        let search = {
          key : searchKey
        }
        axios.post("http://localhost:8000/api/category/search",search).then((response) => {
          this.post = response.data.categoryData;
        })
      },
      checkToken(){
        if( this.getToken != null && this.getToken != ""){
          this.tokenStatus = true
        } else {
          this.tokenStatus = false
        }
      },
      userData() {
         this.userId = JSON.parse(localStorage.getItem('userId'));
      },
      logout(){
        this.$store.dispatch('setToken', null)
        localStorage.removeItem('userId',null)
        this.login()
      }
    },
  mounted() {
    this.userData();
    this.checkToken();
    this.data();
    this.getCategory();
    }
  }
</script>

<style lang="stylus" scoped>

</style>
