module.exports = (sequelize, dataTypes) => {
    let alias = 'Size';
    let cols ={
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        size:{
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config ={
        timestamps: false,
    }

    const Size = sequelize.define(alias,cols,config);

    Size.associate = function(models){
        Size.hasMany(models.Product,{
            as: 'products',
            foreignKey: 'size_id'
        })
    }
    return Size;
}