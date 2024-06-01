import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApplicationContext } from "@/context/ApplicationContext";

const ExplainAi = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const { sessionResult } = useApplicationContext();
  const [messageContent, setMessageContent] = useState(null);

  function separateNumberedItems(inputString) {
    // Split the input string based on the numbered items pattern
    const splitArray = inputString.split(/(\d+\.\s)/).filter(Boolean);

    // Initialize the result array
    const resultArray = [];

    // Iterate through the split array and push numbered items into the result array
    for (let i = 0; i < splitArray.length; i += 2) {
        let numberedItem = splitArray[i].trim() + splitArray[i + 1];

        // Capitalize the first letter of the item
        numberedItem = numberedItem.charAt(0).toUpperCase() + numberedItem.slice(1);

        // Add a period at the end if missing
        if (numberedItem.charAt(numberedItem.length - 1) !== '.') {
            numberedItem += '.';
        }

        // Ensure there's a space between each word
        numberedItem = numberedItem.replace(/\b(\w)/g, match => match.toUpperCase());

        resultArray.push(numberedItem);
    }

    return resultArray;
}

  const handleShowExplanation = () => {
    console.log("sessionResult: ", sessionResult);

    const fetchAIResponse = async () => {
      const response = await fetch("api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionResult }),
      });
      const data = await response.json();
      console.log(data.messageContent);

      // spite response from chatgpt into an array of each numbered error
      // const messageContentArray = separateNumberedItems(data.messageContent);
      // console.log("messageContentArray: ", messageContentArray);

      //An array of responses from chatgpt
      setMessageContent(data.messageContent);
    };
    fetchAIResponse();
    setShowExplanation(true);
  };

  console.log("sessionResult: ", sessionResult);

  return (
    <div className="flex justify-center w-[300px] px-6">
      {!showExplanation && (
        <div className="flex flex-col items-center gap-2">
          <p>Explain with AI</p>

          <Button className="h-50" onClick={() => handleShowExplanation()}>
            <div>
              <img
                className="w-[50px]"
                src="/images/ai-logo.png"
                alt="ai symbol"
              />
            </div>
          </Button>
        </div>
      )}
      {messageContent?.length > 0 && <p>{messageContent}</p>}


    </div>
  );
};

export default ExplainAi;
