<template>
    <div>
        <h3>src/components/BoardContent.vue</h3>

        <div v-if="state.item">
            <el-descriptions direction="horizontal" :column="4"  border>
                <el-descriptions-item label="작성자" :span="2">{{state.item.writer}}</el-descriptions-item>
                <el-descriptions-item label="시간" :span="2">{{state.item.regdate}}</el-descriptions-item>
                <el-descriptions-item label="조회수" :span="2">{{state.item.hit}}</el-descriptions-item>
                <el-descriptions-item label="제목" :span="6">{{state.item.title}}</el-descriptions-item>
                <el-descriptions-item label="이미지">
                <img :src="state.item.imageurl" style="width:300px" />
                </el-descriptions-item>
            </el-descriptions>
            <hr />

       
            

        <router-link to="/board"><button>목록으로</button></router-link>
        <button @click="handleDelete">삭제</button>
        <button @click="handleUpdate">수정</button>
        <button v-if="state.item.prev" @click="handleData(1)">이전글</button>
        <button v-if="state.item.next" @click="handleData(2)">다음글</button>

        <div v-for="tmp in state.reply" :key="tmp">{{tmp.content}}(n개 출력)</div>
        <hr />
        <textarea rows="6" placeholder="댓글내용"></textarea>
        <input type="text" placeholder="작성자" />
        <button>댓글저장</button>
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
        });


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

        onMounted( async() => {
            await handleMount(state.no);
            await handleReplyMound(state.no);

        });

        const handleUpdate = async() => {
            const url = `/board/update?no=${state.no}`;
            const headers = {"Content-Type":"mulipart/form-data"};
            const body = {};
            const response = await axios.put(url , body, {headers});
            console.log(response.data);
        }

        const handleData = async(idx) => {
            if(idx === 1){//이전글
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

        return{state, handleDelete, handleReplyMound, handleUpdate, handleData}

    }, 

    
}
</script>

<style lang="scss" scoped>
.one{
    text-align:center;
}

</style>