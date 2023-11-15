'use strict';
import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/dbConnect";
import Role from "./role";

interface UserAttribut {
  	id?: number,
  	username?: string | null,
  	nama?: string | null,
	email?: string | null,
	password?: string | null,
	// id_role?: number,
  	// createdAt?: String,
	// updatedAt? : String
}

export interface UserInput extends Optional<UserAttribut, 'id'>{ }
export interface UserOutput extends Required<UserAttribut>{ }

class User extends Model<UserAttribut, UserInput> implements UserAttribut{
  	public id!: number;
	public username!: string;
	public nama!: string;
	public email!: string;
	public password!: string;
	// public id_role?: number;
  
	// public readonly createdAt!: String;
	// public readonly updatedAt! : String;
}

User.init({
  	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	username: {
		type: DataTypes.STRING,
		allowNull: true
	},
	nama: {
		type: DataTypes.STRING,
		allowNull: true
	},
	email: {
		type: DataTypes.STRING,
		allowNull: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: true
	},
	// id_role:{
	// 	type:DataTypes.NUMBER,
	// 	allowNull:false
	// }
},{
	sequelize:connection,
	underscored:false,
	timestamps:true,
	tableName: 'tr_pengguna'
})

// User.belongsTo(Role, { foreignKey: "id_role", as: 'role' });

export default User;