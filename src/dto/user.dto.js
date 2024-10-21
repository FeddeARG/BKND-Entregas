//src/dto/user.dto.js
export class CreateUserDTO {
    constructor({ first_name, last_name, email, password, phone, age }) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.password = password;
      this.phone = phone;
      this.age = age;
    }
  }
  
  export class UpdateUserDTO {
    constructor({ first_name, last_name, email, phone, age }) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.phone = phone;
      this.age = age;
    }
  }
  
  