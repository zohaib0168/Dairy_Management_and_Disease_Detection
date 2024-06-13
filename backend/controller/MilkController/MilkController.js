const Joi = require('joi');
const Milk = require('../../models/milk');
const MilkDTO = require('../../dto/milk');
const Animal = require('../../models/animal');

const MilkController = {
    async addingMilk(req, res, next) {
        const milkRegisterSchema = Joi.object({
            animalType: Joi.string().valid('buffalo', 'cow').required(),
            animal_code: Joi.number().required(),
            date: Joi.date().required(),
            time: Joi.string().valid('morning', 'evening').required(),
            quantity: Joi.number().required()
        });

        const { error } = milkRegisterSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { animalType, animal_code, date, time, quantity } = req.body;

        try {
            let animalExists = false;
            if (animalType === 'buffalo') {
                animalExists = await Animal.exists({ animal_code: animal_code });
            } else if (animalType === 'cow') {
                animalExists = await Animal.exists({ animal_code: animal_code });
            }

            if (!animalExists) {
                const error = {
                    status: 404,
                    message: 'Animal not found'
                };
                return next(error);
            }

            // Save the milk data
            const newMilk = new Milk({
                animalType,
                animal_code,
                date,
                time,
                quantity
            });

            await newMilk.save();

            return res.status(201).json({ message: 'Milk data added successfully' });
        } catch (error) {
            return next(error);
        }
    },
    async getAllMilk(req, res, next) {
        try {
            const milks = await Milk.find();
            if (!milks || milks.length === 0) {
                return res.status(404).json({ message: 'No Milk record found' });
            }
            const milkDTOs = milks.map(milk => new MilkDTO(milk));

            return res.status(200).json({ milks: milkDTOs });
        } catch (error) {
            return next(error);
        }
    },
};

module.exports = MilkController;
