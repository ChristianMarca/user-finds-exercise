export type User = {
  email: string;
  id: number;
  name: string;
  pwdHash: string;
  role: number;
};

export type Location = {
  weather: string
  rh2m: string
  prec_type: string
}
