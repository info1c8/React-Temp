const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка запроса');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Properties
  async getProperties(filters = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    return this.request(`/properties${queryString ? `?${queryString}` : ''}`);
  }

  async getProperty(id) {
    return this.request(`/properties/${id}`);
  }

  async createProperty(propertyData, images) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(propertyData));
    
    if (images) {
      images.forEach(image => {
        formData.append('images', image);
      });
    }

    return this.request('/properties', {
      method: 'POST',
      headers: {},
      body: formData,
    });
  }

  async updateProperty(id, propertyData, images) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(propertyData));
    
    if (images) {
      images.forEach(image => {
        formData.append('images', image);
      });
    }

    return this.request(`/properties/${id}`, {
      method: 'PUT',
      headers: {},
      body: formData,
    });
  }

  async deleteProperty(id) {
    return this.request(`/properties/${id}`, {
      method: 'DELETE',
    });
  }

  async getFeaturedProperties() {
    return this.request('/properties/featured/list');
  }

  // Users
  async register(userData) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }
}

export default new ApiService();