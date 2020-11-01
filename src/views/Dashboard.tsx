import React from 'react'
// react plugin used to create charts
import { Line } from 'react-chartjs-2'
// react plugin for creating vector maps

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from 'reactstrap'

import {
  chartExample1,
  chartExample2,
  chartExample3,
} from '../variables/charts.js'

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Capacity</p>
                      <CardTitle tag="p">150GB</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-refresh" />
                  Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <CardTitle tag="p">$ 1,345</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar-o" />
                  Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-clock-o" />
                  In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-refresh" />
                  Update now
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4" sm="6">
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="7">
                    <div className="numbers pull-left">$34,657</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Badge color="success" pill>
                        +18%
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="big-title">
                  total earnings in last ten quarters
                </h6>
                <Line
                  data={chartExample1.data}
                  options={chartExample1.options}
                  height={380}
                  width={826}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <Row>
                  <Col sm="7">
                    <div className="footer-title">Financial Statistics</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Button
                        className="btn-round btn-icon"
                        color="success"
                        size="sm"
                      >
                        <i className="nc-icon nc-simple-add" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="7">
                    <div className="numbers pull-left">169</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Badge color="danger" pill>
                        -14%
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="big-title">
                  total subscriptions in last 7 days
                </h6>
                <Line
                  data={chartExample2.data}
                  options={chartExample2.options}
                  height={380}
                  width={828}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <Row>
                  <Col sm="7">
                    <div className="footer-title">View all members</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Button
                        className="btn-round btn-icon"
                        color="danger"
                        size="sm"
                      >
                        <i className="nc-icon nc-button-play" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="7">
                    <div className="numbers pull-left">8,960</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Badge color="warning" pill>
                        ~51%
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="big-title">total downloads in last 6 years</h6>
                <Line
                  data={chartExample3.data}
                  options={chartExample3.options}
                  height={380}
                  width={826}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <Row>
                  <Col sm="7">
                    <div className="footer-title">View more details</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Button
                        className="btn-round btn-icon"
                        color="warning"
                        size="sm"
                      >
                        <i className="nc-icon nc-alert-circle-i" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard
