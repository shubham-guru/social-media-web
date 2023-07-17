import {
  Link,
} from "@mui/material";
import React, { useState } from "react";
import styles from "../css/Home";
import AuthChip from "./AuthChip";
import Alert from "./Alert";
import firebase from '../../Auth/Firebase';
import { useNavigate } from "react-router-dom";
import pageRoutes from "../../routes/pageRoutes";
import { Card, Space, Button, Form, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SignInCard = () => {
    const [isRes, setIsRes] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
  
    const handleSubmit = () => {
          setIsRes(true);
          firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential: { user: any; }) => {
            const user = userCredential.user;
            Alert.fire({
              icon: "success",
              title: "Logged in successfully",
            });
            localStorage.setItem('userData', user?.email)
            navigate(pageRoutes.HOME);
          })
          .catch((error: { message: any; }) => {
            const errorMessage = error.message;
            setIsRes(false);
            Alert.fire({
              icon: "error",
              title: errorMessage,
            });
          });
    };

    const handleForgetPass = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            Alert.fire({
                icon: "success",
                title: "Password reset email sent",
              });
        })
        .catch((error) => {
            Alert.fire({
                icon: "error",
                title: error,
                });
          // Handle password reset errors
          console.error('Password reset error:', error);
        });
    }

  return (
    <Card>
    <AuthChip title="Sign in" />

    <Space style={{ marginTop: "2rem", width: '100%'}}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="Email"
            rules={[
            { required: true, message: "Please input your Email!" }, 
            {type: "email", message: 'Please enter valid email'}
          
          ]}
          >
            <Input placeholder="Email Address" style={{width: '300px'}} onChange={(e: any) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              style={{width: '300px'}}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              style={styles.btnStyle}
              htmlType="submit"
              icon={isRes ? <LoadingOutlined /> : null}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Space>

      <Space style={{margin: 1}}>
        <Link sx={{cursor: 'pointer', fontSize: 12, textAlign: 'right', width: '100%'}} onClick={handleForgetPass}>Forget Password ?</Link>
      </Space>

  </Card>
  )
}

export default SignInCard