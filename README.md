# Express-practice-server

## Description

- Server start at port: 3000
- Initial value of user list:

```js
[
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
```

## API

### GET users

**Query parameters**: username, fullname, role, project, activeYn

- If no query parameter is provided, it will return list of user.
- If the username is provided, the server only use the username for searching.
- Otherwise, it will use other provided parameter for searching.

### POST users

Insert a new use to the list.

- All fields of user are required.
- If the username is duplicated with an existing username (the user is already existed), there will be an error.

**Request body** should look like:

```json
{
  "username": "assasdasd",
  "fullname": "Le Dang Hoang An",
  "role": "Developer",
  "project": ["D&D", "777"],
  "activeYn": "Y"
}
```

### Patch users

Updates information of a specific user.

**Query parameters**: username, fullname, role, project, activeYn.
If the user is not existed, server will return an error.


### Delete users

Delete a user from the list

**Query parameters**: username

If the user is not existed, server will return an error.
