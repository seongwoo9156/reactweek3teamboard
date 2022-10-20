import Style from "./Style.module.css"

function Header() {

  return (
      <div className={Style.headerSection}>
        <div className={Style.titleWrap}>
          <h1>자유게시판</h1>
          <h3>React 3주차 팀과제 : B반 4조 </h3>
        </div>
      </div>
  );
}

export default Header;

