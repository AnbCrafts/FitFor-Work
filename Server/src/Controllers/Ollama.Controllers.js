import axios from 'axios';


const getCoverLetter = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      jobRole,
      company,
      skills,
      experienceSummary,
      description,
    } = req.body;

    console.log("Incoming Request Body:", req.body);

    if (
      !name ||
      !phone ||
      !email ||
      !jobRole ||
      !company ||
      !skills ||
      !experienceSummary ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const prompt = `My name is ${name}, phone number ${phone}, email ${email}, and I am skilled in ${skills} and looking for the job role/post of ${jobRole} in the company ${company}. My experience is: ${experienceSummary}. The reason I want this role is: ${description}. Create a professional, concise cover letter using this information.`;

    console.log("Prompt Sent to Ollama:", prompt);

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt: prompt,
        stream: false, // set to false if not handling streaming
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 60000, // in case ollama takes long
      }
    );

    console.log("Raw Ollama Response:", response.data);

    const coverLetter = response.data.response;

    if (!coverLetter) {
      return res.status(500).json({
        success: false,
        message: "Ollama did not return a valid response.",
      });
    }

    return res.json({
      success: true,
      message: "Cover letter generated successfully",
      data: coverLetter,
    });
  } catch (error) {
    console.error("❌ Error during Ollama Cover Letter Generation:", error.message);
    if (error.response) {
      console.error("📦 Error Response:", error.response.data);
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}; 





export {getCoverLetter};
