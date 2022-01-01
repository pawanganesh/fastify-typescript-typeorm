export interface IBody {
  email: string;
  password: string;
}

export interface IRegisterBody extends IBody {
  full_name: string;
}

export interface IUserRequest {
  id: string;
  email: string;
}

export interface IPermission {
  adminOnly?: boolean;
  loggedOutOnly?: boolean;
  allowAny?: boolean;
}

export interface IToken {
  id: string;
  email: string;
}
