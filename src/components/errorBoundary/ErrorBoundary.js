import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
class ErrorBoundary extends Component {
  state = {
    error: false,
  };
  //   изменяет только  state
  //   static getDerivedStateFromError(error) {
  //     return {error: true}
  //   }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true,
    });
  }
  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
// ловят в методе render()
// ловят в конструкторах дочерних компонентов
//
// не ловят в обработчиках событий
// не ловят внутри себя
// не ловят в асинхронном коде
