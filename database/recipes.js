const prisma = require('./prisma');

const createRecipes = (recipes, userId) => {
    return prisma.recipes.create({
        data: {
            name: recipes.name,
            userId,
            description: recipes.description,
            preparationTime: recipes.preparationTime,
        }
    });
}
const updateRecipes = async (id, recipes, userId) => {
    const recipes = await prisma.recipes.findFirst({
        where: {
            id,
        }
    })
    if (recipes.userId != userId) {
        throw new Error("Você não está autorizado a atualizar ")
    }
    return prisma.recipes.update({
        where: {
            id
        },
        data: {
            name: recipes.name,
            description: recipes.description,
            preparationTime: recipes.preparationTime,
        }
    });
}
const deleteRecipes = async (id, userId, recipes) => {
    const recipes = await prisma.recipes.findFirst({
        where: {
            id,
        }
    })
    if (recipes.userId != userId) {
        throw new Error("Você não está autorizado a atualizar ")
    }
    return prisma.recipes.delete({
        where: {
            id
        },
        data: recipes,
    });
};
const viewById = (userId) => {
    return prisma.recipes.findMany({
        where: {
            userId
        }
    });
};

module.exports = {
    createRecipes,
    updateRecipes,
    deleteRecipes,
    viewById,
};