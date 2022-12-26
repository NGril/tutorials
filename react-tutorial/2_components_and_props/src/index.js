import React from "react";
import ReactDOM from "react-dom";
import faker from "faker";
import CommentDetail from "./CommentDetail";
import ApprovalCard from "./ApprovalCard";

const App = () => {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <div>
          <h4>Warning</h4>
          Are you sure you want to use this?
        </div>
      </ApprovalCard>

      <ApprovalCard>
        <CommentDetail
          author="Sam"
          image={faker.image.image()}
          time="Tuesday, 6:00PM"
          text="Great comment"
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Alex"
          image={faker.image.image()}
          time="Tuesday, 6:26PM"
          text="Nice blog post"
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Mark"
          image={faker.image.image()}
          time="Tuesday, 7:10PM"
          text="Dude wtf"
        />
      </ApprovalCard>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
