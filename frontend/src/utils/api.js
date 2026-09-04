const API_URL = "http://localhost:5000";

// =========================
// LOGOUT
// =========================

const forceLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");

  window.location.href = "/login";
};

// =========================
// AUTH HEADERS
// =========================

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// =========================
// GLOBAL REQUEST
// =========================

const request = async (url, options = {}) => {
  const response = await fetch(url, options);

  // JWT expired / invalid
  if (response.status === 401) {
    forceLogout();

    throw new Error("Session kamu sudah berakhir. Silakan login kembali.");
  }

  return response;
};

// =========================
// API
// =========================

export const api = {
  // =========================
  // PROJECTS
  // =========================

  getProjects: async () => {
    return request(`${API_URL}/api/projects`);
  },

  createProject: async (data) => {
    return request(`${API_URL}/api/projects`, {
      method: "POST",

      headers: getAuthHeaders(),

      body: JSON.stringify(data),
    });
  },

  updateProject: async (id, data) => {
    return request(`${API_URL}/api/projects/${id}`, {
      method: "PUT",

      headers: getAuthHeaders(),

      body: JSON.stringify(data),
    });
  },

  deleteProject: async (id) => {
    return request(`${API_URL}/api/projects/${id}`, {
      method: "DELETE",

      headers: getAuthHeaders(),
    });
  },

  // =========================
  // SKILLS
  // =========================

  getSkills: async () => {
    return request(`${API_URL}/api/skills`);
  },

  createSkill: async (data) => {
    return request(`${API_URL}/api/skills`, {
      method: "POST",

      headers: getAuthHeaders(),

      body: JSON.stringify(data),
    });
  },

  updateSkill: async (id, data) => {
    return request(`${API_URL}/api/skills/${id}`, {
      method: "PUT",

      headers: getAuthHeaders(),

      body: JSON.stringify(data),
    });
  },

  deleteSkill: async (id) => {
    return request(`${API_URL}/api/skills/${id}`, {
      method: "DELETE",

      headers: getAuthHeaders(),
    });
  },

  // =========================
  // DASHBOARD
  // =========================

  getDashboardStats: async () => {
    return request(`${API_URL}/api/dashboard/stats`, {
      headers: getAuthHeaders(),
    });
  },

  // =========================
  // MESSAGES
  // =========================

  getMessages: async () => {
    return request(`${API_URL}/api/contact`, {
      headers: getAuthHeaders(),
    });
  },

  // =========================
  // CONTACT
  // =========================

  sendContact: async (data) => {
    return request(`${API_URL}/api/contact`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
  },
};
