
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id' });
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id' });
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
