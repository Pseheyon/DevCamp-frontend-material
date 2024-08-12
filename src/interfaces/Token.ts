export type Ttoken = {
  id?: string;
  email: string;
  role: string;
  token: string;
};

export type TtokenSession = {
  Property: {
    user: {
      id?: string | null;
      email: string | null;
      role: string | null;
      token: string | null;
    };
  };
};
