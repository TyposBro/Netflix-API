export const extract = (users) => {
  let list = [];
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const { password, ...info } = user._doc;

    list = [...list, info];
  }
  return list;
};
