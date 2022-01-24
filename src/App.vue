<template>
  <div>
    <!-- ElMenu.vue -->
    <!-- Props로 default-active 숫자값을 전달 -->
    <!-- Props로 router TRUE값을 전달 -->
    <!-- 자식컴포넌트 emit를 통해서 select이벤트 -->
    <el-menu :default-active="state.activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      @select="handleSelect">

      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/login">Login</el-menu-item>
      <el-menu-item index="/join">Join</el-menu-item>
      <el-menu-item index="/board">Board</el-menu-item>
      <el-menu-item index="/admin">Admin</el-menu-item>
      
    </el-menu>
    <!-- {{menu}}, {{logged}} -->

    <router-view></router-view>
  </div>
</template>

<script>
import {useStore} from 'vuex';
import {computed, reactive} from 'vue';
export default {
  setup () {
    //state변수 생성
    

    const store = useStore();

    //store값 가져오기
    // 마지막으로 방문한 페이지를 session저장소에 보관후에 반환
    const menu = computed(() => {
      return store.getters.getMenu
    });

    const logged = computed(() => {
      return store.getters.getLogged
    });

    const state = reactive({
      activeIndex : menu
    });

    //store값 변경하기
    const handleSelect = (idx) => {
      console.log(idx);
      store.commit("setMenu", idx);
    }
    // store의 state 변수가 변경되는 시점을 바로 알수 있음.
    store.subscribe((mutation, state) =>{
      console.log('store.subscribe', mutation, state);
    })

    return {menu, logged, handleSelect, state}
  }
}
</script>

<style lang="scss" scoped>

</style>