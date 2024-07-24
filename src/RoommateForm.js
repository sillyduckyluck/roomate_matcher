import React, { useState } from 'react';
import './RoommateForm.css';

const RoommateForm = () => {
  const [paragraph, setParagraph] = useState('');
  const [adjustedText, setAdjustedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /*
  const handleAdjustWithAI = () => {
    setIsLoading(true);ë 
    // Simulate an API call
    setTimeout(() => {
      // Dummy API response
      const adjusted = paragraph + ' (This text has been adjusted by AI)';
      setAdjustedText(adjusted);
      setIsLoading(false);
    }, 2000); // Simulate a 2-second API call
  };
  */
 
  const queryGPT = async (input) => {
    setIsLoading(true);
    const prompt = 'Please take the following text, and rearrange it so that it is more extraverted in nature: ' + paragraph;
    const apiKey = process.env.REACT_APP_GPT_KEY;
    //const apiKey = Netlify.env.get("REACT_APP_GPT_KEY")
    console.log(apiKey)
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    console.log(prompt)
    console.log(input)

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [{ role: "system", content: prompt + input}],
        //prompt: prompt + input,
        max_tokens: 400, // Adjust the number of tokens as needed
        model: 'gpt-3.5-turbo',
      }),
    });


    const data = await response.json();
    console.log(data)
    console.log(data.choices[0].message.content)
    //return [data.choices[0].message.content];
    setIsLoading(false);
    setAdjustedText([data.choices[0].message.content]);
  };


  return (
    <div className="roommate-form">
      <h1>College Roommate Matching Program</h1>
      <textarea
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
        placeholder="Explain about yourself, your hobbies, etc."
        rows="6"
      />
      <div className="adjust-section">
        <button onClick={queryGPT} disabled={isLoading}>
          Adjust with AI
        </button>
        <p className="note">Users who adjust their paragraphs with text have been shown to be more accepted.</p>
      </div>
      <div className="response-box">
        {isLoading ? <p>Loading...</p> : <p>{adjustedText}</p>}
      </div>
    </div>
  );
};

export default RoommateForm;

