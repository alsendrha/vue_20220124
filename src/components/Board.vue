<template>
    <div>
        <h3>src/components/Board.vue</h3>
        <!-- <el-card shadow="always">
            <el-table :data="state.item.result" style="width: 100%" @click="handleBoardContent(row)">
                <el-table-column prop="no" label="no" width="180" />
                <el-table-column prop="title" label="title" width="180" />
                <el-table-column prop="weiter" label="weiter" />
                <el-table-column prop="hit" label="hit" />
            </el-table>
        </el-card> -->

       <table border="1">
            <tr v-for="tmp in state.item.result" :key="tmp">
                <td @click="handleBoardContent(tmp.no)">{{tmp.no}}</td>
                <td>{{tmp.title}}</td>
                <td>{{tmp.writer}}</td>
                <td>{{tmp.hit}}</td>
            </tr>    
        </table>
    </div>
</template>

<script>
import {onMounted, reactive} from 'vue';
import {useRouter} from 'vue-router';
export default {
    setup () { 
        const router = useRouter();

        const state = reactive({
            item : {},
        });

        // 생명주기 onMounted()
        onMounted(()=>{
            //벡엔드로 데이터를 받음
            state.item.result = [
                {no:1, title:'가1', weiter:'b', hit:14  },
                {no:2, title:'나1', weiter:'c', hit:24  },
                {no:3, title:'다1', weiter:'d', hit:34  },
            ];
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