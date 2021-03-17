import { useHistory } from "react-router";
import backIcon from "../assets/backIcon.png";
import styles from "../pages/css/addOrder.module.scss";

const Header = ({ title }) => {
  const history = useHistory();

  return (
    <div className={styles.header}>
      <button className={styles.backButton} onClick={() => history.goBack()}>
        <img src={backIcon} className={styles.backIcon} alt="back_icon" />
      </button>
      <h1 className={styles.label}>{title}</h1>
    </div>
  );
};

export default Header;
