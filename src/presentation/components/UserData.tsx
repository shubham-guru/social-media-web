import { Card, Col, Pagination, Row, Typography, Image } from "antd";
import moment from "moment";
import Loading from "./Loading";
import styles from "../css/Home";

type myProps = {
  userDetails: Array<{}>;
  getPageNo: (e: number) => void;
};
const UserData: React.FC<myProps> = ({ userDetails, getPageNo }) => {
  const handlePageChange = (e: number) => {
    getPageNo(e);
    window.scrollTo(0, 0);
  };

  return (
    <Row>
      <Col style={{display:'flex', flexDirection:'column', justifyContent:'çenter', alignItems:'çenter'}} span={24}>
        {userDetails?.map((item: any, index: number) => {
          return (
            <Card
              key={index}
              style={{
                margin: 20,
                backgroundColor: "#f2f2f2",
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
                  <div style={{display: 'flex', alignItems: 'center'}}> 
                    <Typography style={styles.textStyle}>
                      {item.name}
                    </Typography>
                  <div style={{padding: .1, margin: 2, width: '10px', height: '10px', borderRadius: 20, backgroundColor: item.color}}></div>
                  </div>
                    <Typography style={styles.idStyle}>
                      User id :#UD{item.id}
                    </Typography>
                  </div>
                </div>
                <Typography style={styles.textStyle}>
                  {moment(item.createdAt)?.utc().format("YYYY-MM-DD")}
                </Typography>
              </div>

              {item.post ? (
                <Image
                  width={"80%"}
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
                  marginTop: 20,
                  textAlign: "center",
                  fontSize: 12,
                }}
              >
                {item.comments}
              </Typography>
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
