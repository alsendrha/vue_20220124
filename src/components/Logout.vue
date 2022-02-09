<template>
    <div>

    </div>
</template>

<script>
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import { onMounted, nextTick } from 'vue';
export default {
    setup () {
        const store = useStore();
        const router = useRouter();

        onMounted(async() => {
            nextTick( () => {
                sessionStorage.removeItem("TOKEN");
                alert('로그아웃되었습니다');

                // 주소창만 바뀜
                router.push({name:'Home'});

                // App.vue에 메뉴의 선택항목을 변경하도록 알려줌
                store.commit("setMenu", "/");

                // 로그인상태
                store.commit("setLogged", false);
            })
        })
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>