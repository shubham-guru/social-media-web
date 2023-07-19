import { Card, Col, Pagination, Row, Typography, Image } from "antd";
import moment from "moment";
import styles from "../css/Home";

type myProps = {
  employeeData: Array<{}>;
  getPageNo: (e: number) => void;
};
const EmployeeData: React.FC<myProps> = ({ employeeData, getPageNo }) => {
  const handlePageChange = (e: number) => {
    getPageNo(e);
    window.scrollTo(0, 0);
  };

  return (
    <Row>
      <Col span={24}>
        {employeeData?.map((item: any, index: number) => {
          return (
            <Card
              key={index}
              style={{ margin: 20, backgroundColor: "#f2f2f2", width: "90%", boxShadow: `1px 1px 5px ${item.color}` }}
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
                      width={'40px'}
                      style={{ borderRadius: 50 }}
                      src={item.image}
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
                      Employee id :#EM{item.id}
                    </Typography>
                  </div>
                </div>
                <Typography style={styles.textStyle}>
                  {moment(item.createdAt)?.utc().format("YYYY-MM-DD")}
                </Typography>
              </div>

              <h4 style={{ fontFamily: "Raleway, sans-serif", letterSpacing: 1 }}>
                Employee Details
              </h4>

              <Typography style={styles.employeeData}>
                Company : {item.companyName}
              </Typography>
              <Typography style={styles.employeeData}>
                Department : {item.department}
              </Typography>
              <Typography style={styles.employeeData}>
                Gender : {item.gender}
              </Typography>
              <Typography style={styles.employeeData}>
                Address :{" "}
                {item.buildingNo +
                  "," +
                  item.streetName +
                  "," +
                  item.direction +
                  "," +
                  item.city +
                  "," +
                  item.country}
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

export default EmployeeData;
