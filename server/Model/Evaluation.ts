import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import {
  AutoIncrement,
  BeforeCreate,
  BeforeUpsert,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export class Evaluation extends Model<
  InferAttributes<Evaluation>,
  InferCreationAttributes<Evaluation>
> {
  @AutoIncrement
  @PrimaryKey
  @Unique
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @Column(DataType.STRING)
  declare evaluation_title: string;

  @Column(DataType.STRING)
  declare semester: string;

  @Column(DataType.STRING)
  declare college: string;

  @Column(DataType.DATE)
  declare deadline: Date;

  @Column(DataType.STRING)
  declare link_id: CreationOptional<string>;
}
