<template>
    <div>
        <h3>src/components/BoardContent.vue</h3>

        <div v-if="state.item">
            <el-card>
                <el-descriptions direction="horizontal" :column="4"  border>
                    <el-descriptions-item label="제목" :span="2">{{state.item.title}}</el-descriptions-item>
                    <el-descriptions-item label="시간" :span="2">{{state.item.regdate}}</el-descriptions-item>
                    <el-descriptions-item label="작성자" :span="2">{{state.item.writer}}</el-descriptions-item>
                    <el-descriptions-item label="조회수" :span="2">{{state.item.hit}}</el-descriptions-item>
                    <el-descriptions-item label="이미지">
                    <img :src="state.item.imageurl" style="width:300px" />
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
            <hr />

            <router-link to="/board"><button>목록으로</button></router-link>
            <button @click="handleDelete">삭제</button>
            <button @click="handleUpdate">수정</button>
            <button v-if="state.item.prev" @click="handleData(1)">이전글</button>
            <button v-if="state.item.next" @click="handleData(2)">다음글</button>
            <hr />

            <div v-for="tmp in state.reply" :key="tmp" >
                <table border="1" class="one" style="width:500px" >  
                    <th>{{tmp._id}}</th>
                    <th >내용</th>
                    <td>{{tmp.content}}</td>
                    <th>작성자</th>
                    <td>{{tmp.writer}}</td>     
                    <button @click="handleReplyDelete(tmp._id)">삭제</button>         
                </table>
            </div>
            <hr />
            <el-form :inline="true">
                    <el-form-item label="" >
                        <el-input :span="10" v-model="state.reply1.content" placeholder="댓글내용"/>
                    </el-form-item>
                    <el-form-item label="" >
                        <el-input v-model="state.reply1.writer" placeholder="작성자"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" round @click="handleReplyAction">댓글저장</el-button>
                    </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
import axios from 'axios'; //벡엔드연동
import { reactive, onMounted } from 'vue'; //state변수,
import { useRoute } from 'vue-router'; //페이지 이동후 route.query
import { useRouter } from 'vue-router'; //페이지 이동시킴

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();

        // state변수 생성
        const state = reactive({
            no : route.query.no, //?no=113
            reply1 : {
                content : '',
                writer : '',
            }
        });

        const handleReplyDelete = async(no) => {
            const url = `/board/deletereply?no=${no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.delete(url, {headers});
            console.log(response.data);
            if(response.data.status===200){
                alert('삭제되었습니다');
                await handleReplyMound(state.no);
            }


        }


        //삭제하기 메소드 생성
        const handleDelete = async() => {
            if(confirm('삭제할까요?')){
                console.log('handleDelete');
                const url = `/board/delete?no=${state.no}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.delete(url, {headers});
                console.log(response.data);
                if(response.data.status===200){
                    alert('삭제되었습니다');
                    router.push({name:"Board", query:{page:1, text:''}})
                }
            }
        };

        const handleMount = async(no) => {
            const url = `board/selectone?no=${no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
            }
        }

        const handleReplyMound = async(no) => {
            const url = `board/selectreply?no=${no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            if(response.data.status===200){
                state.reply = response.data.result;
            }
        }
        const handleReplyAction = async() => {
            const url = `/board/insertreply`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                content : state.reply1.content,
                writer : state.reply1.writer,
                boardno : state.no
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                await handleReplyMound(state.no);
            }
        }

        onMounted( async() => {
            await handleMount(state.no);
            await handleReplyMound(state.no);

        });

        // 수정할 수 있는 화면으로 전환
        const handleUpdate = () => {
            router.push({name:"BoardUpdate", query:{no : state.no}});
        }

        const handleData = async(idx) => {
            if(idx === 1){//이전글
                // 주소창 변경
                // 게시판상세화면 -> 게시판상세화면 onMounted()
                router.push({name:"BoardContent", query:{no:state.item.prev}});
                state.no = state.item.prev;
                await handleMount(state.no);
                await handleReplyMound(state.no);
            }
            else if(idx === 2){//다음글
                router.push({name:"BoardContent", query:{no:state.item.next}});
                state.no = state.item.next;
                await handleMount(state.no);
                await handleReplyMound(state.no);
                
            }
        }

        return{state, handleDelete, handleUpdate, handleReplyAction, handleData, handleReplyDelete}

    }, 

    
}
</script>

<style lang="scss" scoped>
.one{
    text-align:center;
    border-collapse: collapse;
    table-layout: fixed;
    border-style: solid;
    
   
}

</style>