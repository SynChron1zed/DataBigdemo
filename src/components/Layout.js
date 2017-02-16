/**
 * Created by Administrator on 2016/12/27.
 */
import React from 'react';
import { Link } from 'dva/router';
import styles from './Layout.less';
import {Menu,Icon} from 'antd';

const Layout = (props) => {

  return (
    <div className={styles.normal}>
      <div className={styles.header}>
        <div className={styles.inner}>
          <Link to="/">
            <img className={styles.logo} src="./public/logo1.png" />
          </Link>
          <Link activeClassName={styles.active} >
              <span className={styles.headInnev}>图灵兔数据慧眼管理系统</span>
          </Link>
          <a className={styles.github}   target="_blank">
            ,退出
          </a>
        </div>
      </div>

      <div className={styles.dataBody}>
        <Menu   className={styles.dataOne}>

          <Menu.Item  className={styles.dataTwo}  key="sub3" >
            <Link to="/indata" className={styles.todata}>
              <span className={styles.dataText}>
            <Icon type="folder" />
                {<span className={styles.dataText2}>屏幕管理</span>}
                </span>
            </Link>
          </Menu.Item>

          <Menu.Item  className={styles.dataTwo}  key="sub4" >
            <Link to="/user"  className={styles.todata}>
              <span className={styles.dataText}>
            <Icon type="appstore" />
                {<span className={styles.dataText2}>用户管理</span>}
                </span>
            </Link>
          </Menu.Item>

          <Menu.Item  className={styles.dataTwo}  key="sub5" >
            <Link to="/model"  className={styles.todata}>
              <span className={styles.dataText}>
            <Icon type="switcher" />
                {<span className={styles.dataText2}>模板管理</span>}
                </span>
            </Link>
          </Menu.Item>


          <Menu.Item  className={styles.dataTwo}  key="sub1"  disabled >
            <Link  className={styles.todata}>
              <span className={styles.dataText}>
            <Icon type="setting" />
                {<span className={styles.dataText2}>设置</span>}
                </span>
            </Link>
          </Menu.Item>

        </Menu>
      </div>



      <div className={styles.view}>
        { props.children }
      </div>
    </div>
  );

};


export default Layout;
