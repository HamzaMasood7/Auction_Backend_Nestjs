import { Expose } from 'class-transformer';

export class UserSerialization {
  @Expose({ name: 'uuid' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  type: string;

  @Expose()
  phone: string;

  @Expose()
  birthDate: Date;

  @Expose()
  gender: string;

  @Expose()
  address: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
