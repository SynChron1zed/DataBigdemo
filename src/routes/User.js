/**
 * Created by lenovo on 2017-01-10.
 */
/**
 * Created by Administrator on 2016/12/27.
 */
import React ,{map} from 'react';
import { Row, Col,Upload, message, Button, Icon,Modal,Popconfirm,Input,Checkbox } from 'antd';

//插件可用
import style from './User.css';
import $ from 'jquery';
import fetch from 'dva/fetch';
import Layout from '../components/Layout';

var count = 0;
const plainOptions = [''];

var Home = React.createClass({


  getInitialState: function () {
    return {
      AllData:[],
      code:[],
      userId:[],
      userCode:[],
      userName:[],
      userPwd:[],
      userTel:[],
      userCId:[],
      uCode:[],
      uName:[],
      uPwd:[],
      uPwd2:[],
      uTel:[],
      uCId:[],
      changeVisible: false,
      addVisible: false,
      UptPwdVisible:false,
      checkAll: false,
      data:[{checked:false},{checked:true}],
      id:[],      newPwd:[],
      newPwd2:[],
    }
  },

  //查询所有用户
  selectAll(){
   var url = localStorage.getItem("url");
   console.info(url);
   url = url+'DBScreen/entUser/getEntUserList';
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

  //修改
  handleChangeId(event){
    this.setState({userId: event.target.value});
  },
  handleChangeCode(event){
    this.setState({userCode: event.target.value});
  },
  handleChangeName(event){
    this.setState({userName: event.target.value});
  },
  handleChangePwd(event){
    this.setState({userPwd: event.target.value});
  },
  handleChangeTel(event){
    this.setState({userTel: event.target.value});
  },
  handleChangeCId(event){
    this.setState({userCId: event.target.value});
  },

  //添加
  handleAddCode(event){
    this.setState({uCode: event.target.value});
  },
  handleAddName(event){
    this.setState({uName: event.target.value});
  },
  handleAddPwd(event){
    this.setState({uPwd: event.target.value});
  },
  handleAddPwd2(event){
    this.setState({uPwd2: event.target.value});
  },
  handleAddTel(event){
    this.setState({uTel: event.target.value});
  },
  handleAddCId(event){
    this.setState({uCId: event.target.value});
  },

  //修改密码
  handleId(event){
    this.setState({id: event.target.value});
  },
  handleUptPwd(event){
    this.setState({newPwd: event.target.value});
  },
  handleUptPwd2(event){
    this.setState({newPwd2: event.target.value});
  },

  //根据用户ID查询用户信息
  selectUserById(index){
      var url = localStorage.getItem("url");
      url = url+'DBScreen/entUser/getEntUser';
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          "entUserId":index,
        })

      },this).then(function (res) {
        console.log("fetch request ", JSON.stringify(res.ok));
        if (res.ok) {
          res.json().then(function (json) {
            if(json.code==0){
              var alldata = json.data;
              this.setState({userId:alldata.userId});
              this.setState({userCode:alldata.userCode});
              this.setState({userName:alldata.userName});
              this.setState({userTel:alldata.phone});
            }else{
              message.error('查询失败!');
              return false;
            }
          }.bind(this));
        } else {

        }

      }.bind(this)).catch(function (e) {
        console.log("fetch fail");
      });

  },

  InputUserCode(event){
    this.setState({code: event.target.value});
  },

  //很据用户编码查询用户信息
  getUserinfoByCode(){
    if(this.state.code == ""){
      this.selectAll();
    }else{
      var url = localStorage.getItem("url");
      url = url+'DBScreen/entUser/getEntUser';
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          "entUserCode":this.state.code,
        })

      },this).then(function (res) {
        console.log("fetch request ", JSON.stringify(res.ok));
        if (res.ok) {
          res.json().then(function (json) {
            if(json.code==0){
              message.success('查询成功!');
              var Alldataa = [];
              Alldataa[0] = json.data;
              this.setState({AllData:Alldataa});
              /*
               this.setState({tempName:Alldataa[0].index});
               this.setState({tempName:Alldataa[0].userName});
               this.setState({tempCode:Alldataa[0].userCode});
               this.setState({tempId:Alldataa[0].userId});
               this.setState({tempName:Alldataa[0].phone});*/
            }else if(json.code==16){
              message.error('查询失败,该用户编码不存在!');
              return false;
            }
            else{
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

  //显示修改密码框
  updatePwd(){
    this.setState({UptPwdVisible:true});
  },

  //确认修改密码
  handleUptOk(){
    var reg3 =/^[0-9A-Za-z]{6,12}$/ ; //Pwd 6-12位字母或数字
    if(reg3.test(this.state.newPwd)!=true){
      message.error("密码为6-12位字母或数字");
      return false;
    }else if(this.state.newPwd != this.state.newPwd2){
      message.error("再次输入密码错误，请确认");
      return false;
    }
    /*if(reg4.test(this.state.userTel)!=true || reg5.test(this.state.userTel)!=true){
     message.error("请填入正确的电话格式");
     return false;
     }*/else{
      var url = localStorage.getItem("url");
      url = url+'DBScreen/entUser/xgmm';
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          "entUserId":this.state.id,
          "password":this.state.newPwd
        })

      },this).then(function (res) {
        console.log("fetch request ", JSON.stringify(res.ok));
        if (res.ok) {
          res.json().then(function (json) {
            if(json.code==0){
              message.success('密码修改成功!');
              this.setState({UptPwdVisible: false});
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

  //取消修改密码
  handleUptCancel(){
    this.setState({UptPwdVisible:false});
  },

  //显示修改框
  showModal1(index){
    this.setState({changeVisible:true});
    this.selectUserById(index);
  },

  //确认修改
  handleChangeOk(){
    var reg1 = /^\S{1,8}$/; //Code  1-6位除空格之外任意字符
    var reg2 = /^\S{1,10}$/; //Name  1-10位除空格之外任意字符
    var reg3 =/^[0-9A-Za-z]{6,12}$/ ; //Pwd 6-12位字母或数字
    var reg4 = /^[1][358][0-9]{9}$/;  //Tel 手机
    if(reg1.test(this.state.userCode)!=true){
      message.error("用户编码为1-3位数字字符");
      return false;
    }else if(reg2.test(this.state.userName)!=true){
      message.error("用户名称为1-10位除空格之外任意字符");
      return false;
    } else if(reg4.test(this.state.userTel)!=true){
      message.error("请填入正确的手机号码");
      return false;
     }else{
      var url = localStorage.getItem("url");
      url = url+'DBScreen/entUser/updateEntUser';
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
           "entUserId":this.state.userId,
           "entUserCode":this.state.userCode,
           "entUserName":this.state.userName,
           "phone":this.state.userTel,
           "entId":this.state.userCId
        })

      },this).then(function (res) {
        console.log("fetch request ", JSON.stringify(res.ok));
        if (res.ok) {
          res.json().then(function (json) {
            if(json.code==0){
              message.success('用户信息修改成功!');
              this.setState({changeVisible: false});
              this.selectAll();
            }else if(json.code==15){
              message.error('修改失败,此用户编码已存在!');
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
  handleChangeCancel(){
    this.setState({changeVisible:false});
  },

  //显示添加框
  showModal2(){
    this.setState({addVisible:true});
  },

  //确认添加
  handleAddOk(){
    var reg1 = /^\S{1,6}$/; //Code  1-6位除空格之外任意字符
    var reg2 = /^\S{1,10}$/; //Name  1-10位除空格之外任意字符
    var reg3 =/^[0-9A-Za-z]{6,12}$/ ; //Pwd 6-12位字母或数字
    var reg4 = /^[1][358][0-9]{9}$/;  //Tel 手机号码
    if(reg1.test(this.state.uCode)!=true){
      message.error("用户编码为1-3位数字字符");
      return false;
    }else if(reg2.test(this.state.uName)!=true){
      message.error("用户名称为1-10位除空格之外任意字符");
      return false;
    }else if(reg3.test(this.state.uPwd)!=true){
      message.error("用户密码为6-12位字母或数字");
      return false;
    }else if(this.state.uPwd != this.state.uPwd2){
      message.error("再次输入密码错误，请确认");
      return false;
    }else if(reg4.test(this.state.uTel)!=true){
      message.error("请填入正确的手机号码");
      return false;
    }else{
      var url = localStorage.getItem("url");
      url = url+'DBScreen/entUser/addEntUser';
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          "entUserCode":this.state.uCode,
          "entUserName":this.state.uName,
          "password":this.state.uPwd,
          "phone":this.state.uTel,
          "entId":this.state.uCId
        })

      },this).then(function (res) {
        console.log("fetch request ", JSON.stringify(res.ok));
        if (res.ok) {
          res.json().then(function (json) {
            if(json.code==0){
              message.success('添加成功!');
              this.setState({addVisible: false});
              this.selectAll();
            }else if(json.code==15){
              message.error('添加失败,该用户编码已存在!');
              return false;
            }else{
              message.error('添加失败!');
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

  //取消添加
  handleAddCancel(){
    this.setState({addVisible:false});
  },

  onChoose(e){

      console.log(`checked = ${e.target.checked}`);

  },

  //确认删除
  confirm(id) {
    var url = localStorage.getItem("url");
    console.info(url);
    var arr=[];
    arr.push(id);
    url = url+'DBScreen/entUser/delEntUser';
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        "entUserId":arr
      })
    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {
        res.json().then(function (json) {
          if(json.code==0){
            message.success('删除成功!');
            this.selectAll();
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

  cancel() {
    message.error('Click on No');
  },

  //全选、取消全选
  checkAll(){
      $("input[name='test']").prop("checked",$("#cbAll").prop("checked"));
  },


//确认批量删除
  confirmBatch(){
    var test=[];
    $("input:checkbox[name='test']:checked").each(function () {
      test.push( parseInt($(this).val()));
    });
      console.info(test+"----------------");
        var url = localStorage.getItem("url");
        url = url+'DBScreen/entUser/delEntUser';
        fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: JSON.stringify({
            "entUserId":test
          })
        },this).then(function (res) {
          console.log("fetch request ", JSON.stringify(res.ok));
          if (res.ok) {
            res.json().then(function (json) {
              if(json.code==0){
                message.success('删除成功!');
                this.selectAll();
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

/*
  //单选
  checkchange:function(event){
    //console.log('checkchange');
    var cw = $('#UserManager').find('#listcheck');
    var len = cw.length;
    var tdata = this.state.data;

    var thumb = tdata;
    for(var i = 0; i < len; i++){
      thumb[i].checked = cw.eq(i).find('input').prop('checked');
    }
    this.setState({
      data:thumb
    });

  },

  //全选
  onCheckAllChange:function(event){

    var tdata = this.state.data;
    var tlen = tdata.length;
    var thumb = tdata;
    if(event.target.checked){
      //全选
      for(var i = 0; i < tlen; i++){
        thumb[i].checked = true;
      }
    }else{
      //全反选
      for(var i = 0; i < tlen; i++){
        thumb[i].checked = false;
      }
    }

    this.setState({
      checkall:event.target.checked,
      data:thumb
    })
  },*/

  render: function() {
    return (

      <Layout>
        <div className={style.Inhead} id="UserManager">
          <Row className={style.top}>
            <Col span={5}></Col>
            <Col span={2}>用户编码：</Col>
            <Col span={5}><Input type="text" className={style.inputCode} placeholder="请输入用户编码" value={this.state.code} onChange={this.InputUserCode}/></Col>
            <Col span={3}><Button onClick={this.getUserinfoByCode} ><Icon type="search" />查询</Button></Col>
            <Col span={3}><Button onClick={this.showModal2}><Icon type="plus" /> 添加</Button></Col>
            <Col span={3}>
            <Popconfirm title="确定删除这些用户？" onConfirm={this.confirmBatch} onCancel={this.cancelBatch} okText="Yes" cancelText="No">
              <Button ><Icon type="minus" /> 批量删除</Button>
            </Popconfirm>
            </Col>
            <Modal title="修改密码"
                   visible={this.state.UptPwdVisible}
                   onOk={this.handleUptOk}
                   onCancel={this.handleUptCancel}
            >
              <p>用户ID：<Input type="text" className={style.input2} placeholder="请输入需要修改的用户ID" value={this.state.id} onChange={this.handleId}/></p>
              <br/>
              <p>新密码：<Input type="password" className={style.input2} placeholder="6-12位字母或数字" value={this.state.newPwd} onChange={this.handleUptPwd}/></p>
              <br/>
              <p>确认密码：<Input type="password" className={style.input2} placeholder="请再次输入密码" value={this.state.newPwd2} onChange={this.handleUptPwd2}/></p>
            </Modal>
            <Col span={3}><Button onClick={this.updatePwd}><Icon type="edit" />修改密码</Button></Col>
          </Row>

          <Row className={style.Inhead3}>
            <Col  className={style.Inhead2} span={2}><input type="checkbox" id="cbAll" value="all" onClick={this.checkAll}/></Col>
            <Col  className={style.Inhead2} span={1}>编号</Col>
            <Col className={style.Inhead2} span={2}>用户ID</Col>
            <Col className={style.Inhead2} span={4}>用户名称</Col>
            <Col  className={style.Inhead2} span={3}>用户编码</Col>
            <Col  className={style.Inhead2} span={4}>联系电话</Col>
            <Col  span={8}>操作</Col>
          </Row>

          <Modal title="修改用户信息"
                 visible={this.state.changeVisible}
                 onOk={this.handleChangeOk}
                 onCancel={this.handleChangeCancel}
          >
            <br/>
            <p>用户编码：<Input type="text" className={style.input2} placeholder={this.state.userCode} value={this.state.userCode} onChange={this.handleChangeCode}/></p>
            <br/>
            <p>用户名称：<Input type="text" className={style.input2} placeholder={this.state.userName} value={this.state.userName} onChange={this.handleChangeName}/></p>
            <br/>
            <p>联系方式：<Input type="text" className={style.input2} placeholder={this.state.userTel} value={this.state.userTel} onChange={this.handleChangeTel}/></p>
          </Modal>

          <Modal title="添加用户信息"
                 visible={this.state.addVisible}
                 onOk={this.handleAddOk}
                 onCancel={this.handleAddCancel}
          >
            <p>用户编码：<Input type="text" className={style.input2} placeholder=" 1-6位除空格之外任意字符" value={this.state.uCode} onChange={this.handleAddCode}/></p>
            <br/>
            <p>用户名称：<Input type="text" className={style.input2} placeholder="1-10位除空格之外任意字符" value={this.state.uName} onChange={this.handleAddName}/></p>
            <br/>
            <p>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：<Input type="password" className={style.input2} placeholder="6-12位字母或数字" value={this.state.uPwd} onChange={this.handleAddPwd}/></p>
            <br/>
            <p>确认密码：<Input type="password" className={style.input2} placeholder="请再次输入密码" value={this.state.uPwd2} onChange={this.handleAddPwd2}/></p>
            <br/>
            <p>联系方式：<Input type="text" className={style.input2} placeholder="请填入正确的电话格式" value={this.state.uTel} onChange={this.handleAddTel}/></p>
          </Modal>



          {
            this.state.AllData.map(function (newdata) {
              return(
                <Row className={style.Inhead4} key={newdata.index}>
                  <Col  className={style.Inhead2} span={2}> <input type="checkbox" name="test" value={newdata.userId}/></Col>
                  <Col  className={style.Inhead2} span={1}>{newdata.index}</Col>
                  <Col className={style.Inhead2} span={2}>{newdata.userId}</Col>
                  <Col className={style.Inhead2} span={4}>{newdata.userName}</Col>
                  <Col className={style.Inhead2} span={3}>{newdata.userCode}</Col>
                  <Col className={style.Inhead2} span={4}>{newdata.phone}</Col>
                  <Col className={style.Inhead2} span={4}>
                    <Button onClick={this.showModal1.bind(this,newdata.userId)} type="primary"><Icon type="edit" /> 修改</Button>
                  </Col>
                  <Col  span={4}>
                    <Popconfirm title="确定删除此用户？" onConfirm={this.confirm.bind(this,newdata.userId)} onCancel={this.cancel} okText="Yes" cancelText="No">
                      <Button><Icon type="minus" /> 删除</Button>
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
