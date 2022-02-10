<template>
    <div style="border:1px solid #cccccc;padding:20px">
        <h3>물품관리</h3>

        <button @click="handlePage">일괄추가</button>
        <button @click="handleDeleteBatchAction">일괄삭제</button>
        <button @click="handleUpdateBatchAction">일괄수정</button>
        {{state.items}}
        <hr />
        {{state.chk}}
        <table border="1" class="one">
            <tr>
                <th>체크</th>
                <th>물품코드</th>
                <th>이미지</th>
                <th>물품명</th>
                <th>가격</th>
                <th>수량</th>
                <th>내용</th>
                <th>등록일</th>
                <th>버튼</th>
                
            </tr>
            <tr v-for="(item, idx) in state.items" :key="item">
                <td><input type="checkbox" :value="item._id" v-model="state.chk" /></td>
                <td><button @click="handleDetailPage(item._id)">{{item._id}}</button></td>
                <td><img :src="item.imageUrl" style="width:50px;hight:50px"/>
                    <input type="file" @change="handelImage($event, idx)"/>
                </td>
                <td><input type="text" v-model="item.name" style="width:70px"/></td>
                <td><input type="text" v-model="item.price" style="width:30px"/></td>
                <td><input type="text" v-model="item.quantity" style="width:30px"/></td>
                <td><input type="text" v-model="item.content" style="width:100px"/></td>
                <td>{{item.regdate}}</td>
                <td>
                    <button @click="handleDeleteAction([item._id])">삭제</button>
                    <button @click="handleUpdateAction(idx)">수정</button>
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
            chk : [],
            token : sessionStorage.getItem("TOKEN")
        });

        const handleDetailPage = async(code) => {
            router.push({name: 'Menu1Detail', query:{code:code}});
        }

        const handleDeleteBatchAction = async() => {
                // state.chk = [1,2,3];
                await handleDeleteAction(state.chk);   
        }

        //일괄수정
        const handleUpdateBatchAction = async() => {
            let arr = [];
            // 전체 개수(1,2,3,4,5,6,7,8)
            for(let i=0;i<state.items.length;i++){
                // 체크한 개수(2,5,3)
                for(let j=0;j<state.chk.length;j++){
                    // 전체 내용에서 체크한 번호가 일치하면
                    if(state.items[i]._id === state.chk[j]){
                        // arr 변수에 일치하는 것만 저장
                        arr.push(state.items[i]);
                    }
                }
            }

            //arr는 사용자가 체크한 항목만 복사된 변수
            console.log(arr);

            const url = `/seller/update`;
            const headers = {"Content-Type":"multipart/form-data","token":state.token};
            
            //x => {code : 1012, }
            const body = new FormData();

            for(let i=0;i<arr.length;i++){
                body.append("image", arr[i].image); //배열X
                body.append("code", arr[i]._id);
                body.append("title", arr[i].name);
                body.append("price", arr[i].price);
                body.append("quantity", arr[i].quantity);
                body.append("content", arr[i].content);
            }

            const response = await axios.put(url, body, {headers:headers});
            console.log(response.data);
            if(response.data.status===200){
                await handleLoadData();
                state.chk = [];
            }
        }

        const handleUpdateAction = async(idx) => {

            const url = `/seller/update`;
            const headers = {"Content-Type":"multipart/form-data","token":state.token};
            
            //x => {code : 1012, }
            const body = new FormData();
            body.append("image", state.items[idx].image); //배열X
            body.append("code", state.items[idx]._id);
            body.append("title", state.items[idx].name);
            body.append("price", state.items[idx].price);
            body.append("quantity", state.items[idx].quantity);
            body.append("content", state.items[idx].content);
            

            const response = await axios.put(url, body, {headers:headers});
            console.log(response.data);
            if(response.data.status===200){
                await handleLoadData();
                
            }
            // state.items => [{수정 },{수정 },{수정 }]
            
        }

        const handelImage = (e, idx) => {
            if(e.target.files[0]){
                state.items[idx].image = e.target.files[0];
            }
            else{
                state.items[idx].image = '';
            }
        }

        const handleDeleteAction = async(code) => {
            if(confirm('삭제할까요?')){
                const url = `/seller/delete`;
                const headers = {"Content-Type":"application/json", "token":state.token};
                // { code : [ 1 ] }
                const body = {code:code};
                const response = await axios.delete(url, {headers:headers, data:body});
                console.log(response.data);
                if(response.data.status===200){
                    await handleLoadData();
                    state.chk = [];
                }
            }

        }

        const handlePage= () => {
            router.push({name:"Menu1Insert"});

        }

        const handleLoadData = async() => {
            const url = `/seller/selectlist`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status===200){
                state.items = response.data.result;
            }

        }

        //생명주기
        onMounted( async () => {
            await handleLoadData();
        });
        
        return {state, handleDetailPage, handleUpdateBatchAction, handleDeleteBatchAction, handleUpdateAction, handelImage, handleDeleteAction, handlePage}
    }
}
</script>

<style lang="scss" scoped>
.one{
    text-align: center;
}
</style>