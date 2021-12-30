interface User {
    username: string
    email: string
    id: string
}
function createUser(): User{
    return {username: "", email: "", id: ""};
}

export { createUser }
export type{ User }