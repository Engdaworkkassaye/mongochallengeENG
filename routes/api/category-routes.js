const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
  try {
   
    const categories = await Category.findAll({ include: Product });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    
    const { id } = req.params;
    const category = await Category.findByPk(id, { include: Product });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {

    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
   
    const { id } = req.params;
    const [updated] = await Category.update(req.body, { where: { id } });
    if (updated) {
      const updatedCategory = await Category.findByPk(id);
      return res.json(updatedCategory);
    }
    return res.status(404).json({ message: 'Category not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
  
    const { id } = req.params;
    const deleted = await Category.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: 'Category not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
