module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductImage';
    let cols ={
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        productImage:{
            type: dataTypes.STRING,
            allowNull: false
        },
        product_id:{
            type: dataTypes.INTEGER
        }

    }
    let config ={
        timestamps: false,
    }

    const ProductImage = sequelize.define(alias,cols,config);

    ProductImage.associate = function(models){
        ProductImage.belongsTo(models.Product,{
            as: 'ProductImage',
            foreignKey: 'image_id'
        })
    }
    return ProductImage;
}