import express from 'express';

const userRoute = express.Router();

const users = [
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
  // Add more users here if needed
];



userRoute.get('/users', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'List of users',
    data: users,
  });
});

userRoute.get('/users', (req, res) => {
  const { username } = req.query;
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

  users.splice(userIndex, 1);

  return res.status(200).json({
    status: 'success',
    message: 'User deleted',
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
  
