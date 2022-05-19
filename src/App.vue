<template>
  <div>
    <el-header>
      <el-menu :default-active="state.activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
        @select="handleSelect"><h3>상단메뉴</h3>
        <el-menu-item index="/">메인</el-menu-item>
        <el-menu-item v-show="logged===false" index="/Login">로그인</el-menu-item>
        <el-menu-item v-show="logged===true" index="/Logout">로그아웃</el-menu-item>
        <el-menu-item v-show="logged===false" index="/join">회원가입</el-menu-item>
        <el-menu-item v-show="logged===true && urole === 'SELLER' " index="/Seller">Seller</el-menu-item>
        <el-menu-item v-show="logged===true && urole === 'CUSTOMER' " index="/Mypage">Mypage</el-menu-item>
        <el-menu-item index="/board">챌린지</el-menu-item>
        <el-menu-item index="/admin">1:1문의</el-menu-item>
        <el-menu-item index="/admin">관리자(안보임 관리자전용)</el-menu-item>
        <div v-if="logged === true">{{uid}}, {{uname}}님 로그인</div>
      </el-menu>
    </el-header>
        <el-container>
        <el-aside width="200px">
          <h3 style="margin-left:20px">세부메뉴</h3>
          <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="vertical"
    @select="handleSelect"
  >
    <el-sub-menu index="2">
      <template #title>세부메뉴1</template>
      <el-menu-item index="2-1">item1</el-menu-item>
      <el-menu-item index="2-2">item2</el-menu-item>
      <el-menu-item index="2-3">item3</el-menu-item>
    </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>세부메뉴2</template>
        <el-menu-item index="3-1">item1</el-menu-item>
        <el-menu-item index="3-2">item2</el-menu-item>
        <el-menu-item index="3-3">item3</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>세부메뉴3</template>
      <el-menu-item index="4-1" disabled>item1</el-menu-item>
      <el-menu-item index="4-2" disabled>item2</el-menu-item>
      <el-menu-item index="4-3" disabled>item3</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>세부메뉴4</template>
    <el-menu-item index="5-1">item1</el-menu-item>
    <el-menu-item index="5-2">item2</el-menu-item>
    <el-menu-item index="5-3">item3</el-menu-item>
    </el-sub-menu>
  </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    
    <div v-if="logged === true">{{uid}}, {{uname}}님 로그인</div>
    <!-- {{menu}}, {{logged}} -->

    
  </div>
</template>

<script>
import {useStore} from 'vuex';
import {computed, reactive, onMounted } from 'vue';
export default {
  setup () {
    //state변수 생성
    

    const store = useStore();

    //store값 가져오기
    // 마지막으로 방문한 페이지를 session저장소에 보관후에 반환
    // 메뉴
    const menu = computed(() => {
      return store.getters.getMenu
    });

    // store 의 logged값 실시간으로 확인
    // 로그인상태(로그인 T, 로그아웃 F)
    const logged = computed(() => {
      return store.getters.getLogged
    });

    // 아이디 정보(로그인 정보추가, 로그아웃 정보제거)
    const uid = computed(() => {
      return store.getters.getUid
    });
    // 아이디 정보(로그인 정보추가, 로그아웃 정보제거)
    const uname = computed(() => {
      return store.getters.getUname
    });
    // 아이디 정보(로그인 정보추가, 로그아웃 정보제거)
    // SELLER, CUSTOMER
    const urole = computed(() => {
      return store.getters.getUrole
    });
    // store에서 읽은 메뉴값으로 초기값으로 세팅
    const state = reactive({
      activeIndex : menu
    });

    onMounted( async () =>{ // f5 새로고침
      // 저장소에 있는 TOKEN값을 읽어서 존재 유무
      //TOKEN을 추가하는 시점 로그인이 완료되었을때
      //TOKEN의 값을 제거하는 시점 로그아웃 되었을때
      if(sessionStorage.getItem("TOKEN")===null){
        //store의 logged변수값을 false
        store.commit("setLogged", false);
      }
      else{
        // mutations을 호출하는 경우
        store.commit("setLogged", true);
        // actions를 호출할 경우
        store.dispatch("handleData", {});
      }
    });

    // 메뉴를 클릭했을 때
    //store값 변경하기
    const handleSelect = (idx) => {
      //console.log(idx);
      store.commit("setMenu", idx);
    }
    /*
    // store의 state 변수가 변경되는 시점을 바로 알수 있음.
    store.subscribe((mutation, state) =>{
      console.log('store.subscribe', mutation, state);
    })
    */

    return {menu, logged, handleSelect, state, uid, uname, urole}
  }
}
</script>

<style lang="scss" scoped>

</style>