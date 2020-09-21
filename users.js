const users = [];

const addUser = ({ id, userJoined, room }) => {
  const { user, profile } = userJoined;

  // let name = user.name.trim().toLowerCase();
  // room = room.trim().toLowerCase();

  // const existingUser = users.find(
  //   (userArr) => userArr.room === room && userArr.name === user.name
  // );

  // if (!user.name || !room) return { error: "Username and room are required." };
  // if (existingUser) return { error: "Username is taken." };

  const userAdd = { id, name: user.name, avatar: user.avatar, room, profile };
  users.push(userAdd);

  return { userAdd };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
