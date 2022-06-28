export default function authHeader() {
    const token = localStorage.getItem('token');
    if (token) {
      return {'headers': { 'x-access-token': token }};
    } else {
      return {undefined};
    }
  }