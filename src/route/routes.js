import Index from '../pages/Index'
import React from "react";
import Manager from '../pages/manager/widget/Index'
import { Redirect } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to={"/index/credit"} />
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
        component: Manager
      },
      {
        path: "/index/credit",
        component: Manager
      },
      {
        path: "/index/society",
        component: Manager
      },
      {
        path: "/index/manager",
        component: Manager
      },
      {
        path: "/index/emergency",
        component: Manager
      },
      {
        path: "/index/traffic",
        component: Manager
      }
    ]
  }
];

export default routes