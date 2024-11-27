import { Sequelize } from 'sequelize-typescript';
import { User } from '../Model/User';
import { Token } from '../Model/Token';
import { AdditionalInfo } from '../Model/AdditionalInfo';
import { Admin } from '../Model/Admin';
import { Evaluation } from '../Model/Evaluation';

const sequelize = new Sequelize({
  dialect: 'sqlite', // Specify SQLite as the database
  storage: './database.sqlite', // Path to SQLite file (relative or absolute)
  models: [User, Token, AdditionalInfo, Admin, Evaluation], // Specify the path to your models
  logging: true, // Disable logging for cleaner output
  define: { timestamps: true },
});

export default sequelize;
