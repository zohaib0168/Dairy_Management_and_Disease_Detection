const Joi = require('joi');
const Disease = require('../../models/disease');

const diseaseController = {
    async detectDisease(req, res, next) {
        const symptomsSchema = Joi.object({
            symptoms: Joi.array().items(Joi.string()).required()
        });

        // Validate the request body
        const { error } = symptomsSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { symptoms } = req.body;

        try {
            // Find diseases that match all the provided symptoms
            const diseases = await Disease.find({
                symptoms: { $all: symptoms }
            });

            if (diseases.length === 0) {
                return res.status(404).json({ message: 'No matching diseases found' });
            }

            // Map the diseases to include only the necessary details
            const diseaseDetails = diseases.map(disease => ({
                name: disease.name,
                treatment: disease.treatment,
                description: disease.description
            }));

            return res.status(200).json({ diseases: diseaseDetails });
        } catch (error) {
            return next(error);
        }
    }
};

module.exports = diseaseController;
