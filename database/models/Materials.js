module.exports = (sequelize, dataTypes) => {
    let alias = 'Material';
    let cols ={
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        material:{
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config ={
        timestamps: false,
    }

    const Material = sequelize.define(alias,cols,config);

    Material.associate = function(models){
        Material.hasMany(models.Product,{
            as: 'products',
            foreignKey: 'material_id'
        })
    }
    return Material;
}