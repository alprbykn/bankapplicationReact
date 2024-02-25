const AuthService = {

    subscribers: [],

    subscribe: (subscriber) => {
      AuthService.subscribers.push(subscriber);
    },
  
    unsubscribe: (subscriber) => {
      AuthService.subscribers = AuthService.subscribers.filter((s) => s !== subscriber);
    },
  
    notifySubscribers: () => {
      AuthService.subscribers.forEach((subscriber) => subscriber());
    },

    login: async (username, password) => {
  try {
    // Simulated login logic, replace with actual implementation
    if (username === 'aby' && password === 'sa') {
      localStorage.setItem('token', "alper");
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
},
    register: async (username, password) => {
      // Simulated registration logic, replace with actual implementation
      return true;
    },
    logout: () => {
      localStorage.removeItem('token');
    },
    isAuthenticated: () => {
      return localStorage.getItem('token') == "alper"
    }
  };
  
  export default AuthService;
  