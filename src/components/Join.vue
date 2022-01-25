<template>
    <div class="style1">
        <el-card shadow="always">
            <el-form :inline="true"  >
                <el-form-item  label="아이디" label-width="80px">
                    <el-input  size="mini" ref="userid" v-model="state.userid" placeholder="아이디"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" round >중복확인</el-button> 
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
                    <el-input  size="mini" ref="username"  v-model="state.username" placeholder="이름"/>
                </el-form-item>
            </el-form>

            <el-form :inline="true"  >
            <el-form-item label="생일" label-width="80px" style="margin-top:-20px">
                <el-date-picker type="date" size="mini" ref="userdate" v-model="state.userdate" placeholder="날짜선택"/>
            </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-top:-20px" >
                <el-form-item  label="이메일" label-width="80px" >
                    <el-input  size="mini" ref="useremail" v-model="state.useremail" placeholder="이메일"/>
                </el-form-item>
             
                <el-form-item>@</el-form-item>
                <el-form-item>
                        <el-select size="mini" ref="useremail1" v-model="state.useremail1" clearable placeholder="Select">
                            <el-option  v-for="tmp in state.emailoption" :key="tmp" :label="tmp" :value="tmp">
                            </el-option>
                        </el-select>
                </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-top:-20px" >
                <el-form-item label="이용약관" label-width="80px">
                    <el-input  type="textarea" v-model="state.text" placeholder="이용약관"></el-input>
                </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-top:-20px" >
                <el-form-item label=" " label-width="80px">
                    <el-checkbox label="동의" v-model="state.userchk" size="large"></el-checkbox>
                </el-form-item>
            </el-form>

            <el-button type="primary" size="mini" round style="margin-left:75px" @click="handleJoin">회원가입</el-button>
            <el-button type="primary" size="mini" round >홈으로</el-button>
        </el-card>
       
    </div>
</template>

<script>
import { axios } from 'axios'
import { reactive, ref } from 'vue'
export default {
    setup () {
        // High레벨 변수 생성 : 오브젝트만 변화감지
        // 변수아닌 string으로 입력하면 동작 안함
        // 변수 1 리턴 2 화면 3
        
        const state = reactive({
            userid     : '',
            userpw     : '',
            userpw1    : '',
            userdate   : '',
            username   : '',
            useremail  : '',
            useremail1 : '',
            text       : '약관동의',
            userchk    : false,

            emailoption : ['naver.com','gmail.com','daum.net']

        });


        //Low 레벨 변수 생성 : 오브젝트가 아님
        const userid = ref(null); //위에서 연결하면 aaa값은 의미가 없어짐
        const userpw = ref(null);
        const userpw1= ref(null);
        const userdate= ref(null);
        const useremail= ref(null);
        const useremail1= ref(null);
        const username = ref(null);


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
            if(state.userdate===''){
                alert('생일을 입력하세요.')
                 userdate.value.focus();
                return false;
            }
            if(state.useremail===''){
                alert('이메일을 입력하세요.')
                 useremail.value.focus();
                return false;
            }
            //  if(state.useremail1===''){
            //     alert('이메일을 입력하세요.')
            //      useremail1.value.focus();
            //     return false;
            // }
             if(state.userchk===''){
                alert('동의를 클릭하세요.')
                return false;
            }

            //유효성 검증완료되는 시점에 벡엔드 연동

            const url = "http://ihongss.com/json/exam13.json";
            const headers = {"Content-type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            
        }




        return {state, username, handleJoin, userid, userpw, userpw1, userdate, useremail, useremail1 }
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