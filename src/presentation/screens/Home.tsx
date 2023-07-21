import React, { Suspense, useEffect, useState } from "react";
import {  Button, Card, TabsProps, Tabs, Tooltip } from "antd";
import firebase from "../../Auth/Firebase";
import Alert from "../components/Alert";
import pageRoutes from "../../routes/pageRoutes";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../domain/apiActions";
import { Endpoints } from "../../endpoints";
import '../css/Home.css'
import Protected from "../components/Protected";
import { LogoutOutlined } from "@mui/icons-material";

const Home = () => {
  const UserData = React.lazy(()=> import('../components/UserData'));
  const EmployeeData = React.lazy(()=> import('../components/EmployeeData'));
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [endpoint, setEndPoint] = useState<string>(Endpoints.GET_USERS);
  const [page, setPage] = useState<number>(1);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Alert.fire({
          icon: "success",
          title: "Logged out successfully",
        });
        localStorage.removeItem("userData");
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

  const dispatchData: any = useDispatch();
  const data = useSelector((state: any) => state.data)

  useEffect(() => {
    dispatchData(fetchData(endpoint, page));
  }, [dispatchData, page, endpoint]);

  useEffect(() => {
    const email: any = localStorage.getItem("userData");
    setUserEmail(email);

    // Checking User isLoggedIn or not
    if(localStorage.getItem("userData")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  }, []);


  const handleChange = (e: string) => {
    if(e === '1'){
      setEndPoint(Endpoints.GET_USERS)
    } else if(e === '2'){ 
      setEndPoint(Endpoints.GET_EMPLOYEES)
    }
  }

  const handlePageChange = (e: number) => {
    setPage(e);
    window.scrollTo(0,0)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `User Data`,
      children: 
      <Suspense fallback={ <Loading />}>
        <UserData userDetails={data} getPageNo={handlePageChange} />
      </Suspense>
    },
    {
      key: '2',
      label: `Employee Data`,
      children: 
      <Suspense fallback={ <Loading />}>
        <EmployeeData employeeData={data} getPageNo={handlePageChange} />
    </Suspense>
    },
  ];

  return (
    <Protected isLoggedIn={isLoggedIn}>
      <Card className="main-card">
        <div className="home-div">
          <Tooltip title="User Email">
          <div className="user-mail">Namaste, {userEmail} !
            <span></span>
          </div>
          </Tooltip>
          <Tooltip title='Logout' className="logoutBtn">
            <LogoutOutlined onClick={handleLogout} />
          </Tooltip>
        </div>

        <div style={{marginTop: 20}}>
          <Tabs size='large' tabPosition={'top'} centered animated defaultActiveKey="1" items={items} onChange={(e) => handleChange(e)} />
      </div>    
      </Card>
    </Protected>
  );
};

export default Home;
