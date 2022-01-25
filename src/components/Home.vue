<template>
    <div>
        <h3>Home.vue</h3>
        
        <vueper-slides autoplay :touchable="false">
            <vueper-slide v-for="tmp in state.slides" 
                :key="tmp" 
                :title="tmp.title" 
                :image="tmp.image">
            </vueper-slide>
        </vueper-slides>

    </div>
</template>

<script>
import {VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';



export default {
    components:{
        VueperSlides, VueperSlide
    },

    setup () {
        const state = {
            slides : [
                {title : 'a', image:'http://picsum.photos/500/300?image=1'},
                {title : 'b', image:'http://picsum.photos/500/300?image=2'},
                {title : 'c', image:'http://picsum.photos/500/300?image=3'},
            ]
        }
        

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>