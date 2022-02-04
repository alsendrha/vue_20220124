<template>
    <div>
        <h3>파일명 : src/components/BoardUpdate.vue</h3>
        <div v-if="state.item">
            <el-card>
                <el-form :inline="true">
                    <el-form-item label="제목" label-width="60px" >
                            <el-input v-model="state.item.title"/>
                    </el-form-item>
                </el-form>

                <el-form :inline="true">
                    <el-form-item label="작성자" label-width="60px" >
                        <el-input v-model="state.item.writer"/>
                    </el-form-item>
                </el-form>

                <el-form :inline="true">
                    <el-form-item label="내용" label-width="60px" >
                        <el-input type="textarea" rows="6" v-model="state.item.content"/>
                </el-form-item>
                </el-form>

                <el-form :inline="true">
                    <el-form-item label=" " label-width="60px" >
                        <el-button type="primary" round @click="handleUpdateAction">수정</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            no : route.query.no

        });

        const handleData = async(no) => {
             const url = `board/selectone?no=${no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                state.item = response.data.result;
            }

        }
        onMounted( async() => {
            await handleData(state.no);

        });

        const handleUpdateAction = async() => {
            const url = `/board/update?no=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                title : state.item.title,
                content : state.item.content,
                writer : state.item.writer
            };
            const response = await axios.put(url, body, {headers});
            console.log(response.data);

            if(response.data.status === 200){
                alert('수정되었습니다');
                // 상세화면으로 이동시키기
                router.push({name:"BoardContent", query:{no:state.no}});
            }

        }
        

        return {state, handleUpdateAction}
    }
}
</script>

<style lang="scss" scoped>

</style>