import { PostSummaryBox } from "./style";
import { useNavigate } from "react-router-dom";
import "./style.css";
import NewButton from "../newbutton/NewButton";

function PostSummary({ post }) {
  const navigator = useNavigate();
  console.log(post);
  return (
    <>

      <div className="Container">
        <div className="WriteBtn">

          <NewButton
            size="large"
            variant="outlined"
            value="글쓰기"
            onClick={() => {
              navigator("/write");
            }}
          ></NewButton>
        </div>
        <div className="BoardTable">
          <table>
            <colgroup>
              <col style={{ width: "100px" }} />
              <col style={{ width: "800px" }} />
              <col style={{ width: "110px" }} />
              <col style={{ width: "90px" }} />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>이름</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {post.map((element, index) => (
                <Postlistitem
                  key={element.id}
                  element={element}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PostSummary;

const Postlistitem = ({ element, index }) => {
  const navigator = useNavigate();
  const onClickHandler = () => {
    navigator(`/detail/${element.id}`);
  };
  return (
    <tr key={element.id}>
      <td>{index + 1}</td>
      <td className="BoardDescTitle" onClick={onClickHandler}>
        {element.title}
      </td>

      <td>{element.author}</td>
      <td>{element.hits}</td>

    </tr>
  );
};
