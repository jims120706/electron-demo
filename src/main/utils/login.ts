class Login {
  name: string
  password: string

  constructor(name: string, password: string) {
    this.name = name
    this.password = password
  }
}


export default new Login('dog', 'dog')