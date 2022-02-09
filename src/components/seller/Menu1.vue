<template>
    <div style="border:1px solid #cccccc;padding:20px">
        <h3>물품관리</h3>

        <button @click="handlePage">일괄추가</button>
        <button>일괄삭제</button>
        <button>일괄수정</button>

        <table border="1" class="one">
            <tr>
                <th>체크</th>
                <th>물품코드</th>
                <th>이미지</th>
                <th>물품명</th>
                <th>가격</th>
                <th>수량</th>
                <th>등록일</th>
                <th>버튼</th>
                
            </tr>
            <tr v-for="item in state.items" :key="item">
                <td><input type="checkbox" /></td>
                <td>{{item._id}}</td>
                <td><img :src="item.imageurl" style="width:50px;hight:50px"/></td>
                <td>{{item.name}}</td>
                <td>{{item.price}}</td>
                <td>{{item.quantity}}</td>
                <td>{{item.regdate}}</td>
                <td>
                    <button>수정</button>
                    <button>삭제</button>
                </td>
            </tr>
        </table>

    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    setup () {

        const router =useRouter();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN")
        });

        const handlePage= () => {
            router.push({name:"Menu1Insert"});

        }

        //생명주기
        onMounted( async () => {
            const url = `/seller/selectlist`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status===200){
                state.items = response.data.result;
            }

        })
        
        return {state, handlePage}
    }
}
</script>

<style lang="scss" scoped>
.one{
    text-align: center;
}
</style>