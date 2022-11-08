module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol';
    let cols ={
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        rol:{
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config ={
        timestamps: false,
    }

    const Rol = sequelize.define(alias,cols,config);

    Rol.associate = function(models){
        Rol.hasMany(models.User,{
            as: 'users',
            foreignKey: 'rol_id'
        })
    }
    return Rol;
}