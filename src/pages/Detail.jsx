import Header from "../components/header/Header";
import PostDetail from "../components/postdetail/PostDetail";
import { useParams } from "react-router-dom";
import Comment from "../components/postdetail/Comment";

function Detail() {
  const { id } = useParams();

  return (
    <>
      <PostDetail id={id} />
      <Comment id={id} />
    </>
  );
}

export default Detail;
