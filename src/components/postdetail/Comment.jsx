import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getComments } from "../../redux/modules/commentSlice";
import { useState } from "react";
import axios from "axios";
import "./style.css";
import NewButton from "../newbutton/NewButton";
import { Box, Modal } from "@material-ui/core";
import { API_URL } from "../../shared/Request";


const Comment = ({ id }) => {
  const dispatch = useDispatch();

  const cmt = useSelector((state) => state.comments.comment);
  const loadingtest = useSelector((state) => state.comments.isLoading);

  useEffect(() => {
    dispatch(__getComments(id));
  }, []);

  if (loadingtest) {
    return (
      <div className="LoadingSpinnerWrap">
        <div className="CommentLoading">
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  if (!loadingtest && cmt == undefined) {
    return (
      <div className="CmtError">통신 오류로 데이터를 불러오지 못했습니다.</div>
    );
  }

  return (
    <>
      <div className="CommentContainer">
        <strong className="CmtLength">현재 댓글 {cmt.length} 개</strong>
        {!loadingtest &&
          cmt.map((element) => (
            <CommentItem key={element.id} element={element} id={id} />
          ))}
        <CommentForm id={id} />
      </div>
    </>
  );
};

export default Comment;

const CommentItem = ({ element, id }) => {
  const [View, setView] = useState(true);
  const [commentdesc, setcommentdesc] = useState("");

  useEffect(() => {
    setcommentdesc(element.content);
  }, [View]);

  const dispatch = useDispatch();

  //댓글 삭제하기 버튼

  const DelComment = () => {
    if (element.password === deletePwRef.current.value) {
      axios
        .delete(`${API_URL}/comments/${element.id}`)

        .then((response) => {
          dispatch(__getComments(id));
        })
        .chath((err) => {});

    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  //댓글 수정하기 버튼
  const onClickModify = () => {

    if (element.password == modifyPwRef.current.value) {

      return setView(false), setOpenModifyModal(false);
    } else {
      alert("비밀번호가 달라요.");
    }
  };

  //댓글 수정하기들어와서 저장하기 버튼
  const ModifySaveComment = () => {
    if (commentdesc == "") {
      alert("빈칸은 안돼용");
    } else {
      axios

        .patch(`${API_URL}/comments/${element.id}`, {

          content: commentdesc,
        })
        .then((response) => {
          setView(true);
          dispatch(__getComments(id));
        })

        .catch((err) => {});

    }
  };

  const CancelComment = () => {
    setView(true);
  };

  const ChangeHandler = (e) => {
    setcommentdesc(e.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [openModifyModal, setOpenModifyModal] = useState(false);
  const handleOpenModifyModal = () => setOpenModifyModal(true);
  const handleCloseModifyModal = () => setOpenModifyModal(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const modifyPwRef = useRef();
  const deletePwRef = useRef();

  return (
    <div className="CmtBox">
      <p className="CmtName">{element.author}</p>
      {View ? (
        <p className="CmtDesc">{element.content}</p>
      ) : (
        <input
          type="text"
          className="CmtDescinput"
          value={commentdesc}
          onChange={ChangeHandler}
        />
      )}
      <div className="CmtBtnWrap">
        {View ? (
          <NewButton
            variant="outlined"
            size="small"
            value="수정"
            onClick={handleOpenModifyModal}
          >
            수정
          </NewButton>
        ) : (
          <NewButton
            variant="outlined"
            value="저장"
            onClick={ModifySaveComment}
          >
            저장
          </NewButton>
        )}
        <Modal
          open={openModifyModal}
          onClose={handleCloseModifyModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            비밀번호 : <input type="password" ref={modifyPwRef} />{" "}
            <NewButton type="button" value="확인" onClick={onClickModify} />
          </Box>
        </Modal>
        {View ? (
          <NewButton
            color="secondary"
            variant="outlined"
            value="삭제"
            onClick={handleOpenDeleteModal}
          >
            삭제
          </NewButton>
        ) : (
          <NewButton variant="outlined" value="취소" onClick={CancelComment}>
            취소
          </NewButton>
        )}
        <Modal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            비밀번호 : <input type="password" ref={deletePwRef} />{" "}

            <NewButton type="button" value="확인" onClick={DelComment} />

          </Box>
        </Modal>
      </div>
    </div>
  );
};

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const commentform = {
    userid: "",
    userpw: "",
    desc: "",
    value: "",
  };

  const [comment, setCmt] = useState(commentform);
  const onCmtChangeHandler = (e) => {
    const { name, value } = e.target;
    setCmt({ ...comment, [name]: value });
  };

  //댓글 추가하기 요청
  const addComment = (e) => {
    e.preventDefault();

    if (comment.userid == "" || comment.userpw == "" || comment.desc == "") {
      alert("빈칸을 확인해주세요.");
    } else {
      axios

        .post(`${API_URL}/comments/`, {

          post: id,
          id: Date.now() + "",
          author: comment.userid,
          password: comment.userpw,
          content: comment.desc,
        })
        .then((response) => {
          setCmt(commentform);
          dispatch(__getComments(id));
        });
    }
  };

  return (
    <>
      <form className="CmtForm">
        <div className="CmtWriteBox">
          <div className="CmtUser">
            <input
              type="text"
              className="CmtId"
              placeholder="이름"
              name="userid"
              value={comment.userid}
              onChange={onCmtChangeHandler}
            />
            <input
              type="password"
              className="CmtPw"
              placeholder="비밀번호"
              name="userpw"
              value={comment.userpw}
              onChange={onCmtChangeHandler}
            />
          </div>
          <div className="CmtWrite">
            <textarea
              className="CmtDesc"
              name="desc"
              placeholder="댓글을 작성해주세요."
              value={comment.desc}
              onChange={onCmtChangeHandler}
            />
          </div>
        </div>
        <div className="CmtAddBtn">
          <NewButton
            size="large"
            variant="outlined"
            onClick={addComment}
            value="댓글등록"
          >
            댓글등록
          </NewButton>
        </div>
      </form>
    </>
  );
};
