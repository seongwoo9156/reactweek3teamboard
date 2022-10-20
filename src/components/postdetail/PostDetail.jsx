import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { API_URL } from "../../shared/Request";
import { __getPost, __addHits } from "../../redux/modules/postsSlice";

import "./style.css";
import NewButton from "../newbutton/NewButton";

import { Box, Modal } from "@material-ui/core";

function PostDetail({ id }) {

    const navigation = useNavigate();
    const dispatch = useDispatch();
    
    const deletePwRef = useRef();
    const modifyPwRef = useRef();

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openModifyModal, setOpenModifyModal] = useState(false);

    const temp = useSelector((state) => state.posts.post);
    const isLoading = useSelector((state) => state.posts.isLoading);

    useEffect(() => {
      dispatch(__getPost(id))
      return () => {
          dispatch(__getPost());
      }
    }, []);
    
    useEffect(() => {
      axios.patch(`${API_URL}/posts/${id}`, { hits: temp.hits + 1 }, [temp])
    }, [temp])

    if(isLoading) {
      return <h1>Loading...</h1>
    }

    if(!isLoading && !temp){
      return <h1>Error...! 새로고침해주세요!</h1>
    }

    // Modal Style --
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

    // Delete Modal 및 onClick Event 함수 ---
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const onClickDelete = () => {
      if (deletePwRef.current.value !== temp.password) {
          alert("비밀번호를 다시 확인해주세요.");
          return;
      }
      try {
          axios.delete(`${API_URL}/posts/${id}`);
      } catch (error) {
          console.log(`Detail : onClickDelete에서 오류 ${error}`);
      } finally {
          navigation("/");
      }
    };

    // Modify Modal 및 onClick Event 함수 ---
    const handleOpenModifyModal = () => setOpenModifyModal(true);
    const handleCloseModifyModal = () => setOpenModifyModal(false);

    const onClickModify = (event) => {
      if (modifyPwRef.current.value !== temp.password) {
          alert("비밀번호를 다시 확인해주세요.");
          return;
      }
      navigation(`/modify/${id}`);
    };

  return (
    <>
      <div className="Container2">
        <div className="BoardInner">
          <div className="BoardTitle">
            <h5>{temp.category}</h5>
            <h2>{temp.title}</h2>
            <h4>{temp.author}</h4>
          </div>
          <div className="BoardDesc">
            <p>{temp.content}</p>
          </div>
          <div className="PostDetailBtnWrap">
            <NewButton
              color="inherit"
              variant="outlined"
              type="button"
              value="수정하기"
              onClick={handleOpenModifyModal}
            />
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

            <NewButton
              color="secondary"
              variant="outlined"
              type="button"
              value="삭제하기"
              onClick={handleOpenDeleteModal}
            />
            <Modal
              open={openDeleteModal}
              onClose={handleCloseDeleteModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                비밀번호 : <input type="password" ref={deletePwRef} />{" "}
                <NewButton type="button" value="확인" onClick={onClickDelete} />
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetail;
