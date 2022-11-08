module.exports = (sequelize, dataTypes) => {
    let alias = 'Image';
    let cols ={
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        image:{
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

    const Image = sequelize.define(alias,cols,config);

    Image.associate = function(models){
        Image.belongsTo(models.Product,{
            as: 'image',
            foreignKey: 'image_id'
        })
    }
    return Image;
}