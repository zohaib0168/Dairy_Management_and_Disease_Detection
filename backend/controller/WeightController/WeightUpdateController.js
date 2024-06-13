const Joi = require('joi');
const MeatAnimal = require('../../models/meatAnimal');

const WeightUpdateController = {
    async updateWeight(req, res, next) {
        const weightUpdateSchema = Joi.object({
            animalType: Joi.string().valid('goat', 'buffalo', 'cow').required(),
            animal_code: Joi.number().required(),
            new_weight: Joi.number().required(),
            recordedAt: Joi.date().required(),
        });

        const { error } = weightUpdateSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { animal_code, new_weight } = req.body;

        try {
            const animalExists = await MeatAnimal.exists({ animal_code });

            if (!animalExists) {
                const error = {
                    status: 404,
                    message: 'Animal not found'
                };
                return next(error);
            }

            // Update the weight
            const updatedAnimal = await MeatAnimal.findOneAndUpdate(
                { animal_code },
                { $set: { weight: new_weight } },
                { new: true }
            );

            return res.status(200).json({ animal: updatedAnimal });
        } catch (error) {
            return next(error);
        }
    }
};

module.exports = WeightUpdateController;
