const express = require("express");
const { createRecipes, updateRecipes, deleteRecipes, viewById } = require('../database/recipes');
const auth = require('../middleware/auth');
const z = require('zod');

const router = express.Router();


router.get('/recipes', async (req, res) => {
    try {
      const recipes = await prisma.recipe.findMany();
      res.status(200).json({ recipes });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar receitas' });
    }
});
  
router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const recipe = await prisma.recipe.findUnique({ where: { id: Number(id) } });
      if (!recipe) {
        res.status(404).json({ error: 'Receita não encontrada' });
      } else {
        res.status(200).json({ recipe });
      }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar receita' });
    }
});
  
router.post('/recipes', async (req, res) => {
    const { name, description, preparationTime, userId } = req.body;
    try {
      const recipe = await prisma.recipe.create({
        data: {
          name,
          description,
          preparationTime,
          userId,
        },
      });
      res.status(201).json({ recipe });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar receita' });
    }
});
  
router.put('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, preparationTime } = req.body;
    try {
      const recipe = await prisma.recipe.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          preparationTime,
        },
    });
      res.status(200).json({ recipe });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar receita' });
    }
});
  
router.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const recipe = await prisma.recipe.delete({
        where: { id: Number(id) },
      });
        res.status(200).json({ message: 'Receita excluída ' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir receita' });
    }
});

module.exports = {
    router,
};
  