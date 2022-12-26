import React from "react";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { spans: 0 };

    // 1. instantiate the ref
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    // we need to make sure we're not referencing the DOM element directly inside the lifecycle method 
    // because at that point it won't yet be able to resolve its atribute values, 
    // instead we need to give it an event listener that waits for the image to load
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;

    const spans = Math.ceil(height / 10);

    this.setState({ spans });
  };

  render() {
    const { urls, alt_description } = this.props.image;

    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        {/* 2. wire up the ref to a DOM element */}
        <img ref={this.imageRef} src={urls.regular} alt={alt_description} />
      </div>
    );
  }
}

export default ImageCard;
