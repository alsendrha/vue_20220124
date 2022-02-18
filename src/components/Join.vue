<template>
    <div class="style1">
        <el-card shadow="always">
            <el-form :inline="true"  >
                <el-form-item  label="아이디" label-width="80px">
                    <el-input  size="mini" ref="userid" v-model="state.userid" placeholder="아이디" @keyup="handleEmailCheck"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" round >{{state.usermailcheck}}</el-button> 
                </el-form-item>
            </el-form>
            
            <el-form :inline="true"  >
                <el-form-item label="암호" label-width="80px" style="margin-top:-20px" >
                    <el-input  size="mini" ref="userpw" v-model="state.userpw" type="password" placeholder="암호"/>
                </el-form-item>
            </el-form>

            <el-form :inline="true"  >
                <el-form-item label="암호확인" label-width="80px" style="margin-top:-20px">
                    <el-input  size="mini" ref="userpw1" v-model="state.userpw1" type="password" placeholder="암호확인"/>
                </el-form-item>
            </el-form>

             <el-form :inline="true"  >
                <el-form-item  label="이름" label-width="80px" style="margin-top:-20px">
                    <el-input  size="mini" ref="username"  v-model="state.username" placeholder="이름" @keyup.enter="handleJoin"/>
                </el-form-item>
            </el-form>


            <el-form :inline="true" style="margin-top:-20px" >
                <el-form-item label="이용약관" label-width="80px">
                    <el-input  type="textarea" v-model="state.text" placeholder="이용약관"></el-input>
                </el-form-item>
            </el-form>

            <el-form :inline="true"  >
                <el-form-item  label="권한" label-width="80px" style="margin-top:-20px">
                    <el-select v-model="state.userrole" size="mini" placeholder="Select">
                        <el-option value="CUSTOMER" label="고객">고객</el-option>
                        <el-option value="SELLER" label="판매자">판매자</el-option>
                    </el-select>
              </el-form-item>
            </el-form>
            <!-- 권한 : 
            <select v-model="state.userrole">
                <option value="CUSTOMER" >고객</option>
                <option value="SELLER" >판매자</option>
            </select><br /> -->

            <el-button type="primary" size="mini" round style="margin-left:75px" @click="handleJoin">회원가입</el-button>
            <el-button type="primary" size="mini" round @click="hendleHome">홈으로</el-button>
        </el-card>

       
    </div>
</template>

<script>
import axios from 'axios'
import { reactive, ref } from 'vue'
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
export default {
    setup () {
        // High레벨 변수 생성 : 오브젝트만 변화감지
        // 변수아닌 string으로 입력하면 동작 안함
        // 변수 1 리턴 2 화면 3

        const store = useStore();

        
        
        const state = reactive({
            userid     : '',
            userpw     : '',
            userpw1    : '',
            username   : '',
            usermailcheck : '중복확인',
            text       : '약관동의',
            userrole : 'CUSTOMER',

        });

        const router = useRouter();


        //Low 레벨 변수 생성 : 오브젝트가 아님
        const userid = ref(null); //위에서 연결하면 aaa값은 의미가 없어짐
        const userpw = ref(null);
        const userpw1= ref(null);
        const username = ref(null);

        //정확한 이메일 주소인지 확인
        const validEmail = (email) => {
            // 정규표현식
            var re = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]*$/i;
            return re.test(email);
        }

        const handleEmailCheck = async() => {
            if(validEmail(state.userid)){
                console.log(state.userid);
                const url = `/member/emailcheck?email=${state.userid}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    if(response.data.result === 1){
                        state.usermailcheck = '사용불가';
                    }
                    else{
                    state.usermailcheck = '사용가능';
                    }
                }
            }
             else{
            state.usermailcheck = '중복확인';
            }
        }
       


        const handleJoin = async() => {
            if(state.userid===''){
                alert('아이디를 입력하세요.')
                userid.value.focus();
                return false;
            }
            if(state.userpw===''){
                alert('암호를 입력하세요.')
                 userpw.value.focus();
                return false;
            }
            if(state.userpw1===''){
                alert('암호확인을 입력하세요.')
                 userpw1.value.focus();
                return false;
            }
            if(state.userpw1 !== state.userpw){
                alert('암호가 일치하지 않습니다.')
                 userpw1.value.focus();
                return false;
            }
            if(state.username===''){
                alert('이름을 입력하세요.')
                 username.value.focus();
                return false;
            }

            if(state.usermailcheck !== '사용가능'){
                alert('이메일중복체크하세요.');
                userid.value.focus();
                return false;
            }

            //유효성 검증완료되는 시점에 벡엔드 연동

            const url = `/member/insert`;
            const headers = {"Content-Type":"application/json"};
            const body = {  email    : state.userid, 
                            password : state.userpw, 
                            name     : state.username,
                            role     : state.userrole
                            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('가입되었습니다');
                router.push({name : 'Home'});

                store.commit("setMenu", "/");
                store.commit("setLogged", false);

            }
            
        }

        const hendleHome = () => {
            router.push({name : 'Home'})
        };


11

        return {state, handleEmailCheck, validEmail, username, handleJoin, userid, userpw, userpw1, hendleHome, router }
    }
}
</script>

<!--scss, less => css-->
<!-- npm i sass-loader -->
<style lang="scss" scoped>
    .style1{
        border: 1px solid #cccccc;
        padding: 20px;
    }

</style>