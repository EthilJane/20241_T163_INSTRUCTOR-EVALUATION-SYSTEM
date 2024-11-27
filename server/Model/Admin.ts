import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import userService from '../service/userService';

@Table({ timestamps: true })
export class Admin extends Model<
  InferAttributes<Admin>,
  InferCreationAttributes<Admin>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @Column(DataType.STRING)
  declare username: string;

  @Column(DataType.STRING)
  declare passwordHash: string;

  @BeforeCreate
  static hashPassword(Admin: Admin) {
    Admin.passwordHash = userService._hashPassword(
      Admin.passwordHash,
      Admin.username
    );
  }
}
