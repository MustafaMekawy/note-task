export interface UserInterface {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  resetPasswordToken?: string;
  resetExpiresTime?: Date;
  createdAt: Date;
  updatedAt?: Date;
}
