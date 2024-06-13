const Joi = require('joi');
const Animal = require('../../models/animal');
const AnimalDTO = require('../../dto/animal');
const RefreshToken = require('../../models/token');

const AnimalController = {
    async addAnimal(req, res, next) {
        const animalRegisterSchema = Joi.object({
            animalType: Joi.string().valid('buffalo', 'cow').required(),
            animal_code: Joi.number().required(),
            breed: Joi.string().required(),
            weight: Joi.number().required(),
            avg_milk: Joi.number().required(),
            purchase_price: Joi.number().required(),
            with_calf: Joi.string().required(),
            age: Joi.number().required(),
            milking_status: Joi.string().required(),
            disease_history: Joi.string().required(),
            total_calf: Joi.number().required(),
            death_date: Joi.date().optional().allow(null),
            calving_history: Joi.string().required(),
            purchase_date: Joi.date().required(),
            sale_date: Joi.date().optional().allow(null),
            expected_delivery_date: Joi.date().optional().allow(null)
        });

        const { error } = animalRegisterSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const {
            animalType,
            animal_code,
            breed,
            weight,
            avg_milk,
            purchase_price,
            with_calf,
            age,
            milking_status,
            disease_history,
            total_calf,
            death_date,
            calving_history,
            purchase_date,
            sale_date,
            expected_delivery_date
        } = req.body;

        try {
            const animalExists = await Animal.exists({ animal_code });
            if (animalExists) {
                return res.status(409).json({
                    message: `${animalType.charAt(0).toUpperCase() + animalType.slice(1)} already registered`
                });
            }

            const newAnimal = new Animal({
                animalType,
                animal_code,
                breed,
                weight,
                avg_milk,
                purchase_price,
                with_calf,
                age,
                milking_status,
                disease_history,
                total_calf,
                death_date,
                calving_history,
                purchase_date,
                sale_date,
                expected_delivery_date
            });

            const savedAnimal = await newAnimal.save();
            const animalDTO = new AnimalDTO(savedAnimal);

            return res.status(201).json({ animal: animalDTO, auth: true });
        } catch (error) {
            return next(error);
        }
    },

    async deleteAnimal(req, res, next) {
        const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
        const deleteAnimalSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required(),
        });
        try {
            const { error } = deleteAnimalSchema.validate(req.params);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
    
            const { id } = req.params;
    
            const animal = await Animal.findById(id);
            if (!animal) {
                return res.status(404).json({ message: 'Animal not found' });
            }
            await Animal.deleteOne({ _id: id });
            await RefreshToken.deleteOne({ _id: id });
    
            return res.status(200).json({ message: 'Animal deleted successfully' });
        } catch (error) {
            return next(error);
        }
    },

    async editAnimal(req, res, next) {
        const { id } = req.params;
        const animalUpdateSchema = Joi.object({
            animalType: Joi.string().valid('buffalo', 'cow').optional(),
            animal_code: Joi.number().optional(),
            breed: Joi.string().optional(),
            weight: Joi.number().optional(),
            avg_milk: Joi.number().optional(),
            purchase_price: Joi.number().optional(),
            with_calf: Joi.string().optional(),
            age: Joi.number().optional(),
            milking_status: Joi.string().optional(),
            disease_history: Joi.string().optional(),
            total_calf: Joi.number().optional(),
            death_date: Joi.date().optional(),
            calving_history: Joi.string().optional(),
            purchase_date: Joi.date().optional(),
            sale_date: Joi.date().optional(),
            expected_delivery_date: Joi.date().optional()
        });
        const { error } = animalUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
    
        try {
            const updatedAnimal = await Animal.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedAnimal) {
                return res.status(404).json({ message: 'Animal not found' });
            }
            const animalDTO = new AnimalDTO(updatedAnimal);
            return res.status(200).json({ animal: animalDTO });
        } catch (error) {
            return next(error);
        }
    },
    async getAllAnimals(req, res, next) {
        try {
            const animals = await Animal.find();
            if (!animals || animals.length === 0) {
                return res.status(404).json({ message: 'No animals found' });
            }
            const animalDTOs = animals.map(animal => new AnimalDTO(animal));

            return res.status(200).json({ animals: animalDTOs });
        } catch (error) {
            return next(error);
        }
    },
};

module.exports = AnimalController;
