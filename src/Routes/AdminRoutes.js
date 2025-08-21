// <<<<<<< HEAD
import React, { useEffect } from "react";

// Material Dashboard 2 React layouts
import Dashboard from "Admin/layouts/dashboard";
import Tables from "Admin/layouts/tables";
import Teacher_Tables from "Admin/layouts/teacher_tables";
import Teacher_Course_Details from "Admin/layouts/teacher_course_details";

import Category_tables from "Admin/layouts/category_tables";
// import Video_tables from "Admin/layouts/video_tables";
import Post_tables from "Admin/layouts/post_tables";
import Reels_tables from "Admin/layouts/reel_tables";
import Job_tables from "Admin/layouts/job_tables";
import Contact_tables from "Admin/layouts/contact_tables";
import Course_tables from "Admin/layouts/course_list";
import Update_Payments from "Admin/layouts/update_payments";
import Hire_tables from "Admin/layouts/hire_tables";
import Report_tables from "Admin/layouts/report_tables";
import Transaction_tables from "Admin/layouts/transaction_tables";
import Home from "Website/page/home";
import Profile from "Admin/layouts/profile";
import Addcategory from "Admin/layouts/addcategory";
import Addsubcategory from "Admin/layouts/addsubcategory";
import Addprivacypolicy from "Admin/layouts/addPrvicayPolicy";
import Addaboutus from "Admin/layouts/addAboutUs";
import TeacherPayStatus from "Admin/layouts/teacherPayStatus";
import Addtermsconditions from "Admin/layouts/addTC";
import SignIn from "Admin/layouts/authentication/sign-in";
import User_Transaction_tables from "Admin/layouts/user_transaction_tables";
// import Notification_Tables from "Admin/layouts/components/notification";
import View_Count_tables from "Admin/layouts/components/view_count";
import Teacher_Pay_List from "Admin/layouts/teacher_pay_list";
import SubCategoryList from "Admin/layouts/subCategoryList";
import Teacher_Notification from "Admin/layouts/teacher_notification";
// import TestTable from "Admin/layouts/testTable";

