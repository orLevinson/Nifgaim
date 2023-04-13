export type user = {
  id: string;
  name: string;
  canEdit: boolean;
  perm: string[];
  isAdmin: boolean;
};

export interface userInfo extends user {
  token: string;
  success?: boolean;
}

export interface userCtx extends userInfo {
  register: (
    username: string,
    password: string,
    perm: string[],
    name: string
  ) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export type exampleUsers = () => user[];
