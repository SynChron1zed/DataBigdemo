/**
 * Created by dixu on 2017/2/15.
 */
import React, { Component, PropTypes } from 'react';
import style from './Login.css';
import fetch from 'dva/fetch';

const  _button = require('antd/lib/button');
const  message = require('antd/lib/message');


var Login = React.createClass({

  getInitialState: function () {//登陆初始化
    // localStorage.setItem("url",'http://192.168.88.239:8080/');
    localStorage.setItem("url",'http://120.76.194.221:8080/');
    return {
      Number:[],
      Name:[],
      Password:[]
    }


  },

  componentDidMount() {//记住密码
    var userIf =localStorage.getItem("userinfo");
    if(localStorage.getItem("JZpassword")=="1" && userIf!=null){
      userIf = JSON.parse(userIf);
      //this.setState({Number: userIf.en});
      this.setState({Name: userIf.usercode});
      this.setState({Password: localStorage.getItem("Password")});
      var items = document.getElementsByName("Password");
      items[0].checked=true;
    }


  },



  handleChangeNumber(event) {
    this.setState({Number: event.target.value});
  },

  handleChangeName(event) {
    this.setState({Name: event.target.value});
  },

  handleChangeNamePassword(event) {
    this.setState({Password: event.target.value});
  },

  JZpassword(event){//清除密码

    var items = document.getElementsByName("Password");
    if (items[0].checked) {
      localStorage.setItem("JZpassword",'1');
    }else{
      localStorage.setItem("JZpassword",'0');
      this.setState({Number: ""});
      this.setState({Name: ""});
      this.setState({Password: ""});
    }
  },
  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit(event) {//登陆

    /*  alert('A name was submitted: ' + this.state.Number + this.state.Name +this.state.Password);*/
    var userIf =localStorage.getItem("userinfo");

    if(this.state.Name==""){
      message.error('请输入用户名');
      return false;
    }else if(this.state.Password==""){
      message.error('请输入密码');
      return false;
    }else{

      var url = localStorage.getItem("url");
      url = url+'DBScreen/login/';

      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({


          "usercode":this.state.Name,

          "password":this.state.Password,


        })

      },this).then(function (res) {
        console.log("fetch request ", JSON.stringify(res.ok));
        if (res.ok) {
          res.json().then(function (json) {



            if(json.code==0){
              message.success('登录成功!');
              var data = JSON.stringify(json.data)
              localStorage.setItem("userinfo",data);
              localStorage.setItem("Password",this.state.Password);

              this.context.router.push('/indata')
            }else if(json.code==10){
              message.error('用户名不存在!');
              return false;
            }else if(json.code==11){
              message.error('密码错误请重新输入!');
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

  render: function() {
    return (
      <div className={style.container}>
        <div className={style.contentio} >

          <div className={style.logo_box}>
            <h3>图灵数据欢迎你</h3>

            <div className={style.lgBody}>
              <div className={style.input_outer}>
                <span className={style.u_user}></span>
                <label>
                  <input  className={style.text} value={this.state.Name} onChange={this.handleChangeName} placeholder="请输入用户名" type="text"/>

                </label>
              </div>
              <div className={style.input_outer}>
                <span className={style.us_uer}></span>
                <label>
                  <input  className={style.text} placeholder="请输入密码" type="password" value={this.state.Password} onChange={this.handleChangeNamePassword} />
                </label>
              </div>
              <div className={style.lgbody} >

                <_button type="primary" onClick={this.handleSubmit} className={style.loginQuery}>登录</_button>

              </div>

              <div >
                <form className={style.JZpassword}>
                  <p><input onClick={this.JZpassword} type="checkbox"  name="Password" />记住账号密码</p>
                </form>
              </div>

            </div>

          </div>
        </div>
      </div>



    )
  }

});

export default Login;
