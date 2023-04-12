export type user = {
  id: string;
  name: string;
  canEdit: boolean;
  perms: string[];
  isAdmin: boolean;
};

export interface userCtx extends user {
  token: string;
}

export type exampleUsers = () => user[];
