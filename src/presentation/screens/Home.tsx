import React, { Suspense, useEffect, useState } from "react";
import { Tag, Button, Card, TabsProps, Tabs } from "antd";
import firebase from "../../Auth/Firebase";
import Alert from "../components/Alert";
import pageRoutes from "../../routes/pageRoutes";
import LogoutIcon from "@mui/icons-material/Logout";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../domain/apiActions";
import { Endpoints } from "../../endpoints";

const Home = () => {
  const UserData = React.lazy(()=> import('../components/UserData'));
  const EmployeeData = React.lazy(()=> import('../components/EmployeeData'));
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState<string>("");
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
    <Card>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Tag style={{ cursor: "pointer", padding: 10, letterSpacing: 1 }} color="green">Namaste ! {userEmail}</Tag>
        <Button
          icon={<LogoutIcon fontSize="small" color="warning"/>}
          onClick={handleLogout}
          style={{borderColor: 'orange', color: 'orange', display: 'flex'}}
        >
          Logout
        </Button>
      </div>

      <div style={{marginTop: 20}}>
        <Tabs size='large' tabPosition={'top'} centered animated defaultActiveKey="1" items={items} onChange={(e) => handleChange(e)} />
    </div>    
    </Card>
  );
};

export default Home;
