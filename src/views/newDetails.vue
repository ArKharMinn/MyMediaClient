<template>
    <div>
        <main>
    <!-- About US Start -->
    <div class="about-area">
        <div class="container">
                <!-- Hot Aimated News Tittle-->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="trending-tittle">
                            <!-- <strong>Trending now</strong> -->
                            <!-- <p>Rem ipsum dolor sit amet, consectetur adipisicing elit.</p> -->
                            <div class="trending-animated">
                                <ul id="js-news" class="js-hidden">
                                    <li class="news-item">Bangladesh dolor sit amet, consectetur adipisicing elit.</li>
                                    <li class="news-item">Spondon IT sit amet, consectetur.......</li>
                                    <li class="news-item">Rem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                    <div class="my-4 d-flex justify-content-start">
                       <button type="submit" @click="back()" class="rounded px-3 py-2 btn-dark">Back</button>
                    </div>
               <div class="row">
                    <div class="col-lg-8">
                        <!-- Trending Tittle -->
                        <div class="about-right mb-90">
                            <div class="about-img border shawdow-sm">
                                <img v-bind:src="'http://localhost:8000/storage/'+posts.image" alt="">
                            </div>
                            <div class="section-tittle  pt-30">
                                <h2>{{ posts.title }}</h2> 
                            </div>
                            <div class="section-tittle mb-30 pt-30">
                                <p>{{ posts.description }}</p> 
                            </div>
                            <div class="social-share pt-30">
                                <div class="section-tittle">
                                    <h5 class="mr-20"><i class="fa-solid fa-eye"></i> 
                                        <span>{{ view }}</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <!-- From -->
                       
                    </div>
                    <div class="col-lg-4">
                        <!-- New Poster -->
                        <div class="news-poster d-none d-lg-block">
                            <img src="assets/img/news/news_card.jpg" alt="">
                        </div>
                    </div>
               </div>
        </div>
       
    </div>
    <!-- About US End -->
</main> 
    </div>
</template>

<script>
   import { mapGetters } from 'vuex';
    import axios from 'axios';
    export default {
       name : 'newDetails',
       data () {
        return {
            postId: 0,
            posts : [],
            view : 0,
        }
       },
       computed:{
        ...mapGetters(['getToken','getUser'])
       },
       methods: {
           back(){
            this.$router.push({
            name : 'home'
        })
           },
           loadPost(id) {
               let post = {
                postId : id
               }
               axios.post("http://localhost:8000/api/detail",post).then((response) => {
                this.posts = response.data.post
              })
            }
        },
       mounted () {
           let data = {
            user_id : JSON.parse(localStorage.getItem('userId')),
            post_id : this.$route.query.newsId
           }
           axios.post("http://localhost:8000/api/actionLog",data).then((response) => {
            this.view = response.data.view.length
           })
           this.postId = this.$route.query.newsId;
           this.loadPost(this.postId);
       }
    }
</script>

<style lang="stylus" scoped>

</style>
