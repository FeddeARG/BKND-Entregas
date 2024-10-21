//src/dto/auth.dto.js
export class LoginDTO {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}

export class RegisterDTO {
  constructor({ first_name, last_name, email, password, phone, age }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age;
  }
}

  