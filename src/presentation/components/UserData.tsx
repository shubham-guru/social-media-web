import { Card, Col, Pagination, Row, Typography, Image } from "antd";
import moment from "moment";
import Loading from "./Loading";
import styles from "../css/Home";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";

type myProps = {
  userDetails: Array<{}>;
  getPageNo: (e: number) => void;
};
const UserData: React.FC<myProps> = ({ userDetails, getPageNo }) => {
  const [fillIcon, setFillIcon] = useState<boolean>(false);

  const handlePageChange = (e: number) => {
    getPageNo(e);
    window.scrollTo(0, 0);
  };

  const handleIconClick = (index: number, id: number) => {
    console.log(index == id)
    if(id == index+1){
      setFillIcon(!fillIcon)
    }
  }
  return (
    <Row>
      <Col span={24}>
        {userDetails?.map((item: any, index: number) => {
          return (
            <Card
              key={index}
              style={{
                margin: 20,
                backgroundColor: "#f2f2f2",
                width: "90%",
                boxShadow: `1px 1px 5px ${item.color}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    width={"30px"}
                    style={{ borderRadius: 50 }}
                    src={item.avatar}
                    alt="profile_pic"
                    preview={false}
                  />
                  <div>
                    <Typography style={styles.textStyle}>
                      {item.name}
                    </Typography>

                    <Typography style={styles.idStyle}>
                      User id :#{item.id}
                    </Typography>
                  </div>
                </div>
                <Typography style={styles.textStyle}>
                  {moment(item.createdAt)?.utc().format("YYYY-MM-DD")}
                </Typography>
              </div>

              {item.post ? (
                <Image
                  width={"100%"}
                  style={{ borderRadius: 15, marginTop: 10 }}
                  src={item.post}
                  alt="user_post"
                />
              ) : (
                <Loading />
              )}

              <Typography
                style={{
                  fontFamily: "Raleway, sans-serif",
                  letterSpacing: 0.5,
                  color: "#333",
                  marginTop: 10,
                  textAlign: "justify",
                  fontSize: 11,
                }}
              >
                {item.comments}
              </Typography>

              <div style={{ margin: 10 }}>
                {!fillIcon ? (
                  <HeartOutlined
                    style={{ color: "#f23737", fontSize: 20 }}
                    onClick={() => handleIconClick(index, item.id)}
                  />
                ) : (
                  <HeartFilled
                    style={{ color: "#f23737", fontSize: 20 }}
                    onClick={() => handleIconClick(index, item.id)}
                  />
                )}
              </div>
            </Card>
          );
        })}
        <Pagination
          defaultCurrent={1}
          onChange={(e) => handlePageChange(e)}
          pageSize={10}
          total={50}
        />
      </Col>
    </Row>
  );
};

export default UserData;
