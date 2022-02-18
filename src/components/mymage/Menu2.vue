<template>
    <div>
        <h3>암호변경</h3>
            <el-form :inline="true" >
                <el-form-item  label="기존암호" label-width="100px">
                    <el-input  size="mini" v-model="state.pw" placeholder="기존암호"/>
                </el-form-item>
            </el-form>
            <el-form :inline="true" >
                <el-form-item label="새암호" label-width="100px" style="margin-top:-20px">
                    <el-input  size="mini" v-model="state.pw1" type="password" placeholder="새암호"/>
                </el-form-item>
            </el-form>
            <el-form :inline="true" >
                <el-form-item label="암호확인" label-width="100px" style="margin-top:-20px">
                    <el-input  size="mini" v-model="state.pw2" type="password" placeholder="암호확인"/>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="mini" round style="margin-left:100px" @click="handleUpdateAction">변경</el-button>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
export default {
    setup () {
        const state = reactive({
            pw : '',
            pw1 : '',
            pw2 : '',
            token : sessionStorage.getItem("TOKEN"),

        });

        const handleUpdateAction = async() => {
            if(state.token !==null){
                const url = `/member/updatepw`;
                const headers = {"Content-Type":"application/json", "token":state.token};
                const body = {
                    password : state.pw,
                    password1 : state.pw1,
                    };
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