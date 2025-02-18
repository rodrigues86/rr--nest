import KSUID from 'ksuid';

export class User {
  userId?: string;
  userName: string;
  name: string;
  age: number;

  constructor({ userName, name, age }: User) {
    this.userId = KSUID.randomSync().string;
    this.userName = userName;
    this.name = name;
    this.age = age;
  }
}
