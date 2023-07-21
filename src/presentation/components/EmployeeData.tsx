import { Card, Col, Pagination, Row, Typography, Image } from "antd";
import moment from "moment";
import "../css/Home.css";

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
      {employeeData?.map((item: any, index: number) => {
        return (
          <Col lg={12} xs={24} key={index}>
            <Card className="data-card">
              <div className="dataOutter-div">
                <div className="dataInner-div">
                  <Image
                    width={"30px"}
                    style={{ borderRadius: 50 }}
                    src={item.image}
                    alt="profile_pic"
                    preview={false}
                  />
                  <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography className="textStyle">{item.name}</Typography>
                      <div className="color-dot" style={{ backgroundColor: item.color }}></div>
                    </div>
                    <Typography className="idStyle">
                      Employee id :#EM{item.id}
                    </Typography>
                  </div>
                </div>
                <Typography className="textStyle">
                  {moment(item.createdAt)?.utc().format("YYYY-MM-DD")}
                </Typography>
              </div>

              <h4 className="h4Txt">
                Employee Details
              </h4>

              <Typography className="employeeData">
                Company : {item.companyName}
              </Typography>
              <Typography className="employeeData">
                Department : {item.department}
              </Typography>
              <Typography className="employeeData">
                Gender : {item.gender}
              </Typography>
              <Typography className="employeeData">
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

export default EmployeeData;
