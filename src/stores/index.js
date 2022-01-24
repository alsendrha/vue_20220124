// npm i vuex@next --save
import { createStore } from "vuex";

// 모든 컴포넌트에서 공통으로 사용할 변수설정
// props와 emit를 여기서 처리함.
const stores = createStore({

    // 공통 상태 변수
    state : {
        menu   : sessionStorage.getItem("CURL"),
        logged : false,
    },

    // 가져가기 (getter)
    getters : {
        getMenu(state){
            return state.menu;
        },
        getLogged(state){
            return state.logged;
        }
    },

    // 변경하기 (mutation) : 즉시 변경
    mutations : {
        setMenu(state, value){
            state.menu = value;
        },
        setlogged(state,value){
            state.logged = value;
        }
    },

    // 변경하기(action) : 기다려야 되는 상황
    action : {


    }



});


export default stores;