interface User {
    email: string
    id: string
}

function createUser(): User {
  return { email: '', id: '' };
}

export { createUser };
export type{ User };
