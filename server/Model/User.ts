import bycrpt from 'bcrypt';
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  BeforeCreate,
  BeforeUpdate,
  AutoIncrement,
  PrimaryKey,
  IsEmail,
  AllowNull,
} from 'sequelize-typescript';
import userService from '../service/userService';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  where,
} from 'sequelize';

@Table({
  validate: {
    validateEmailAddress() {
      let user = this as unknown as User;

      if (
        user.username.endsWith('buksu.edu.ph') ||
        user.username.endsWith('gmail.com')
      ) {
        return;
      }

      throw new Error('invalid user');
    },
  },
})
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: CreationOptional<number>;
  @IsEmail
  @Column({
    type: DataType.STRING,
  })
  declare username: string;
  @Column({
    type: DataType.STRING,
  })
  declare passwordHash: CreationOptional<string>;
  @Column({
    type: DataType.STRING,
  })
  declare role: CreationOptional<string>;

  @Column({
    type: DataType.STRING,
  })
  declare picture: string;

  @AllowNull
  @Column({
    type: DataType.STRING,
  })
  declare name: CreationOptional<string>;

  @CreatedAt
  declare creationDate: CreationOptional<Date>;

  @BeforeUpdate
  @BeforeCreate
  static hashPassword(User: User) {
    User.passwordHash = userService._hashPassword(
      User.passwordHash,
      User.username
    );
  }

  @BeforeUpdate
  @BeforeCreate
  static defineRole(User: User) {
    User.role = userService._identifyRole(User.username);
  }
}
