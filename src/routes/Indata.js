/**
 * Created by Administrator on 2016/12/27.
 */
/**
 * Created by Administrator on 2016/12/27.
 */
import React ,{map} from 'react';
import { Row, Col,Upload, message, Button, Icon } from 'antd';
//插件可用
import style from './Indata.css';
import fetch from 'dva/fetch';
import Layout from '../components/Layout';




var url = localStorage.getItem("url");

const props = {
  name: 'file',
  action: url+'DBScreen/excel/import',
  headers: {
    'X-Requested-With':null,
  },
  data:{
    'tempcode':"1",
    'usercode':'jfx01'
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功！`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败！`);
    }
  },
  showUploadList:false

};


var Indata = React.createClass({

  getInitialState: function () {

    return {

      companyName:[],
      Pname:[],
      Pcode:[],
      AllData:[]
    }

  },



  componentDidMount() {


    var userIf =localStorage.getItem("userinfo");
    userIf = JSON.parse(userIf);
    var usercode = userIf.usercode

    var url = localStorage.getItem("url");
    url = url+'DBScreen/ut/cxut';
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        "usercode":usercode,
      })

    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {
        res.json().then(function (json) {

          console.info(json);
          var Alldata =json.data;
          console.log(Alldata)
          this.setState({AllData:Alldata});

          this.setState({companyName:Alldata.screenName});
          this.setState({Pname:userIf.username});
          this.setState({Pcode:Alldata.templateCode});


        }.bind(this));
      } else {
      }

    }.bind(this)).catch(function (e) {
      console.log("fetch fail");
    });


  },

  openData:function () {
    window.open("http://120.76.194.221/IOP/JFX/");
  },


  Dataexport:function (e1,e2) {


    var a = e1
    var userIf =localStorage.getItem("userinfo");
    userIf = JSON.parse(userIf);
    var usercode = userIf.usercode

    var url = localStorage.getItem("url");
    url = url+'/DBScreen/excel/export';
    location.href=url+'?tempcode='+a+'&usercode='+usercode;

  },


  render: function() {
    return (

      <Layout>
        <div className={style.Inhead}>
          <Row className={style.Inhead3}>
            <Col  className={style.Inhead2} span={2}>&nbsp;</Col>
            <Col className={style.Inhead2} span={5}>企业名称</Col>
            <Col className={style.Inhead2} span={5}>屏幕名称</Col>
            <Col className={style.Inhead2} span={2}>模板编码</Col>
            <Col className={style.Inhead2} span={3}>下载表格</Col>
            <Col  className={style.Inhead2} span={3}>导入表格</Col>
            <Col span={4}>屏幕预览</Col>
          </Row>

          {
            this.state.AllData.map(function (newdata) {

              return(
          <Row className={style.Inhead4} key={newdata.templateCode}>
            <Col  className={style.Inhead2} span={2}>1</Col>
            <Col className={style.Inhead2} span={5}>{this.state.Pname}</Col>
            <Col className={style.Inhead2} span={5}>{newdata.screenName}</Col>
            <Col className={style.Inhead2} span={2}>{newdata.templateCode}</Col>
            <Col className={style.Inhead2} span={3}><Button onClick={this.Dataexport.bind(this, 1,)}><Icon type="download" /> 下载</Button> </Col>
            <Col  className={style.Inhead2} span={3}>  <Upload {...props} >
              <Button type="ghost">
                <Icon type="upload" /> 导入
              </Button>
            </Upload></Col>

            <Col span={4}> <Button type="primary" onClick={this.openData} >预览</Button></Col>
          </Row>
              )

            }.bind(this))
          }


        </div>




      </Layout>

    )
  }

});

export default Indata;
