<template>
    <div>
        <h3>파일명 : src/components/seller/Menu1Insert.vue</h3>

        <button @click="handleAdd">항목추가</button>
        <button @click="handleSub">항목삭제</button>
        {{state.items}}
        <table border="1">
            <tr v-for="(tmp, idx) in state.cnt" :key="tmp">
                <!-- 파일은 v-model이 안됨 -->
                <td><input type="file" @change="handleImage($event,idx)"/></td>
                <td><input type="text" v-model="state.items[idx].name" placeholder="물품명"/></td>
                <td><input type="text" v-model="state.items[idx].price" placeholder="가격"/></td>
                <td><input type="text" v-model="state.items[idx].quantity" placeholder="수량"/></td>
                <td><input type="text" v-model="state.items[idx].content" placeholder="설명"/></td>
            </tr>
        </table>
        <button @click="handleInsertAction">일괄추가</button>

    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';
export default {
    setup () {
        const state = reactive({
            cnt : 2,
            token : sessionStorage.getItem("TOKEN"),
            items : [
                {
                    image : '',
                    name : '귤',
                    price : 112,
                    quantity : 3,
                    content : '맛있는귤',
                },
                {
                    image : '',
                    name : '오렌지',
                    price : 117,
                    quantity : 2,
                    content : '맛있는오렌지',
                }
            ],
        });

        const handleAdd = () => {
            state.cnt++;
            // state.items의 마지막에 {}것을 추가
            state.items.push({
                image : '',
                name : '귤',
                price : 112,
                quantity : 3,
                content : '맛있는귤',
            });
        }

        const handleSub = () => {
            if(state.cnt >= 3){ // 1개를 뺏을때 2이상이면
                state.cnt--; // 실제적으로 숫자를 뺌
                //state.items의 마지막에 {}것을 제거
                state.items.pop(); // 추가했던 항목의 마지막을 제거함
            }
        };

        // 파일을 첨부하거나 또는 취소하거나
        const handleImage = (e, idx) => {
            if(e.target.files[0]){
                console.log(e); // 첨부한 파일의 정보
                console.log(idx); // 위치
                state.items[idx].image = e.target.files[0];
            }
            else{
                state.items[idx].image = '';
            }
        }

        const handleInsertAction = async() => {
            const url = `/seller/insert`;
            const headers = {"Content-Type":"multipart/form-data", "token":state.token};
            const body = new FormData();
            for(let i=0;i<state.items.length;i++){
                body.append("image", state.items[i].image);
                body.append("title", state.items[i].name);
                body.append("price", state.items[i].price);
                body.append("quantity", state.items[i].quantity);
                body.append("content", state.items[i].content);
            }
            const response = await axios.put(url, body, {headers});
            console.log(response.data);
            

        }

        return {state, handleSub, handleAdd, handleImage, handleInsertAction}
    }
}
</script>

<style lang="scss" scoped>

</style>