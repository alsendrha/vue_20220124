<template>
  <div style="padding:5px">
    <h3>Home.vue</h3>
    
    <vueper-slides autoplay style="width:500px; height:100px" >
      <vueper-slide v-for="tmp in state.slides" 
        :key="tmp" 
        :title="tmp.title" 
        :image="tmp.image">
      </vueper-slide>
    </vueper-slides>
    <br /><br /><br /><br /><br />
    <hr />

    <div v-if="state.items" style="margin-top:10px">
      <el-row :gutter="20" v-for="(i, idx1) in state.items.length/4" :key="i" style="padding:20px">
        <el-col :span="6" :gutter="5" v-for="(j, idx2) in 4" :key="j" >
          <div style="border:1px solid #cccccc;padding:20px; cursor:pointer"
            @click="handleDetailPage(state.items[(idx1 * 4) + idx2]._id)">
            {{idx1}}
            {{idx2}} 
            {{(idx1*4)+ idx2 }}<br />
            <img :src="state.items[ (idx1*4)+ idx2 ].imageUrl" style="width:100px;height:100px"/><br />
            {{state.items[ (idx1*4)+ idx2 ].name}}<br />
            {{state.items[ (idx1*4)+ idx2 ].price}}<br />
            {{state.items[ (idx1*4)+ idx2 ].content}}<br />
          </div>
        </el-col>
      </el-row>
    </div>


    </div>
</template>

<script>
import {onMounted, reactive} from 'vue';
import {VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  components:{
      VueperSlides, VueperSlide
  },

  setup () {

    const router = useRouter();

    const state = reactive({
      slides : [
          {title : '', image:'http://picsum.photos/500/300?image=1'},
          {title : '', image:'http://picsum.photos/500/300?image=2'},
          {title : '', image:'http://picsum.photos/500/300?image=3'},
      ],
      page : 1,

    });

    const handleLoadData = async() => {
      const url = `/shop/select?page=${state.page}`;
      const headers = {"Content-Type":"application/json"};
      const response = await axios.get(url, {headers});
      console.log(response.data);
      if(response.data.status===200){
          state.items = response.data.result;

        // 15 % 4 => 3 => 1
        // 14 % 4 => 2 => 2
        // 13 % 4 => 1 => 3
        // 12 % 4 => 0 => 0
        const mod = Math.floor(state.items.length % 4);
        for(let i=0;i< 4-mod;i++){
          state.items.push({
            constent : "준비중입니다.",
            imageUrl : require('../assets/default.png'),
            name : "준비중",
            price : 0,
            quantity : 0,
            seller : "",
            _id : 0
          })
        }
      }

    }
    const handleDetailPage = (code) => {
      router.push({name:"ItemContent", query:{code:code}});
    }

    onMounted(async()=>{
      await handleLoadData();
        
    });
    

    return {state, handleDetailPage }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
// 이미지 가운데 정렬
img {
  display : block ;
  margin : 0 auto ;
}
</style>