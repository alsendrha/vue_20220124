<template>
    <div>
        <h3>Login.vue</h3>
        <el-card shadow="always">
            <el-form :inline="true" >
                <el-form-item  label="아이디" label-width="80px">
                    <el-input v-model="state.userid" size="mini" placeholder="아이디"/>
                </el-form-item>
            </el-form>
            <el-form :inline="true" >
                <el-form-item label="암호" label-width="80px" style="margin-top:-20px">
                    <el-input v-model="state.userpw" size="mini" type="password" placeholder="암호"/>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="mini" round style="margin-left:75px">로그인</el-button>
            <el-button type="primary" size="mini" round >회원가입</el-button>
            </el-card>

        

    </div>
</template>

<script>
import { reactive } from 'vue';
export default {
    //ver 3.0
    setup () { // this를 사용할 수 없음
        const state = reactive({
            userid : '',
            userpw : '',

        });

        const handleLogin = () =>{
            console.log('로그인버튼 클릭', state.userid, state.userpw);

        };

        return {state, handleLogin}  // return에 넣어줘야됨
    },

        //ver 2.0
    // data(){
    //     return{
    //         state : {
    //             userid : 'aaa',
    //             userpw : 'bbb'
    //         }
    //     }
    // },


}
</script>

<style lang="scss" scoped>

</style>