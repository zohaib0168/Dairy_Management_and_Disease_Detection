const Joi = require('joi');
const MeatAnimal = require('../../models/meatAnimal');
const MeatAnimalDTO = require('../../dto/meatAnimal');

const MeatAnimalController = {
    async addMeatAnimal(req, res, next) {
        const meatAnimalRegisterSchema = Joi.object({
            animalType: Joi.string().valid('buffalo', 'cow', 'goat').required(),
            animal_code: Joi.number().required(),
            sex: Joi.string().valid('male', 'female').required(),
            weight: Joi.number().required(),
            purchase_price: Joi.number().required(),
            purchase_date: Joi.date().required(),
            age: Joi.number().required(),
        });
    
        const { error } = meatAnimalRegisterSchema.validate(req.body);
        if (error) {
            return next(error);
        }
    
        const { animalType, animal_code, sex, weight, purchase_price, purchase_date, age } = req.body;
    
        try {
            const animalExists = await MeatAnimal.exists({ animal_code });
            if (animalExists) {
                return res.status(409).json({
                    message: `Animal with code ${animal_code} already registered`
                });
            }
    
            const newAnimal = new MeatAnimal({
                animalType,
                animal_code,
                sex,
                weight,
                purchase_price,
                purchase_date,
                age,
            });
    
            const savedAnimal = await newAnimal.save();
            const animalDTO = new MeatAnimalDTO(savedAnimal);
    
            return res.status(201).json({ animal: animalDTO, auth: true });
        } catch (error) {
            return next(error);
        }
    },
    async getAllMeatAnimals(req, res, next) {
        try {
            const meats = await MeatAnimal.find();
            if (!meats || meats.length === 0) {
                return res.status(404).json({ message: 'No animals found' });
            }
            const meatAnimalDTOs = meats.map(meat => new MeatAnimalDTO(meat));

            return res.status(200).json({ meats: meatAnimalDTOs });
        } catch (error) {
            return next(error);
        }
    },
};

module.exports = MeatAnimalController;
