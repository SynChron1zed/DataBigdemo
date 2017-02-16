/**
 * Created by lenovo on 2017-01-10.
 */
/**
 * Created by Administrator on 2016/12/27.
 */
import React ,{map} from 'react';
import { Row, Col,Upload, message, Button, Icon,Modal,Popconfirm,Input } from 'antd';
//插件可用
import style from './Model.css';
import fetch from 'dva/fetch';
import Layout from '../components/Layout';





var Home = React.createClass({


  getInitialState: function () {
    return {
      AllData:[],
      Code:[],
      tName:[],
      tCode:[],
      tempName:[],
      tempCode:[],
      tempId:[],
      // ModalText: 'Content of the modal dialog',
      visible: false,
      addVisible:false,

    }

  },

  //查询所有模板
  selectAll(){
    var url = localStorage.getItem("url");
    console.info(url);
    url = url+'DBScreen/mb/symb';
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {
        res.json().then(function (json) {
          console.info(json);
          var Alldata =json.data;
          console.log(Alldata);
          this.setState({AllData:Alldata});

        }.bind(this));
      } else {

      }

    }.bind(this)).catch(function (e) {
      console.log("fetch fail");
    });

  },

  componentDidMount() {
    this.selectAll();
  },

  handleAddTempName(event){
    this.setState({tName: event.target.value});
  },

  handleAddTempCode(event){
    this.setState({tCode: event.target.value});
  },

  handleChangeCode(event){
    this.setState({Code: event.target.value});
  },

  handleChangeTempName(event) {
    this.setState({tempName: event.target.value});
  },

  handleChangeTempCode(event){
    this.setState({tempCode: event.target.value});
  },

  handleChangeTempId(event){
    this.setState({tempId: event.target.value});
  },

  //显示添加框
  add(){
    this.setState({
      addVisible: true,
    });
  },

  //确认添加
  handleAddOk(){
    var reg1 = /^\d{1,3}$/; //1-3位数字
    var reg2 = /^\S{1,10}$/; //1-10位字符
    if(reg1.test(this.state.tCode)!=true){
      message.error("模板编码为1-3位数字字符");
      return false;
    }if(reg2.test(this.state.tName)!=true){
      message.error("模板名称为1-10位除空格外任意字符");
      return false;
    } else{
    var url = localStorage.getItem("url");
    console.info(url);
    url = url+'DBScreen/mb/tjmb';
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        "tempcode":this.state.tCode,
        "tempname":this.state.tName
      })
    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {
        res.json().then(function (json) {
          if(json.code==0){
            message.success('添加成功!');
            this.setState({addVisible: false});
            this.selectAll();
          }else if(json.code==1){
            message.error('此模板已存在!');
            return false;
          }
          else{
            message.error('添加失败!');
            return false;
          }
          console.info(json);
        }.bind(this));
      } else {

      }

    }.bind(this)).catch(function (e) {
      console.log("fetch fail");
    });
    }
  },

  //取消添加
  handleAddCancel(){
    this.setState({
      addVisible: false,
    });
  },

  //显示修改框
  showModal(index) {
    this.setState({
     visible: true
    });
    this.getInfoByCode(1,index);
  },

  //根据模板编码查询模板信息
  getInfoByCode(i,index){
    if(i!=1 && this.state.Code==""){
      this.selectAll();
    }else{
      var url = localStorage.getItem("url");
      var a;
      if(i==1){
        a=index;
      }else{
        a=this.state.Code;
      }
      console.info(url);
      url = url+'DBScreen/mb/cxmb';
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          "tempcode":a
        })
      },this).then(function (res) {
        console.log("fetch request ", JSON.stringify(res.ok));
        if (res.ok) {
          res.json().then(function (json) {
            if(json.code==0){
              var Alldataa = [];
              Alldataa[0] = json.data;

              if(i!=1 && this.state.Code!=""){
                this.setState({AllData:Alldataa});
              }
                this.setState({tempName:Alldataa[0].templateName});
                this.setState({tempCode:Alldataa[0].templateCode});
                this.setState({tempId:Alldataa[0].templateId});


            }else if(json.code==14){
              message.error('模板编码不存在!');
              return false;
            } else{
              message.error('查询失败!');
              return false;
            }
          }.bind(this));
        } else {

        }

      }.bind(this)).catch(function (e) {
        console.log("fetch fail");
      });
    }

  },

  //确认修改
  handleOk(event) {
    var reg1 = /^\d{1,3}$/; //1-3位数字
    var reg2 = /^\S{1,10}$/; //1-10位字符
    if(reg1.test(this.state.tempCode)!=true){
      message.error("模板编码为1-3位数字");
      return false;
    }if(reg2.test(this.state.tempName)!=true){
      message.error("模板名称为1-10位");
      return false;
    }else{
      var url = localStorage.getItem("url");
      url = url+'DBScreen/mb/xgmb';
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          "tempname":this.state.tempName,
          "tempcode":this.state.tempCode,
          "tempid":this.state.tempId
        })

      },this).then(function (res) {
        console.log("fetch request ", JSON.stringify(res.ok));
        if (res.ok) {
          res.json().then(function (json) {
            if(json.code==0){
              message.success('修改成功!');
              this.setState({visible: false});
              this.selectAll();
            }else if(json.code==13){
              message.error('修改失败,此模板编码已存在!');
              return false;
            } else{
              message.error('修改失败!');
              return false;
            }
          }.bind(this));
        } else {

        }

      }.bind(this)).catch(function (e) {
        console.log("fetch fail");
      });
    }

  },

  //取消修改
  handleCancel() {
    this.setState({
      visible: false,
    });
  },



  //确认删除
  handleDelOk(id) {
    var url = localStorage.getItem("url");
    console.info(url);
    url = url+'DBScreen/mb/scmb';
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        "tempid":id
      })
    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {
        res.json().then(function (json) {

          if(json.code==0){
            message.success('删除成功!');
            this.selectAll();
          }else if(json.code==12){
            message.error('此模板已被使用，不能删除!');
            return false;
          }else{
            message.error('删除失败!');
            return false;
          }

        }.bind(this));
      } else {

      }

    }.bind(this)).catch(function (e) {
      console.log("fetch fail");
    });

  },

  //取消删除
  handleDelCancel() {

  },

  render: function() {
    return (

      <Layout>
        <div className={style.Inhead}>
          <Row className={style.top}>
            <Col span={10}></Col>
            <Col span={2}>模板编码：</Col>
            <Col span={6}><Input type="text" className={style.input} placeholder="请输入模板编码" value={this.state.Code} onChange={this.handleChangeCode}/></Col>
            <Col span={3}><Button onClick={this.getInfoByCode}><Icon type="search" />查询</Button></Col>
            <Col span={3}><Button onClick={this.add}><Icon type="plus" />添加</Button></Col>
            <Modal title="添加模板"
                   visible={this.state.addVisible}
                   onOk={this.handleAddOk}
                   onCancel={this.handleAddCancel}
            >
              <p>模板名称： <Input type="text" className={style.input2} placeholder="1-10位除空格外任意字符" value={this.state.tName} onChange={this.handleAddTempName}/></p>
              <br/>
              <p>模板编码： <Input type="text" className={style.input2} placeholder="1-3位数字字符" value={this.state.tCode} onChange={this.handleAddTempCode}/></p>
            </Modal>
            <Modal title="修改模板信息"
                   visible={this.state.visible}
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}
            >
              <p>模板名称： <Input type="text" className={style.input2} placeholder="1-10位除空格外任意字符" value={this.state.tempName} onChange={this.handleChangeTempName}/></p>
              <br/>
              <p>模板编码： <Input type="text" className={style.input2} placeholder="1-3位数字字符" value={this.state.tempCode} onChange={this.handleChangeTempCode}/></p>
            </Modal>

          </Row>
          <Row className={style.Inhead3}>
            <Col className={style.Inhead2} span={2}>编号</Col>
            <Col className={style.Inhead2} span={6}>模板名称</Col>
            <Col className={style.Inhead2} span={3}>模板编码</Col>
            <Col className={style.Inhead2} span={3}>ID</Col>
            <Col  span={10}>操作</Col>
          </Row>

          {
            this.state.AllData.map(function (newdata) {

              return(
                <Row className={style.Inhead4} key={newdata.templateId}>
                  <Col  className={style.Inhead2} span={2}>{newdata.index}</Col>
                  <Col className={style.Inhead2} span={6}>{newdata.templateName}</Col>
                  <Col className={style.Inhead2} span={3}>{newdata.templateCode}</Col>
                  <Col className={style.Inhead2} span={3}>{newdata.templateId}</Col>
                  <Col className={style.Inhead2} span={5}>
                    <Button type="primary"  onClick={this.showModal.bind(this,newdata.templateCode)} ><Icon type="edit" /> 修改</Button>
                  </Col>
                  <Col span={5}>
                    <Popconfirm title="确定删除此模板?" onConfirm={this.handleDelOk.bind(this,newdata.templateId)} onCancel={this.handleDelCancel} okText="Yes" cancelText="No">
                      <Button><Icon type="minus"/> 删除</Button>
                    </Popconfirm>
                  </Col>
                </Row>

              )

            }.bind(this))
          }



        </div>

      </Layout>

    )
  }

});

export default Home;
