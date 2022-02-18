<template>
    <div>
        <el-card>
            <el-button type="primary" size="mini" round plain @click="handleMenu(1)">정보수정</el-button>     
            <el-button type="primary" size="mini" round plain @click="handleMenu(2)">암호변경</el-button>     
            <el-button type="primary" size="mini" round plain @click="handleMenu(3)">회원탈퇴</el-button>     
            <el-button type="danger" size="mini" round plain @click="handleMenu(4)">주문내역</el-button>     
            <el-button type="danger" size="mini" round plain @click="handleMenu(5)">주소관리</el-button>     
            
            <!-- <button @click="handleMenu(1)">정보수정</button>
            <button @click="handleMenu(2)">암호변경</button>
            <button @click="handleMenu(3)">회원탈퇴</button>
            <button @click="handleMenu(4)">주문내역</button>
            <button @click="handleMenu(5)">주소관리</button> -->

            <hr />

            <menu-1 v-if="state.menu === 1"></menu-1>
            <menu-2 v-if="state.menu === 2"></menu-2>
            <menu-3 v-if="state.menu === 3"></menu-3>
            <menu-4 v-if="state.menu === 4"></menu-4>
            <menu-5 v-if="state.menu === 5"></menu-5>
        </el-card>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import Menu1 from './mymage/Menu1.vue';
import Menu2 from './mymage/Menu2.vue';
import Menu3 from './mymage/Menu3.vue';
import Menu4 from './mymage/Menu4.vue';
import Menu5 from './mymage/Menu5.vue';

import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
export default {
    components:{
        Menu1, Menu2, Menu3, Menu4, Menu5
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