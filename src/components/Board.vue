<template>
    <div>
        <h3>src/components/Board.vue</h3>
        <el-card shadow="always">
            <el-table :data="state.item.result" style="width: 100%">
                <el-table-column prop="_id"  label="no" width="180" >
                <template #default="scope">
                    <div @click="handleBoardContent(scope.row._id)" style="cursor:pointer;">
                    {{scope.row._id}}
                    </div>
                </template>
                </el-table-column>
                <el-table-column prop="title" label="title" width="180" />
                <el-table-column prop="writer" label="writer" />
                <el-table-column prop="hit" label="hit" />
                <el-table-column prop="regdate" label="regdate" />
            </el-table>
        </el-card>

        <router-link to="/boardWrite">글쓰기</router-link>

       <table border="1">
           <thead>
               <tr>
                   <th>no</th>
                   <th>title</th>
                   <th>regdate</th>
                   <th>writer</th>
                   <th>hit</th>
               </tr>
           </thead>
           <tbody>
            <tr v-for="tmp in state.item.result" :key="tmp">
                <td @click="handleBoardContent(tmp._id)">{{tmp._id}}</td>
                <td>{{tmp.title}}</td>
                <td>{{tmp.regdate}}</td>
                <td>{{tmp.writer}}</td>
                <td>{{tmp.hit}}</td>
            </tr>  
           </tbody>  
        </table>
    </div>
</template>

<script>
import {onMounted, reactive} from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';

export default {
    setup () { 
        const router = useRouter();

        const state = reactive({
            item : {},
            page : 1,
            text : ''
        });

        // 생명주기 onMounted()
        onMounted(async()=>{
            const url = `/board/select?page=${state.page}&text=${state.text}`;
            const headers = {"Contect-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status===200){
                state.item.result = response.data.rows;
            }

        });

        const handleBoardContent = (no) => {
            console.log(no);
            router.push({name:"BoardContent", query:{no:no}});

        }

        return {state, handleBoardContent}
    },

    // data(){
        

    //},
    // mounted(){

    // }
}
</script>

<style lang="scss" scoped>

</style>