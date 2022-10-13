export interface User {
  studentId?: string;
  name?: string;
  nickname?: string;
  //birthdate: Date;
  faculty?: string;
  tel?: string;
  email?: string;
}

export interface LoginInput {
  studentId: string;
  password: string;
}

export interface RegisterInput {
  studentId?: string;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  //birthdate: Date;
  faculty?: string;
  tel?: string;
  email?: string;
  password?: string;
  cfPassword?: string;
}

export interface RegisterInputAPI {
    studentId?: string;
    name?: string;
    nickname?: string;
    //birthdate: Date;
    faculty?: string;
    tel?: string;
    email?: string;
    password?: string;
  }
  
