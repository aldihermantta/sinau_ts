'use strict';
import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/dbConnect";

interface RoleAttribut {
  	id?: number,
  	nama?: string | null,
  	createdAt?: String,
	updatedAt? : String
}

export interface RoleInput extends Optional<RoleAttribut, 'id'>{ }
export interface RoleOutput extends Required<RoleAttribut>{ }

class Role extends Model<RoleAttribut, RoleInput> implements RoleAttribut {
     public id!: number;
     public nama!: string;

     public readonly createdAt!: String;
     public readonly updatedAt!: String;
}


Role.init({
  	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	nama: {
		type: DataTypes.STRING,
		allowNull: true
	}
},{
     sequelize:connection,
     underscored:false,
     timestamps:true,
     tableName: 'Role'
})

export default Role;