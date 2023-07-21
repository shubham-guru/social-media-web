import { Card, Col, Pagination, Row, Typography, Image, Space } from "antd";
import moment from "moment";
import Loading from "./Loading";
import "../css/Home.css";
import { useState } from "react";
import {
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
type myProps = {
  userDetails: Array<{}>;
  getPageNo: (e: number) => void;
};
const UserData: React.FC<myProps> = ({ userDetails, getPageNo }) => {
  const [isPreviewVisible, setPreviewVisible] = useState<boolean>(false);

  const handlePageChange = (e: number) => {
    getPageNo(e);
    window.scrollTo(0, 0);
  };

  return (
    <Row className="main-row">
      {userDetails?.map((item: any, index: number) => {
        return (
          <Col lg={12} xs={24} key={index}>
            <Card
              className="data-card">
              <div className="dataOutter-div">
                <div className="dataInner-div">
                  <Image
                    width={"30px"}
                    preview={false}
                    style={{ borderRadius: 50 }}
                    src={item.avatar}
                    alt="profile_pic"
                  />
                  <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography className="textStyle"><b>{item.name}</b></Typography>
                      <div
                        className="color-dot"
                        style={{
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                    <Typography className="idStyle">
                      User id :#UD{item.id}
                    </Typography>
                  </div>
                </div>
                <Typography className="textStyle">
                  <b>{moment(item.createdAt)?.utc().format("YYYY-MM-DD")}</b>
                </Typography>
              </div>

              {item.post ? (
                <Image
                  width={"90%"}
                  onMouseEnter={()=>setPreviewVisible(!isPreviewVisible)}
                  src={item.post}
                  className="postImage"
                  alt="user_post"
                  preview={{
                    visible: isPreviewVisible,
                    onVisibleChange: (visible, prevVisible) => setPreviewVisible(visible),
                  }}
                />
              ) : (
                <Loading />
              )}

              <Typography className="commentsTxt">
                {item.comments}
              </Typography>
            </Card>
          </Col>
        );
      })}
      <Pagination
        defaultCurrent={1}
        onChange={(e) => handlePageChange(e)}
        pageSize={10}
        total={50}
      />
    </Row>
  );
};

export default UserData;
