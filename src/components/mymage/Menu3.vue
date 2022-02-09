<template>
    <div>
        <h3>파일명 src/components/mypage/Menu3.vue</h3>
        <el-card shadow="always">
           
            <el-form :inline="true" >
                <el-form-item label="암호" label-width="100px" style="margin-top:-20px">
                    <el-input  size="mini" v-model="state.pw" type="password" placeholder="암호"/>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="mini" round style="margin-left:100px" @click="handleDeleteAction">탈퇴</el-button>
        </el-card>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
export default {
    setup () {
        const router = useRouter();
        const store = useStore();

        const state = reactive({
            pw : '',
            token : sessionStorage.getItem("TOKEN"),


        });

        const handleDeleteAction = async() => {
            if(confirm('정말 탈퇴할까요?')){
                const url = `/member/delete`;
                const headers = {"Content-Type":"application/json", "token":state.token};
                const body = {
                    password : state.pw,
                    };
                const response = await axios.delete(url, {headers:headers, data:body});
                console.log(response.data);

                if(response.data.status===200){
                    sessionStorage.removeItem("TOKEN");
                    alert('탈퇴되었습니다');
                    // 주소창만 바뀜
                    router.push({name:'Home'});
                    // App.vue에 메뉴의 선택항목을 변경하도록 알려줌
                    store.commit("setMenu", "/");
                    // 로그인상태
                    store.commit("setLogged", false);
                }
            }
        }
        

        return {state, handleDeleteAction}
    }
}
</script>

<style lang="scss" scoped>

</style>