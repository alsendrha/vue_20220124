<template>
    <div>
        <h3>정보수정</h3>
            <el-form :inline="true" >
                <el-form-item  label="이름" label-width="100px">
                    <el-input  size="mini" v-model="state.name" placeholder="이름"/>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="mini" round style="margin-left:100px" @click="handleUpdateAction">정보변경</el-button>
    </div>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios';
export default {
    setup () {
        const state = reactive({
            name : '',
            token : sessionStorage.getItem("TOKEN")

        });

        const handleUpdateAction = async() => {
            if(state.token !==null){
                const url = `/member/update`;
                const headers = {"Content-Type":"application/json", "token":state.token};
                const body = {name : state.name};
                const response = await axios.put(url, body, {headers});
                console.log(response.data);
                if(response.data.status===200){
                    alert('변경되었습니다');
                }
            }
            else{
                // URL을 홈으로 변경
                // 메뉴 선택을 /
                // 로그인 상태를 false
            }
        }
        

        return {state, handleUpdateAction}
    }
}
</script>

<style lang="scss" scoped>

</style>