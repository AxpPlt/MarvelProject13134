import MarvelServices from "../../services/MarvelServices";
import { Component } from "react";
import PropTypes from "prop-types";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    newItemLoading: false,
    offset: 210,
  };

  marvelServices = new MarvelServices();
  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelServices
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };
  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };
  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.lenght < 9) {
      ended = true;
    }

    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };
  render() {
    const { charList, offset, newItemLoading, charEnded } = this.state;
    const elements = charList.map((item) => {
      return (
        <li
          tabIndex={1}
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}
          className="char__item"
        >
          <img src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return (
      <div className="char__list">
        <ul className="char__grid">{elements}</ul>
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}
CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};
export default CharList;
