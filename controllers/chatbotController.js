export const chatWithBot = async (req, res) => {
  const { message } = req.body
  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  const userInput = message.toLowerCase()

  let reply = "Sorry, I didn't understand that. Please ask something related to farming."

  if (userInput.includes('best crop') || userInput.includes('which crop')) {
    reply = 'The best crop depends on your region and season. In summer, you can grow maize, tomatoes, or chillies.'
  } else if (userInput.includes('fertilizer')) {
    reply = 'Use nitrogen-based fertilizers for leafy crops and phosphorus-rich ones for root crops.'
  } else if (userInput.includes('irrigation')) {
    reply = 'Drip irrigation is best for water conservation, especially in arid regions.'
  } else if (userInput.includes('pest')) {
    reply = 'Use neem oil spray for natural pest control or consult your local agri center for specific pesticides.'
  } else if (userInput.includes('weather')) {
    reply = 'Please check your local weather app or portal for accurate forecast data for your farm.'
  } else if (userInput.includes('soil test')) {
    reply = 'A soil test can be done at your nearest Krishi Kendra. It helps in choosing the right fertilizer.'
  } else if (userInput.includes('organic')) {
    reply = 'Organic farming uses natural fertilizers like compost and avoids chemical pesticides.'
  } else if (userInput.includes('crop rotation')) {
    reply = 'Crop rotation helps improve soil health. Rotate cereals with legumes, for example, wheat followed by lentils.'
  }

  res.json({ reply })
}
