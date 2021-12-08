export const extract = (users) => {
  let list = [];
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    delete user.password;

    list = [...list, user];
  }
  return list;
};
