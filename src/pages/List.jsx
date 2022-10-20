import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getPosts, __accruePostsByPage } from "../redux/modules/postsSlice";

import PostSummary from "../components/postsummary/PostSummary";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Header from "../components/header/Header";

function List() {

    const FIRST_POST_LIMIT = 15;
    const ADD_POST_LIMIT = 5;

    const dispatch = useDispatch();

    const [isFetching, setIsFetching] = useInfiniteScroll(updateFunctionOnScroll);
    const [pageNumber, setPageNumber] = useState(1);

    const posts = useSelector((state) => state.posts.posts);
    const isLoading = useSelector((state) => state.posts.isLoading);

    useEffect(() => {
        dispatch(__getPosts({ page: pageNumber, limit: FIRST_POST_LIMIT }));
        setPageNumber(pageNumber + (FIRST_POST_LIMIT/ADD_POST_LIMIT))
        updateFunctionOnScroll();
    }, []);

    if(isLoading) {

        return  <>
                    <h1>Loading...</h1>
                </>
    }

    if(!isLoading && !posts){

        return  <>
                    <h1>Error! 새로고침 해주세요.</h1>
                </>
    }
     
    function updateFunctionOnScroll() {
        try {
            if (isFetching) {
                dispatch(
                    __accruePostsByPage({ page: pageNumber, limit: ADD_POST_LIMIT })
                );
                setPageNumber(pageNumber + 1);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsFetching(false);
        }
    }

    return (
        <>
        <PostSummary post={posts} />
        </>
    );
}

export default List;
