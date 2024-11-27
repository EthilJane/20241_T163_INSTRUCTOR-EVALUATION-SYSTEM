import bycrpt from 'bcrypt';
import {
  Table,
  Model,
  DataType,
  CreatedAt,
  BeforeCreate,
  BeforeUpdate,
  AutoIncrement,
  ForeignKey,
  Default,
  Column,
  AllowNull,
  PrimaryKey,
} from 'sequelize-typescript';

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  where,
} from 'sequelize';

@Table({ timestamps: true })
export class Token extends Model<
  InferAttributes<Token>,
  InferCreationAttributes<Token>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;
  @Column(DataType.STRING)
  declare username: string;

  @Column(DataType.TEXT)
  declare RefreshToken: string;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;
  @Column(DataType.TIME)
  declare expiredDate: number;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare revoked: CreationOptional<boolean>;
}
