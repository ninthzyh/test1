import Index from '../pages/Index'
import React from "react";
import CommonRender from '../pages/CommonRender'
import { Redirect } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to={"/index/society"} />
  },
  {
    path: "/index",
    component: Index,
    children: [
      {
        path: "/index/affairs",
        render(){
          return <CommonRender configName='affairs'/>
        }
      },
      {
        path: "/index/credit",
        render(){
          return <CommonRender configName='credit'/>
        }
        
      },
      {
        path: "/index/society",
        render() {
          return <CommonRender configName='society'/>
        }
      },
      {
        path: "/index/manager",
        render(){
          return <CommonRender configName='manager'/>
        }
      },
      {
        path: "/index/emergency",
        render(){
          return <CommonRender configName='emergency' />
        }
      },
      {
        path: "/index/traffic",
        render(){
          return <CommonRender configName='traffic' />
        }
      }
    ]
  }
];

export default routes