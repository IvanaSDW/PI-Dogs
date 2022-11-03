const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      min_height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      min_weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      min_years: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_years: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      // life_span: {
      //   type: DataTypes.STRING,
      // },
      
      is_local: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        defaultValue: 'https://placedog.net/950/640?r'
      },
    },
    {
      timestamps: false,
    }
  );
};
