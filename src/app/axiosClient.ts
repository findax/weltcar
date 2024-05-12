import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Bearer:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vNDkuMTIuMjMwLjE5MTo4MDgxL2p3dC9sb2dpbiIsImlhdCI6MTcxNTUwMDMxNiwiZXhwIjoxNzE4MDkyMzE2LCJuYmYiOjE3MTU1MDAzMTYsImp0aSI6IkpNSGhhNW5zRmw0Q3RyUU4iLCJzdWIiOiIyIiwicHJ2IjoiNzNiMTI0NzEwMTk3ZmY1NGEzYWVlYzc3ZWI1NzU4NzFjYjg0MjdmNiJ9.LQbHaKgn0VPS8t-EBv95QnxnJ6ao9zXyjU3d9hck7mw',
  },
  withCredentials: true,
});

export default instance;
