// <<<<<<< HEAD
// Api.js
import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const token = localStorage.getItem("token");
console.log(token);

const getRequest = (url, token) => {
  return new Promise((resolve) => {
    axios({
      method: "get",
      url,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        resolve(error.response.data);
      });
  });
};
export const Api = {
  // -------------- login apis ------------------//
  login: async (mobile, password) => {
    try {
      const response = await axios.post(`${base_url}/api/user/login`, {
        mobile,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // -------------- Users apis ------------------//
  getAllUsers: async (page) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(`${base_url}/api/user/getAllUsers?page=${page}&limit=10`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUser: async (token) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(`${base_url}/api/user/`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  UserAdminStatus: async (userId) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/user/UserAdminStatus`,
        {
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  CourseActiveStatus: async (course_id) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/teacher/courseActiveStatus`,
        {
          course_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  UpdateMobileAdmin: async (UserId, mobile) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/user/UpdateMobileAdmin`,
        {
          UserId,
          mobile,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateTeacherStatus: async (payload) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/teacher/updateTeacherStatus`,
        {
          teacher_id: payload.teacher_id,
          verifyStatus: payload.approvalStatus,
          type: payload.selectedPaymentType,
          reject_msg: payload.reject_msg,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // -------------- Teacher Payments apis ------------------//
  getMasterAndAdvancePayments: async () => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(`${base_url}/api/user/getMasterAndAdvancePayments`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getSinglePayments: async () => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(`${base_url}/api/user/getSinglePayments`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getGroupPayments: async () => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(`${base_url}/api/user/getGroupPayments`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateAdvanceSinglePayment: async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/api/user/updateAdvanceSinglePayment`, // API endpoint URL
        data, // Data to send in the request body
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Throw the error to be handled by the caller
    }
  },
  updateAdvanceGroupPayment: async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/api/user/updateAdvanceGroupPayment`, // API endpoint URL
        data, // Data to send in the request body
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Throw the error to be handled by the caller
    }
  },

  updateMasterSinglePayment: async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/api/user/updateMasterSinglePayment`, // API endpoint URL
        data, // Data to send in the request body
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Throw the error to be handled by the caller
    }
  },
  updateMasterGroupPayment: async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/api/user/updateMasterGroupPayment`, // API endpoint URL
        data, // Data to send in the request body
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Throw the error to be handled by the caller
    }
  },

  updateUserPayment: async (data) => {
    try {
      const response = await axios.put(
        `${base_url}/api/user/updateUserPayment`, // API endpoint URL
        data, // Data to send in the request body
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Throw the error to be handled by the caller
    }
  },

  updateTeacherPaymentStatus: async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/api/user/addTeacherPaymentStatus`, // API endpoint URL
        data, // Data to send in the request body
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Throw the error to be handled by the caller
    }
  },

  getTeacherPaymentStatuses: async (page, rowsPerPage) => {
    try {
      const response = await axios.get(`${base_url}/api/user/getTeacherPaymentStatuses`, {
        params: {
          page,
          limit: rowsPerPage,
        },
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTeacherPaymentStatusById: async (teacher_id) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(
        `${base_url}/api/user/getTeacherPaymentStatusById/${teacher_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTeacherProfileDataByTeacherId: async (teacher_id) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(
        `${base_url}/api/teacher/getTeacherProfileDataByTeacherId/${teacher_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // getTeacherProfileDataByTeacherId: async (teacher_id) => {
  //   try {
  //     // Perform an API request to create a user here
  //     const response = await axios.get(
  //       `${base_url}/api/user/getTeacherProfileDataByTeacherId/${teacher_id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-API-KEY": API_KEY,
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // -------------- Users apis ------------------//
  getAllTeachers: async (page, rowsPerPage) => {
    try {
      const response = await axios.get(`${base_url}/api/user/getAllTeachersByAdmin`, {
        params: {
          page,
          limit: rowsPerPage, // Assuming rowsPerPage corresponds to limit
        },
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllTeachersInAdmin: async () => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(`${base_url}/api/user/getAllTeachersInAdmin`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // -------------- Bank Details Users apis ------------------//
  getBankDetailsAdmin: async (teacher_id) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(`${base_url}/api/user/getBankDetailsAdmin/${teacher_id}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // -------------- Dashboard apis ------------------//
  getAllDashboardCount: async () => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(`${base_url}/api/user/getAllDashboardCount`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("frontend :- ", token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // -------------- Category apis ------------------//
  addCategory: async (category_name, token) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/category/createCategory`,
        {
          category_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllCategoryAdmin: async (page) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/category/GetAllCategoriesAdminpage`,
        { page },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllCategory: async () => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(
        `${base_url}/api/category/GetAllCategoriesAdmin`,

        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  UpdateCategory: async (formData) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(`${base_url}/api/category/UpdateCategory`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // --------------Sub Categories apis ------------------//
  addSubCategory: async (formData, token) => {
    try {
      const response = await axios.post(`${base_url}/api/subCategory/createSubCategory`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  UpdateSubCategory: async (formData) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(`${base_url}/api/subCategory/UpdateSubCategory`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getSubCategoryByCategoryIdInAdmin: async (category_id) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(
        `${base_url}/api/subCategory/getSubCategoryByCategoryIdInAdmin/${category_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // --------------Video apis ------------------//
  getAllVideo: async (page, search, Short) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/video/getPaginatedVideosAdmin`,
        {
          page,
          search,
          Short,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  VideoAdminStatus: async (videoId) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/video/VideoAdminStatus`,
        {
          videoId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  VideoViewUserList: async (VideoId, page) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/video/VideoViewUserList`,
        {
          VideoId,
          page,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // --------------Reels apis ------------------//
  getAllReels: async (page, search, Short) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/reel/getPaginatedReelsAdmin`,
        {
          page,
          search,
          Short,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  ReelsAdminStatus: async (reelsId) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/reel/ReelsAdminStatus`,
        {
          reelsId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  ReelViewUserList: async (ReelId, page) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/reel/ReelViewUserList`,
        {
          ReelId,
          page,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // --------------Timeline apis ------------------//
  getAllTimeline: async (page, search, Short) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/timeline/getPaginatedPostTimelinesAdmin`,
        {
          page,
          search,
          Short,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  TimelineAdminStatus: async (timelineId) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/timeline/TimelineAdminStatus`,
        {
          timelineId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // --------------Jobs apis ------------------//
  getAllJob: async (page, search) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/job/getPaginatedPostJobsAdmin`,
        {
          page,
          search,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  JobAdminStatus: async (jobId) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/job/JobAdminStatus`,
        {
          jobId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // -------------- Contact apis ------------------//
  getAllContact: async (page, search) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/comman/getAllContact`,
        {
          page,
          search,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // -------------- Course apis ------------------//
  getAllCourse: async (page) => {
    try {
      // Perform an API request to get all courses with pagination
      const response = await axios.get(`${base_url}/api/user/getAllCourse`, {
        params: page,
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCoursesByTeacherId: async (teacher_id) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(`${base_url}/api/user/getCoursesByTeacherId/${teacher_id}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCourseDates: async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/api/teacher/updateCourseDates`, // API endpoint URL
        data, // Data to send in the request body
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Throw the error to be handled by the caller
    }
  },

  // -------------- Report apis ------------------//
  getAllReports: async (page, search) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/comman/getAllReports`,
        {
          page,
          search,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // -------------- Hire apis ------------------//
  getAllHire: async (page, search) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/user/getAllHireList`,
        {
          page,
          search,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  HirePaymentUpdateStatus: async (hireId) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/user/HirePaymentUpdateStatus`,
        {
          hireId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // -------------- Transaction apis ------------------//
  getAlltransactionList: async (page, rowsPerPage) => {
    try {
      // Perform an API request to fetch all transactions
      const response = await axios.get(`${base_url}/api/transaction/getAllTransactions`, {
        params: {
          page,
          limit: rowsPerPage,
        },
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllUserTransactions: async (page, search, user_id) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/transaction/getAllUserTransactions`,
        {
          page,
          search,
          user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // -------------- Comapny Details apis ------------------//
  addPrivacyPolicy: async (content, token) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/CompanyDetails/addPrivacyPolicy`,
        {
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getPrivacyPolicy: async (token) => {
    try {
      // Perform an API request to get the privacy policy content
      const response = await axios.get(`${base_url}/api/CompanyDetails/getPrivacyPolicy`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addAboutUs: async (content, token) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/CompanyDetails/addAboutUs`,
        {
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAboutUs: async (token) => {
    try {
      // Perform an API request to get the privacy policy content
      const response = await axios.get(`${base_url}/api/CompanyDetails/getAboutUs`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addTermsConditions: async (content, token) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.post(
        `${base_url}/api/CompanyDetails/addTermsConditions`,
        {
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getTermsConditions: async (token) => {
    try {
      // Perform an API request to get the privacy policy content
      const response = await axios.get(`${base_url}/api/CompanyDetails/getTermsConditions`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // -------------- Notification List apis ------------------//
  NotificationListAdmin: async (page) => {
    try {
      // Perform an API request to create a user here
      const response = await axios.get(
        `${base_url}/api/admin/NotificationListAdmin/${page}`,

        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTeacherNotificationsByAdmin: async (page, rowsPerPage) => {
    try {
      const response = await axios.get(
        `${base_url}/api/teacherNotification/getTeacherNotificationsByAdmin`,
        {
          params: {
            page,
            limit: rowsPerPage, // Assuming rowsPerPage corresponds to limit
          },
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
