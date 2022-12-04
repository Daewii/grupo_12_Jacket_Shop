module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols ={
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name:{
            type: dataTypes.STRING,
        },
        last_name:{
            type: dataTypes.STRING,
        },
        email:{
            type: dataTypes.STRING,
        },
        password:{
            type: dataTypes.STRING,
        },
        birthday:{
            type: dataTypes.DATE,
        },
        genre:{
            type: dataTypes.STRING,
        },
        profile_photo:{
            type: dataTypes.STRING,
        },
        rol_id:{
            type: dataTypes.INTEGER,
        }
    }
    let config ={
        timestamps: false,
        
    }

    const User = sequelize.define(alias,cols,config);

    User.associate = function(models){
        User.belongsTo(models.Rol,{
            as: 'rol',
            foreignKey: 'rol_id'
        })
    }
    return User;
}