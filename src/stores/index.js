// npm i vuex@next --save
import { createStore } from "vuex";
import axios from "axios";

// 모든 컴포넌트에서 공통으로 사용할 변수설정
// props와 emit를 여기서 처리함.
const stores = createStore({

    // 공통 상태 변수
    state : {
        menu   : sessionStorage.getItem("CURL"), // 선택되는 메뉴
        logged : false,      // 로그인 상태
        uid    : '',         // 로그인한 사용자의 이메일정보
        uname  : '',         // 로그인한 사용자의 이름
        token  : '',         // 토큰을 저장소에 보관하지 않고 사용   
        urole   : '',         // 로그인한 사용자의 권한을 저장  
    },

    // 가져가기 (getter)
    getters : {
        getUrole(state){
            return state.urole;
        },
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
        },
        
    },

    // 변경하기 (mutation) : 즉시 변경
    mutations : {
        setUrole(state, value){
            state.urole = value;
        },
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
        },
        
    },

    // 변경하기(action) : 기다려야 되는 상황,
    // 벡엔드 연동이 필요할 경우
    actions : {
        async handleData(context, payload){
            console.log(payload);
            const token = sessionStorage.getItem("TOKEN");
            if(typeof token !== 'undefined' && token !== null){
                const url = `/member/validation`;
                const headers = {"Content-type":"application/json","token":token};
                const response = await axios.get(url, {headers:headers});
                if(response.data.status===200){
                    // mutations의 setUid, setUname을 호출해서 내용변경
                    context.commit("setUid", response.data.uid);
                    context.commit("setUname", response.data.uname);
                    context.commit("setUrole", response.data.urole);
                    context.commit("setLogged", true);
                }
                else{
                    // 토큰의 유효성을 검사하여 통과하지 못할경우 
                    context.commit("setLogged", false);
                }
            }
        }
    }



});


export default stores;