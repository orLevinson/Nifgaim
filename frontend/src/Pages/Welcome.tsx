import { color } from "@mui/system";
import React, { useContext } from "react";
import UserCtx from "../Shared/Context/UserCtx";
import styles from "../Components/Welcome/welcomeStyles.module.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const { isAdmin, canEdit } = useContext(UserCtx);
  const navigate = useNavigate();
  return (
    <div
      style={{ width: "90%", margin: "auto", marginTop: 30, marginBottom: 30 }}
    >
      <div
        style={{
          marginTop: 20,
          padding: 20,
          width: "90%",
          margin: "auto",
          backgroundColor: "#eeeeee",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <h1>ברוכים הבאים למערכת ניהול נפגעים</h1>
        <h3>
          מערכת זו נועדה לרכז את כלל הנפגעים של חיל הלוגיסטיקה בצורה שיתופית
          ומבוקרת.
        </h3>
        <h4 style={{marginTop:50}}>
          ניתן להיכנס לעמוד הרצוי על ידי הסרגל בצד ימין או דרך הכרטיסיות הבאות:
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 30,
          }}
        >
          {(canEdit || isAdmin) && (
            <div
              className={styles.cardStyle}
              onClick={() => {
                navigate("/edit");
              }}
            >
              <h3>עריכת טבלה</h3>
            </div>
          )}
          {isAdmin && (
            <>
              <div
                className={styles.cardStyle}
                onClick={() => {
                  navigate("/editAttributes");
                }}
              >
                <h3>עריכת עמודות</h3>
              </div>
              <div
                className={styles.cardStyle}
                onClick={() => {
                  navigate("/editUsers");
                }}
              >
                <h3>עריכת משתמשים</h3>
              </div>
              <div
                className={styles.cardStyle}
                onClick={() => {
                  navigate("/editPerms");
                }}
              >
                <h3>עריכת הרשאות</h3>
              </div>
            </>
          )}
        </div>
        <p style={{ marginTop: 50 }}>
          נבנה על ידי בית התוכנה של חיל הלוגיסטיקה {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Welcome;
