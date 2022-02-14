<template>
    <div>
        <h3>Login.vue</h3>
        <el-card shadow="always">
            <el-form :inline="true" >
                <el-form-item  label="아이디" label-width="80px">
                    <el-input v-model="state.userid" ref="userid" size="mini" placeholder="아이디"/>
                </el-form-item>
            </el-form>
            <el-form :inline="true" >
                <el-form-item label="암호" label-width="80px" style="margin-top:-20px">
                    <el-input v-model="state.userpw" ref="userpw" size="mini" type="password" placeholder="암호" @keyup.enter="handleLogin"/>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="mini" round style="margin-left:75px" @click="handleLogin">로그인</el-button>
            <el-button type="primary" size="mini" round @click="handleJoin" >회원가입</el-button>
            </el-card>

        

    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
import {useStore} from 'vuex';
export default {
    

    //ver 3.0
    setup () { // this를 사용할 수 없음

        const store = useStore();

        const state = reactive({
            userid : '',
            userpw : '',

        });

        const router = useRouter();

        const userid = ref(null);
        const userpw = ref(null);

        const handleLogin = async() =>{
            console.log('로그인버튼 클릭', state.userid, state.userpw);
            if(state.userid===''){
                alert('아이디를 입력해주세요.')
                userid.value.focus();
                return false;
            }
            if(state.userpw===''){
                alert('암호를 입력해주세요.')
                userid.value.focus();
                return false;
            }

            const url = `/member/select`;
            const headers = {"Content-Type":"application/json"};
            const body = {email : state.userid, password : state.userpw};
            const response = await axios.post(url, body, {headers});
            console.log(response.data.token);
            if(response.data.status === 200){
                sessionStorage.setItem("TOKEN", response.data.token);
                alert('로그인되었습니다');

                const curl = sessionStorage.getItem("CURL");
                if(curl === null){

                    // 주소창만 바뀜
                    router.push({name:'Home'});

                    // App.vue에 메뉴의 선택항목을 변경하도록 알려줌
                    store.commit("setMenu", "/");
                    // 로그인상태
                    store.commit("setLogged", true);
                }
                else{ // 이동하고자하는 페이지가 존재하면
                    const query = JSON.parse(sessionStorage.getItem("CURL_QUERY"));
                    const params = JSON.parse(sessionStorage.getItem("CURL_PARAMS"));
                    router.push({name:curl, query:query, params:params});
                }
                store.commit("setLogged", true);
            }
            
        };

        const handleJoin = () => {
            router.push({name:'Join'});
            
        }

        return {state, handleLogin, handleJoin, userid, userpw}  // return에 넣어줘야됨
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