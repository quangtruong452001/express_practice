import express from 'express';

const userRoute = express.Router();

let users = [
  {
    username: 'anle',
    fullname: 'Le Dang Hoang An',
    role: 'Developer',
    project: ['D&D', 'Tiger'],
    activeYn: 'Y',
  },
  {
    username: 'johnsmith',
    fullname: 'John Smith',
    role: 'Designer',
    project: ['Web Design', 'UI/UX'],
    activeYn: 'Y',
  },
  {
    username: 'janedoe',
    fullname: 'Jane Doe',
    role: 'Product Manager',
    project: ['Mobile App', 'Analytics'],
    activeYn: 'N',
  },
];

// search with multiple query parameters
userRoute.get('/users', (req, res) => {
  const { username, fullname, role, project, activeYn } = req.query;

  // If no query parameters are provided, return the full list of users
  if (!username && !fullname && !role && !project && !activeYn) {
    return res.status(200).json({
      status: 'success',
      message: 'List of users',
      data: users,
    });
  }

  // If query parameters username are provided 
  if (username) {
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'User details',
      data: user,
    });
  }

  let info = {};

  if (fullname) {
    info.fullname = fullname;
  }

  if (role) {
    info.role = role;
  }

  if (project) {
    info.project = project;
  }

  if (activeYn) {
    info.activeYn = activeYn;
  }

  const filteredUsers = users.filter((u) => {
    for (let key in info) {
      // project
      if (key === 'project') {
        if (!u[key].includes(info[key])) {
          return false;
        }
        continue;
      }
      if (u[key] !== info[key]) {
        return false;
      }
    }
    return true;
  });

  if (filteredUsers.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'User not found',
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'User details',
    data: filteredUsers,
  });
});

userRoute.post('/users', (req, res) => {
  const { username, fullname, role, project, activeYn } = req.body;

  if (!username || !fullname || !role || !project || !activeYn) {
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required',
    });
  }

  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    return res.status(400).json({
      status: 'error',
      message: 'User already exists',
    });
  }

  const newUser = {
    username,
    fullname,
    role,
    project,
    activeYn,
  };

  users.push(newUser);

  return res.status(201).json({
    status: 'success',
    message: 'User added',
    data: newUser,
  });
});

userRoute.delete('/users', (req, res) => {
  const { username } = req.query;
  const userIndex = users.findIndex((u) => u.username === username);

  if (userIndex === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  const user = users.splice(userIndex, 1);

  return res.status(200).json({
    status: 'success',
    message: 'User deleted',
    data: user,
  });
});

userRoute.patch('/users', (req, res) => {
  const { username } = req.query;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  const { fullname, role, project, activeYn } = req.body;
  user.fullname = user.fullname;

  if (fullname) {
    user.fullname = fullname;
  }

  if (role) {
    user.role = role;
  }

  if (project) {
    user.project = project;
  }

  if (activeYn) {
    user.activeYn = activeYn;
  }
  // update user in the array
  const userIndex = users.findIndex((u) => u.username === username);
  users[userIndex] = user;

  return res.status(200).json({
    status: 'success',
    message: 'User updated',
    data: user,
  });
});

export default userRoute;