import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Sign in",
    key: "Home",
    icon: <Icon fontSize="small">Home</Icon>,
    route: "/",
    component: <Home />,
  },
  {
    type: "collapse",
    name: "Sign in",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/admin",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Students List",
    key: "tables",
    icon: <Icon fontSize="small">User</Icon>,
    route: "/tables",
    component: <Tables />,
  },

  {
    type: "collapse",
    name: "Teachers List",
    key: "teacher-tables",
    icon: <Icon fontSize="small">User</Icon>,
    route: "/teacher-tables",
    component: <Teacher_Tables />,
  },
  // {
  //   type: "collapse",
  //   name: "User List",
  //   key: "teacher-course-details",
  //   icon: <Icon fontSize="small">User</Icon>,
  //   route: "/teacher-course-details/:teacher_id",
  //   component: <Teacher_Course_Details />,
  // },
  // {
  //   type: "collapse",
  //   name: "Add Category",
  //   key: "add-category",
  //   icon: <Icon fontSize="small">add</Icon>,
  //   route: "/add-category",
  //   component: <Addcategory />,
  // },
  // {
  //   type: "collapse",
  //   name: "Add Sub Category",
  //   key: "add-sub-category",
  //   icon: <Icon fontSize="small">add</Icon>,
  //   route: "/add-sub-category",
  //   component: <Addsubcategory />,
  // },
  {
    type: "collapse",
    name: "Category List",
    key: "category-list",
    icon: <Icon fontSize="small">leaderboard</Icon>,
    route: "/category-list",
    component: <Category_tables />,
  },
  // {
  //   type: "collapse",
  //   name: "Video List",
  //   key: "video-list",
  //   icon: <Icon fontSize="small">leaderboard</Icon>,
  //   route: "/video-list",
  //   component: <Video_tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Post Timeline List",
  //   key: "post-list",
  //   icon: <Icon fontSize="small">leaderboard</Icon>,
  //   route: "/post-list",
  //   component: <Post_tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Quicky List",
  //   key: "reels-list",
  //   icon: <Icon fontSize="small">leaderboard</Icon>,
  //   route: "/reels-list",
  //   component: <Reels_tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Job List",
  //   key: "job-list",
  //   icon: <Icon fontSize="small">leaderboard</Icon>,
  //   route: "/job-list",
  //   component: <Job_tables />,
  // },
  {
    type: "collapse",
    name: "Contact us List",
    key: "contact-list",
    icon: <Icon fontSize="small">leaderboard</Icon>,
    route: "/contact-list",
    component: <Contact_tables />,
  },
  {
    type: "collapse",
    name: "Course List",
    key: "course-list",
    icon: <Icon fontSize="small">leaderboard</Icon>,
    route: "/course-list",
    component: <Course_tables />,
  },
  // {
  //   type: "collapse",
  //   name: "Test Table",
  //   key: "test-teble",
  //   icon: <Icon fontSize="small">leaderboard</Icon>,
  //   route: "/test-teble",
  //   component: <TestTable />,
  // },
  {
    type: "collapse",
    name: "Payments List",
    key: "update_payments",
    icon: <Icon fontSize="small">leaderboard</Icon>,
    route: "/update_payments",
    component: <Update_Payments />,
  },
  {
    type: "collapse",
    name: "Notification List",
    key: "teacher_notification",
    icon: <Icon fontSize="small">leaderboard</Icon>,
    route: "/teacher_notification",
    component: <Teacher_Notification />,
  },
  // {
  //   type: "collapse",
  //   name: "Report List",
  //   key: "report-list",
  //   icon: <Icon fontSize="small">leaderboard</Icon>,
  //   route: "/report-list",
  //   component: <Report_tables />,
  // },
  {
    type: "collapse",
    name: "Transaction List",
    key: "transaction-list",
    icon: <Icon fontSize="small">leaderboard</Icon>,
    route: "/transaction-list",
    component: <Transaction_tables />,
  },
  {
    type: "collapse",
    name: "Teacher Pay List",
    key: "teacher-pay-list",
    icon: <Icon fontSize="small">leaderboard</Icon>,
    route: "/teacher-pay-list",
    component: <Teacher_Pay_List />,
  },
  {
    type: "collapse",
    name: "User Transaction List",
    key: "user-transaction-list",
    icon: <Icon fontSize="small">leaderboard</Icon>,
    route: "/user-transaction-list/:user_id",
    component: <User_Transaction_tables />,
  },
  // {
  //   type: "collapse",
  //   name: "Notification List",
  //   key: "notification-list",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notification-list",
  //   component: <Notification_Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "View Count List",
  //   key: "view-Count-list",
  //   icon: <Icon fontSize="small">leaderboard</Icon>,
  //   route: "/view-count-list/:VideoId/:Type",
  //   component: <View_Count_tables />,
  // },

  // {
  //   type: "collapse",
  //   name: "Hire List",
  //   key: "hire-list",
  //   icon: <Icon fontSize="small">leaderboard</Icon>,
  //   route: "/hire-list",
  //   component: <Hire_tables />,
  // },
  {
    type: "collapse",
    name: "Add Privacy Policy",
    key: "add-privacy-policy",
    icon: <Icon fontSize="small">add</Icon>,
    route: "/add-privacy-policy",
    component: <Addprivacypolicy />,
  },
  {
    type: "collapse",
    name: "Add About Us",
    key: "add-about-us",
    icon: <Icon fontSize="small">add</Icon>,
    route: "/add-about-us",
    component: <Addaboutus />,
  },
  // {
  //   type: "collapse",
  //   name: "TeacherPayStatus",
  //   key: "teacher-pay-status",
  //   icon: <Icon fontSize="small">add</Icon>,
  //   route: "/teacher-pay-status/:teacher_id",
  //   component: <TeacherPayStatus />,
  // },
  {
    type: "collapse",
    name: "Add Terms Conditions",
    key: "add-terms-conditions",
    icon: <Icon fontSize="small">add</Icon>,
    route: "/add-terms-conditions",
    component: <Addtermsconditions />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];

export default routes;
