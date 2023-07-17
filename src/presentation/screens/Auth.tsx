import { Link } from "@mui/material";
import { Space, Typography, Col, Row } from "antd";
import React, { useState } from "react";
import mainImg from "../assest/images/main.jpg";
import SignUpCard from "../components/SignUpCard";
import SignInCard from "../components/SignInCard";

const Auth = () => {
  const [uid, setUid] = useState<string>("");

  const handleData = (data: any) => {
    setUid(data?.uid);
  };
  return (
    <Space style={{ flexGrow: 1 }}>
      <Row>
        <Col span={15}>
          <img src={mainImg} alt="main" width={"100%"} />
        </Col>

        <Col span={8} style={{margin: 10}}>
          <Typography
            style={{fontFamily: 'Raleway, sans-serif', color: '#888', fontSize: 30, marginTop: 20}}
          >
            Make connections with your loved ones
          </Typography>
          {uid ? (
            <SignInCard />
          ) : (
            <SignUpCard userData={handleData} />
          )}

         { !uid && 
         <>
         <Typography style={{fontSize: 13, letterSpacing: 1}}>Already have an account?</Typography>
          <Link sx={{cursor: 'pointer'}} fontSize={13} onClick={()=>setUid('1')}>Sign in</Link>
          </>}
        </Col>
      </Row>
    </Space>
  );
};

export default Auth;
