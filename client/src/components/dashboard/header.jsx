import logo from "../../img/logo.png";

const header = ({ toggleMenu }) => {
  return (
    <div className="header">
      <div className="logosec">
        <img src={logo} className="logo" />
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
          className="icn menuicn"
          id="menuicn"
          onClick={toggleMenu}
        />
      </div>

      <div className="searchbar">
        <input type="text" placeholder="Search" />
        <div className="searchbtn">
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
            className="icn srchicn"
            alt="search-icon"
          />
        </div>
      </div>

      <div className="message">
        <div className="circle"></div>
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
          className="icn"
          alt=""
        />

        <div className="dp">
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
            className="dpicn"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default header;
