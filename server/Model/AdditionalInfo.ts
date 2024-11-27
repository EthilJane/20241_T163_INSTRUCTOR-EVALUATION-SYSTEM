import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
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
import { Token } from './Token';
import { User } from './User';

@Table({ timestamps: true })
export class AdditionalInfo extends Model<
  InferAttributes<AdditionalInfo>,
  InferCreationAttributes<AdditionalInfo>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @Unique
  @Column(DataType.STRING)
  @ForeignKey(() => User)
  declare username: string;
  @AllowNull
  @Column(DataType.INTEGER)
  declare employee_id: CreationOptional<number>;
  @AllowNull
  @Column(DataType.STRING)
  declare office_type: CreationOptional<string>;
  @Default('Department of technology')
  @Column(DataType.STRING)
  declare department: CreationOptional<string>;
  @AllowNull
  @Column(DataType.STRING)
  declare subject_code: string;
  @Default('College of technology')
  @Column(DataType.STRING)
  declare college: string;
  @AllowNull
  @Column(DataType.NUMBER)
  declare total_student: number;
}
