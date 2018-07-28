import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./styles.css";

import { Button, Row, Col, Layout, Radio, Input, Checkbox } from "antd";
const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component {
  constructor() {
    super();
    this.count = 1;
    this.state = {
      labels: [{ data: "" }],
      checkedList: [],
      checked: false
    };
  }

  handleLabelChange = id => evt => {
    const newLabels = this.state.labels.map((label, lid) => {
      if (id !== lid) return label;
      return { ...label, data: evt.target.value };
    });

    this.setState({ labels: newLabels });
  };

  handleSubmit = evt => {};

  handleAddLabel = () => {
    this.count++;
    this.setState({ labels: this.state.labels.concat([{ data: "" }]) });
  };

  handleRemoveLabel = id => () => {
    this.count--;
    this.setState({ checkedList: [] });
    this.setState({ checked: false });
    this.setState({ labels: this.state.labels.filter((l, lid) => id !== lid) });
  };

  handleCheck = id => () => {
    if (this.state.checkedList.includes(id)) {
      this.setState({
        checkedList: this.state.checkedList.filter(lid => id !== lid)
      });
    } else {
      this.setState({ checkedList: this.state.checkedList.concat(id) });
    }
  };

  handleCheckAll = e => {
    console.log(this.count);
    if (this.state.checked) {
      this.setState({
        checked: e.target.checked
      });
      this.setState({ checkedList: [] });
    } else {
      this.setState({
        checked: e.target.checked
      });
      var i = 1;
      var tempList = [];
      while (i <= this.count) {
        if (i < this.count) {
          tempList.push(i);
        } else {
          this.setState({ checkedList: tempList });
        }
        i++;
      }
    }
  };

  handleRemoveMain = () => {
    this.setState(
      {
        labels: this.state.labels.filter(
          (l, lid) => !this.state.checkedList.includes(lid)
        )
      },
      () => {
        this.count = this.state.labels.length;
      }
    );
    this.setState({ checked: false });
    this.setState({ checkedList: [] });
  };

  render() {
    return (
      <div className="App">
        <Row>
          <Col xs={0} sm={0} md={1} lg={2} xl={5}>
            <Layout>
              <Header className="header" />
            </Layout>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={16}
            lg={14}
            xl={11}
            style={{ textAlign: "left" }}
          >
            <Layout>
              <Header className="header">
                <br />
                <small style={{ fontWeight: "0" }}>CATEGORY</small>
                <br />
                <div style={{ fontWeight: "900" }}>Page heading</div>
              </Header>
            </Layout>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={5}
            lg={4}
            xl={3}
            style={{ textAlign: "left", marginBottom: "50px" }}
          >
            <Layout>
              <Header className="header">
                <br />
                <Radio.Button value="button">BUTTON</Radio.Button>
              </Header>
            </Layout>
          </Col>
          <Col xs={0} sm={0} md={1} lg={4} xl={5}>
            <Layout>
              <Header className="header" />
            </Layout>
          </Col>
        </Row>
        <Row>
          <Col xs={0} sm={0} md={3} lg={3} xl={6} />
          <Col xs={0} sm={0} md={2} lg={2} xl={2} style={{ textAlign: "left" }}>
            <div className="box">
              <Checkbox
                checked={this.state.checked}
                onChange={this.handleCheckAll}
              />
            </div>
          </Col>
          <Col
            xs={2}
            sm={2}
            md={0}
            lg={0}
            xl={0}
            style={{ background: "#E9E6E6" }}
          >
            <div className="box" />
          </Col>
          <Col
            xs={0}
            sm={0}
            md={15}
            lg={13}
            xl={9}
            style={{ textAlign: "left" }}
          >
            <div className="box">
              <h2>
                Section Heading
                {this.state.checkedList.length > 0 && (
                  <small
                    style={{
                      float: "right",
                      fontWeight: "lighter",
                      color: "gray"
                    }}
                  >
                    {this.state.checkedList.length} Labels Selected
                  </small>
                )}
              </h2>
            </div>
          </Col>
          <Col
            xs={22}
            sm={22}
            md={0}
            lg={0}
            xl={0}
            style={{ textAlign: "left" }}
          >
            <div className="box">
              <h2>Section Heading</h2>
            </div>
          </Col>
          <Col xs={0} sm={0} md={3} lg={3} xl={2} style={{ textAlign: "left" }}>
            <div className="box">
              <Radio.Button
                value="remove"
                disabled={this.state.checkedList.length > 0 ? false : true}
                onClick={this.handleRemoveMain}
              >
                REMOVE
              </Radio.Button>
            </div>
          </Col>
          <Col xs={0} sm={0} md={1} lg={3} xl={5} />
        </Row>

        {this.state.labels.map((label, id) => (
          <Row>
            <Col xs={0} sm={0} md={3} lg={3} xl={6} />
            <Col
              xs={0}
              sm={0}
              md={2}
              lg={2}
              xl={2}
              style={{ textAlign: "left" }}
            >
              <div className="box3">
                <Checkbox
                  value={id}
                  checked={this.state.checkedList.includes(id) ? true : false}
                  disabled={id === 0 ? true : false}
                  onChange={this.handleCheck(id)}
                />
              </div>
            </Col>
            <Col
              xs={2}
              sm={2}
              md={0}
              lg={0}
              xl={0}
              style={{ background: "#E9E6E6" }}
            >
              <div className="box2" />
            </Col>
            <Col
              xs={0}
              sm={0}
              md={15}
              lg={13}
              xl={9}
              style={{ textAlign: "left" }}
            >
              <div className="box3">
                Label {id + 1}
                <br />
                <Input
                  placeholder="default size"
                  value={label.data}
                  onChange={this.handleLabelChange(id)}
                />
              </div>
            </Col>
            <Col
              xs={22}
              sm={22}
              md={0}
              lg={0}
              xl={0}
              style={{ textAlign: "left" }}
            >
              <div className="box2">
                Label {id + 1}
                <br />
                <Input
                  placeholder="default size"
                  value={label.data}
                  onChange={this.handleLabelChange(id)}
                />
                <br />
                {id > 0 && (
                  <button
                    type="button"
                    className="astext"
                    style={{ textAlign: "right", color: "red", float: "right" }}
                    onClick={this.handleRemoveLabel(id)}
                  >
                    REMOVE
                  </button>
                )}
              </div>
            </Col>
            <Col
              xs={0}
              sm={0}
              md={3}
              lg={3}
              xl={2}
              style={{ textAlign: "left" }}
            >
              <div
                className="box3"
                style={{ textAlign: "center", color: "red" }}
              >
                {id > 0 && (
                  <button
                    type="button"
                    className="astext"
                    onClick={this.handleRemoveLabel(id)}
                    style={{ float: "right" }}
                  >
                    REMOVE
                  </button>
                )}
              </div>
            </Col>
            <Col xs={0} sm={0} md={1} lg={3} xl={5} />
          </Row>
        ))}

        <Row>
          <Col xs={0} sm={0} md={3} lg={3} xl={6} />
          <Col xs={0} sm={0} md={2} lg={2} xl={2} style={{ textAlign: "left" }}>
            <div className="box1" />
          </Col>
          <Col
            xs={2}
            sm={2}
            md={0}
            lg={0}
            xl={0}
            style={{ background: "#E9E6E6" }}
          >
            <div className="box1" />
          </Col>
          <Col
            xs={0}
            sm={0}
            md={15}
            lg={13}
            xl={9}
            style={{ textAlign: "left" }}
          >
            <div className="box1" style={{ color: "blue" }}>
              <hr />
              <br />
              <button
                type="button"
                onClick={this.handleAddLabel}
                className="astext"
                style={{ float: "right" }}
              >
                +ADD LABEL
              </button>
              <br />
              <p />
              <br />
              <div>
                <Button
                  className="submitL"
                  type="primary"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Col>
          <Col
            xs={0}
            sm={22}
            md={0}
            lg={0}
            xl={0}
            style={{ textAlign: "left" }}
          >
            <div className="box1" style={{ color: "blue" }}>
              <hr />
              <br />
              <button
                type="button"
                onClick={this.handleAddLabel}
                className="astext"
                style={{ float: "right" }}
              >
                +ADD LABEL
              </button>
              <br />
              <p />
              <br />
              <div>
                <Button
                  className="submitM"
                  type="primary"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Col>
          <Col
            xs={22}
            sm={0}
            md={0}
            lg={0}
            xl={0}
            style={{ textAlign: "left" }}
          >
            <div className="box1" style={{ color: "blue" }}>
              <hr />
              <br />
              <button
                type="button"
                onClick={this.handleAddLabel}
                className="astext"
                style={{ float: "right" }}
              >
                +ADD LABEL
              </button>
              <br />
              <p />
              <br />
              <div>
                <Button
                  className="submitS"
                  type="primary"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Col>
          <Col xs={0} sm={0} md={3} lg={3} xl={2} style={{ textAlign: "left" }}>
            <div className="box1" />
          </Col>
          <Col xs={0} sm={0} md={1} lg={3} xl={5} />
        </Row>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
