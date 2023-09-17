import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.groupCollapsed(info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className="errorWrraper">
            <div className="errorContainer">
              <div>
                <h3>Error Occurred</h3>
              </div>
              <Link to="/">
                <button type="button" class="btn btn-warning">
                  Go to Menu
                </button>
              </Link>
            </div>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
