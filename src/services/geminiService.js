import axios from 'axios';

const API_KEY = '';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const evaluateProjectIdea = async (projectIdea, skillLevel) => {
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `I'm a ${skillLevel} level developer with the following project idea: "${projectIdea}". 
                Please evaluate this idea and provide:
                1. A brief evaluation of the idea (feasibility, complexity, etc.)
                2. Recommendations for implementation
                3. A detailed task list with steps to complete the project
                4. A simple flow diagram description of the project structure
                
                Format your response as a JSON object with the following structure:
                {
                  "evaluation": "Your evaluation here",
                  "recommendations": "Your recommendations here",
                  "taskList": [
                    {"id": 1, "task": "Task description", "completed": false},
                    {"id": 2, "task": "Task description", "completed": false}
                  ],
                  "flowDiagram": "Description of flow diagram here"
                }`
              }
            ]
          }
        ]
      }
    );

    // Parse the response to extract the JSON
    const textContent = response.data.candidates[0].content.parts[0].text;
    const jsonStartIndex = textContent.indexOf('{');
    const jsonEndIndex = textContent.lastIndexOf('}') + 1;
    const jsonString = textContent.substring(jsonStartIndex, jsonEndIndex);
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};
