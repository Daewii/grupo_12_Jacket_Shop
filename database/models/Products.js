module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols ={
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING,
            allowNull: false
        },
        description:{
            type: dataTypes.STRING,
        },
        price:{
            type: dataTypes.INTEGER,
        },
        material_id:{
            type: dataTypes.INTEGER,
        },
        color_id:{
            type: dataTypes.INTEGER,
        },
        size_id:{
            type: dataTypes.INTEGER,
        },
        category_id:{
            type: dataTypes.INTEGER,
        }
    }
    let config ={
        timestamps: false,
    }

    const Product = sequelize.define(alias,cols,config);

    Product.associate = function(models){
        Product.belongsTo(models.Material,{
            as: 'material',
            foreignKey: 'material_id'
        })
        Product.belongsTo(models.Color,{
            as: 'color',
            foreignKey: 'color_id'
        })
        Product.belongsTo(models.Size,{
            as: 'size',
            foreignKey: 'size_id'
        })
        Product.belongsTo(models.Category,{
            as: 'category',
            foreignKey: 'category_id'
        })
        Product.hasMany(models.ProductImage,{
            as:'productImages',
            foreignKey:'product_id'
        })
    }
    return Product;
}