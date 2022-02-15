// npm i vuex@next --save
import { createStore } from "vuex";

// 모든 컴포넌트에서 공통으로 사용할 변수설정
// props와 emit를 여기서 처리함.
const stores = createStore({

    // 공통 상태 변수
    state : {
        menu   : sessionStorage.getItem("CURL"), // 선택되는 메뉴
        logged : false,     // 로그인 상태
        uid    : '', // 로그인한 사용자의 이메일정보
        uname  : '', // 로그인한 사용자의 이름
        token  : '', // 토큰을 저장소에 보관하지 않고 사용     
    },

    // 가져가기 (getter)
    getters : {
        getUid(state){
            return state.uid;
        },
        getUname(state){
            return state.uname;
        },
        getMenu(state){
            return state.menu;
        },
        getLogged(state){
            return state.logged;
        }
    },

    // 변경하기 (mutation) : 즉시 변경
    mutations : {
        setUid(state, value){
            state.uid = value;
        },
        setUname(state, value){
            state.uname = value;
        },
        setMenu(state, value){
            state.menu = value;
        },
        setLogged(state,value){
            state.logged = value;
        }
    },

    // 변경하기(action) : 기다려야 되는 상황
    action : {
        
    }



});


export default stores;