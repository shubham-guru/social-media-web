import { Typography, Col, Row, Button } from "antd";
import React, { useState } from "react";
import mainImg from "../assest/images/main.png";
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
          <Typography className="heading">
            Make connections with your loved ones
          </Typography>
          {uid ? (
            <SignInCard />
          ) : (
            <SignUpCard userData={handleData} />
          )}

         { !uid && 
         <>
         <Typography className="footerTxt">Already have an account?</Typography>
         <Button onClick={()=>setUid('1')} type='link'> <Typography className="footerTxt2">Sign in</Typography> </Button>
          </>}
        </Col>
      </Row>
    </div>
  );
};

export default Auth;
