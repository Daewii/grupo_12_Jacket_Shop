module.exports = (sequelize, dataTypes) => {
    let alias = 'Color';
    let cols ={
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        color:{
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config ={
        timestamps: false,
    }

    const Color = sequelize.define(alias,cols,config);

    Color.associate = function(models){
        Color.hasMany(models.Product,{
            as: 'products',
            foreignKey: 'color_id'
        })
    }
    return Color;
}