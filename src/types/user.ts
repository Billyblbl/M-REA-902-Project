interface ImgReference {
  url : string,
  path : string,
}

interface UserImgData {
  urls : ImgReference[],
  profileUrl : ImgReference | null,
}

interface User {
    email: string
    id: string,
    imgs : UserImgData
  }

function createUser(): User {
  return { email: '', id: '', imgs: { urls: [], profileUrl: null } };
}

export { createUser };
export type{ User };
export type{ UserImgData };
export type{ ImgReference };
