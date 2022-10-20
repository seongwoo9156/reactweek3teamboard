import { useState, useEffect } from "react"
import { throttle } from "lodash";

const THROTTLE_WAIT = 300;

export default function useInfiniteScroll(fetchCallback){
    const [isFetching, setIsFetching] = useState(false);

    // window.innerHeight : 뷰포트 높이를 px단위로 나타낸다.
    // document.documentElement.scrollTop : 스크롤의 위치를 px단위로 나타낸다. 가장 위는 0 아래로 내려갈수록 ++
    // document.documentElement.offsetHeight : border를 포함한 박스의 길이
    const handleScrollThrottle = throttle(() => {
        if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight){
            setIsFetching(true);
        }
    }, THROTTLE_WAIT);

    useEffect(() => {
        window.addEventListener('scroll', handleScrollThrottle);
        return () => {
            window.removeEventListener('scroll', handleScrollThrottle);
        }
    }, []);
    
    useEffect(() => {
        if(!isFetching) return;
        fetchCallback();
    }, [isFetching])

    return [isFetching, setIsFetching]
}




