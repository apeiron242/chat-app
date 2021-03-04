const users: object[] = [];

function userJoin(id: string, username: string, room: string) {
  const user = {
    id,
    username,
    room,
  };
  return user;
}

export default userJoin;
