import {Table,Column,Model,DataType, PrimaryKey} from "sequelize-typescript"

@Table({
  tableName: "users", //table name
  modelName: "User", // project vitra mathi ko table lai asess garne name
  timestamps: true,
})
// class model ma vako kura taneko
class user extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue:DataType.UUIDV4
  })
  declare id:string
  @Column({
    type: DataType.STRING,
  })
  declare userName: string;
  @Column({
    type: DataType.STRING,
  })
  declare password: string;
  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    type: DataType.ENUM("teacher", "institude", "super_admin", "student"),
    defaultValue: "student",
  })
  declare role: string; 
  @Column ({
    type :DataType.STRING
  })
  declare currentInstituteNumber :string;
}
export default user