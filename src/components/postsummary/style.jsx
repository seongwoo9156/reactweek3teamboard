import styled from "styled-components";

export const PostSummaryBox = styled.div`
  width: 100%;
  height: 30px;

  vertical-align: middle;
  line-height: 30px;

  display: flex;

  .spanTitle {
    width: 70%;
    margin-left: 10px;
  }

  .spanAuthor {
    width: 30%;
    margin-right: 10px;
    text-align: right;
  }
`;
