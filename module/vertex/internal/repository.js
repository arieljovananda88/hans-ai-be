const { VertexAI } = require('@google-cloud/vertexai');

async function generateRecipeFromVertex(prompt) {
    const projectId = 'bangkit-capstone-hans-ai';
    const vertexAI = new VertexAI({project: projectId, location: 'us-central1'});

    const generativeModel = vertexAI.getGenerativeModel({
        model: 'gemini-1.5-flash-001',
    });

    const resp = await generativeModel.generateContent(prompt);
    const contentResponse = resp.response;

    return contentResponse;
}

module.exports = {
    generateRecipeFromVertex
}
