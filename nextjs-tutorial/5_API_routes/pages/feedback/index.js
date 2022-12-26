import { useState } from "react";

import { buildFeebackPath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show details</button>
          </li>
        ))}
      </ul>
    </>
  );
}

// TO TALK TO OUR INTERNAL API ROUTES WE DON'T USE FETCH - WE RATHER NEED TO EXECUTE THE SAME FUNCTION LIKE IN THE API ROUTE FILE
// THIS IS BECAUSE IT IS IN THE SAME PROJECT AND IS RUNNING ON THE SAME SERVER
export async function getStaticProps() {
  const filePath = buildFeebackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
