import Index from '../pages/Index'
import React from "react";
import Manager from '../pages/manager/widget/Index'
import Affairs from '../pages/affairs/widget/Index'
import Credit from '../pages/credit/widget/Index'
import Society from '../pages/society/widget/Index'
import Emergency from '../pages/emergency/widget/Index'
import Traffic from '../pages/traffic/widget/Index'
import { Redirect } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to={"/index/society"} />
  },
  // {
  //   path: "/manager",
  //   component: Manager
  // },
  // {
  //   path: "/credit",
  //   component: Manager
  // },
  // {
  //   path: "/credit",
  //   component: Manager
  // },
  // {
  //   path: "/affairs",
  //   component: Manager
  // },
  {
    path: "/index",
    component: Index,
    children: [
      {
        path: "/index/affairs",
        component: Affairs
      },
      {
        path: "/index/credit",
        component: Credit
      },
      {
        path: "/index/society",
        component: Society
      },
      {
        path: "/index/manager",
        component: Manager
      },
      {
        path: "/index/emergency",
        component: Emergency
      },
      {
        path: "/index/traffic",
        component: Traffic
      }
    ]
  }
];

export default routes