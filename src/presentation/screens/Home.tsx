import React, { useEffect, useState } from "react";
import firebase from "../../Auth/Firebase";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import pageRoutes from "../../routes/pageRoutes";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tag, Button, Card } from "antd";
import UserData from "../components/UserData";

const Home = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Alert.fire({
          icon: "success",
          title: "Logged out successfully",
        });
        navigate(pageRoutes.AUTH);
      })
      .catch((error) => {
        Alert.fire({
          icon: "error",
          title: "Something went wrong",
        });
        console.error("Sign out error:", error);
      });
  };
  useEffect(() => {
    const email: any = localStorage.getItem("userData");
    setUserEmail(email);
  }, []);

  return (
    <Card>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Tag style={{ cursor: "pointer", padding: 10, letterSpacing: 1 }} color="orange">Namaste ! {userEmail}</Tag>
        <Button
          icon={<LogoutIcon fontSize="small" color="warning"/>}
          onClick={handleLogout}
          style={{borderColor: 'orange', color: 'orange', display: 'flex'}}
        >
          Logout
        </Button>
      </div>

        <UserData /> 
    </Card>
  );
};

export default Home;
