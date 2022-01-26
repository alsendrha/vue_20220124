<template>
    <div>
        <h3>src/components/BoardWrite.vue</h3>
        {{state}}
        <hr />
        제목 : <input type="text" v-model="state.title" /><br />
        내용 : 
            <div style="width:600px">
                <ckeditor 
                :editor="editor.editor" 
                :config="editor.editorConfig" 
                v-model="state.content"></ckeditor><br />
            </div>
        작성자 : <input type="text" v-model="state.writer" /><br />
        이미지 : 
                <img :src="state.imgurl" style="width:50px;height:50px" />
                <input type="file" @change="handleImage" /><br />
        <button @click="handleWrite">글쓰기</button><br />
    </div>
</template>

<script>
import {reactive} from 'vue';
import ClassisEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import {useRouter} from 'vue-router';

export default {
   
    setup () {
        const router = useRouter();

        //object
        const editor = {
            editor       : ClassisEditor,
            editorData   : '<p>테스트</p>',
            editorConfig : {}

        }

        //reactive
        const state = reactive({
            title   : '',
            content : '',
            writer  : '',
            imgdata : '',
            imgurl  : require('../assets/default.jpg'),
        });

        // 첨부 or 취소
        const handleImage = (e) => {
            console.log(e);
            if(e.target.files[0] ){ //첨부
                state.imgdata = e.target.files[0];
                // 크롬내부에 임시로 이미지를 표시하기 위한 URL생성
                state.imgurl  = URL.createObjectURL(e.target.files[0]);
            }
            else{//취소
                state.imgdata = '';
                state.imgurl  = require('../assets/default.jpg');
            }
        };

        const handleWrite = async () => {
            if(state.title === ''){
                alert('제목을 입력하세요.');
                return false;
            }

            if(state.writer === ''){
                alert('작성자를 입력하세요.');
                return false;
            }

            const url = `/board/insert`;
            const headers = {"Content-Type":"mulipart/form-data"};
            const body = new FormData();
            body.append("title", state.title);
            body.append("contect", state.contect);
            body.append("writer", state.writer);
            body.append("image", state.imgdata);
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status===200){
                alert('등록되었습니다');
                router.push({name:'Board'});
            }
        }
        
        return {state, handleImage, handleWrite, editor}
    }
}
</script>

<style lang="css">
.ck-editor__editable {
    min-height: 500px;
}


</style>