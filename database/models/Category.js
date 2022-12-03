module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols ={
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category:{
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config ={
        timestamps: false,
    }

    const Category = sequelize.define(alias,cols,config);

    Category.associate = function(models){
        Category.hasMany(models.Product,{
            as: 'products',
            foreignKey: 'category_id'
        })
    }
    return Category;
}