<template>
    <div>
        <h3>파일명 : src/components/seller/Menu1Detail.vue</h3>

        <div v-if="state.item">
            <table border="1" class="one">
                <thead>
                    <tr>
                        <th>code</th>
                        <th>name</th>
                        <th>content</th>
                        <th>price</th>
                        <th>quantity</th>
                        <th>regdate</th>
                        <th>사진</th>
                    </tr>
                </thead>
                2
                <tbody>
                    <tr>
                        <td>{{state.item._id}}</td>
                        <td>{{state.item.name}}</td>
                        <td>{{state.item.content}}</td>
                        <td>{{state.item.price}}</td>
                        <td>{{state.item.quantity}}</td>
                        <td>{{state.item.regdate}}</td>
                        <img :src="state.item.imageUrl" style="width:200px;height:200px"/> 
                        
                    </tr>
                </tbody>
            </table>
            <div v-for="tmp in state.item.subImage" :key="tmp" style="display:inline-block">
                <img :src="tmp.imageUrl" style="width:100px;height:100px" />
            </div> 

        </div>     
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'; // 페이지 이동시킴
import axios from 'axios';
export default {
    setup () {
        const route = useRoute(); //이동 하기
        const state = reactive({
            code : route.query.code,
            token : sessionStorage.getItem("TOKEN"),
        });

        const handleLoadData = async() => {
            const url = `/seller/selectone?code=${state.code}`;
            const headers = {"Content-Type":"application/json","token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status===200){
                state.item = response.data.result;
            }
        }

        onMounted(  async() => {
            await handleLoadData();
            
        });

       

       
        
        // 생명주기 onMounted에서
        // /seller/selectone?code=111 을 호출해서 화면에 표시하시오.
        return {state}
    }
}
</script>

<style lang="scss" scoped>
.one{
    text-align: center;
}
</style>