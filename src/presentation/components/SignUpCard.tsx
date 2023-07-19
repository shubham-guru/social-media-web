import React, { useState } from "react";
import styles from "../css/Home";
import AuthChip from "./AuthChip";
import Alert from "./Alert";
import firebase from "../../Auth/Firebase";
import { Card, Button, Form, Input, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type myProps = {
  userData: (data: any) => void;
};
const SignUpCard: React.FC<myProps> = ({ userData }) => {
  const [isRes, setIsRes] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    setIsRes(true);
    if (password.length < 6) {
      Alert.fire({
        icon: "error",
        title: "Password must be more than 6 characters",
      });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential: { user: any }) => {
          const user = userCredential.user;
          userData(user);
          setIsRes(false);
          Alert.fire({
            icon: "success",
            title: "Account has been successfully created",
          });
        })
        .catch((error: { message: any }) => {
          const errorMessage = error.message;
          Alert.fire({
            icon: "error",
            title: errorMessage,
          });
        });
    }
  };

  return (
    <Card style={{boxShadow: '1px 1px 5px #ddd', width: ''}}>
      <AuthChip title="Sign up" />

      <div style={{ marginTop: "2rem", width: '100%'}}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
         >
          <Form.Item
            name="Email"
            rules={[
              { required: true, message: "Please input your Email!" }, 
              { type: "email", message: 'Please enter valid email'}
            ]}
          >
            <Input placeholder="Email Address" style={{width: '300px'}} onChange={(e: any) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }, { pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, message: <Typography style={{fontSize: 12, color: 'red', textTransform: 'lowercase'}}>
              A password should contain <b> a SPECIAL CHARACTER and A NUMBER</b>
            </Typography>}]}
          >
            <Input.Password
              placeholder="Password"
              style={{width: '300px'}}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={styles.btnStyle}
              htmlType="submit"
              icon={isRes ? <LoadingOutlined /> : null}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default SignUpCard;
