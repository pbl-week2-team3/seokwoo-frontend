import React from "react";
import _ from "lodash";
import {Spinner} from "../elements";
import { useRecoilValue } from "recoil";
import { postState } from "../recoil/post";


const InfinityScroll = (props) => {

    const {children, callNext, is_next, loading, post_list} = props;
    const {scrollHeight} = document.body;

    
    const _handleScroll = _.throttle(() => {

        if(loading){
            return;
        }

        const {innerHeight} = window;

        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        
        //전체의 높이(스크롤 전체) - (스크롤 위치 높이 + 화면 높이)
        if(scrollHeight - innerHeight - scrollTop < 200) {
            const lastId=post_list[post_list.length-1].id;
            console.log("before CallNext : ", lastId);
            callNext(lastId);
        }
    }, 300);

    const handleScroll = React.useCallback(_handleScroll, [loading]);

    React.useEffect(() => {
        
        // if(loading){
        //     return;
        // }

        if(!is_next){
            window.addEventListener("scroll", handleScroll);
        }else{
            window.removeEventListener("scroll", handleScroll);
        }
        

        return () => window.removeEventListener("scroll", handleScroll);
    }, [is_next, loading]);

    return (
        <React.Fragment>
            {props.children}
            {!is_next && (<Spinner/>)}
        </React.Fragment>
    )
}

InfinityScroll.defaultProps = {
    children: null,
    callNext: () => {},
    is_next: false,
    loading: false,
}

export default InfinityScroll;