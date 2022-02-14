<template>
    <div>
        <!-- <el-card style="height:500px">
            <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
                <el-tab-pane label="정보수정" @click="handleMenu(1)">
                    <menu-1 ></menu-1>
                </el-tab-pane>
                <el-tab-pane label="암호변경" @click="handleMenu(2)">
                    <menu-2></menu-2>
                </el-tab-pane>
                <el-tab-pane label="회원탈퇴" @click="handleMenu(3)">
                    <menu-3></menu-3>
                </el-tab-pane>
                <el-tab-pane label="주문내역" @click="handleMenu(4)">
                    <menu-4></menu-4>
                </el-tab-pane>
            </el-tabs>
        </el-card> -->
        <button @click="handleMenu(1)">정보수정</button>
        <button @click="handleMenu(2)">암호변경</button>
        <button @click="handleMenu(3)">회원탈퇴</button>
        <button @click="handleMenu(4)">주문내역</button>
        <hr />

        <menu-1 v-if="state.menu === 1"></menu-1>
        <menu-2 v-if="state.menu === 2"></menu-2>
        <menu-3 v-if="state.menu === 3"></menu-3>
        <menu-4 v-if="state.menu === 4"></menu-4>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import Menu1 from './mymage/Menu1.vue';
import Menu2 from './mymage/Menu2.vue';
import Menu3 from './mymage/Menu3.vue';
import Menu4 from './mymage/Menu4.vue';

import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
export default {
    components:{
        Menu1, Menu2, Menu3, Menu4,
    },

    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            menu : Number(route.query.menu),
        });

        onMounted(() => {
            console.log(route.query.menu);
            if(typeof route.query.menu === 'undefined'){
                state.menu = 1
            }
        })

        const handleMenu = (idx) => {
            router.push({name:'Mypage', query:{menu:idx}});
            state.menu = idx;
        }

        

        return {state, handleMenu}
    }
}
</script>

<style lang="scss" scoped>

</style>