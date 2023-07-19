import { Link } from "@mui/material";
import { Typography, Col, Row } from "antd";
import React, { useState } from "react";
import mainImg from "../assest/images/main.jpg";
import SignUpCard from "../components/SignUpCard";
import SignInCard from "../components/SignInCard";
import '../css/Auth.css'

const Auth = () => {
  const [uid, setUid] = useState<string>("");

  const handleData = (data: any) => {
    setUid(data?.uid);
  };
  return (
    <div className="main">
      <Row>
        {/* Image */}
        <Col span={14} className="imageCol">
          <img src={mainImg} alt="main" width={"100%"} />
        </Col>

        <Col className="col-container" xs={24} lg={10} style={{margin: 0}}>
          <Typography
            style={{fontFamily: 'Raleway, sans-serif', color: '#888', fontSize: 24, marginTop: 20, marginBottom:30}}
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
    </div>
  );
};

export default Auth;
