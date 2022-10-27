class MarvelServices {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  // ключ может не работать
  _apiKey = "apikey=ec8c0f589de5f88cd1848cb0d3010268";
  _baseOffset = 210;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };
  getCharacter = async (id) => {
    const res = await this.getResource(
      ` ${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    let changeDescr = char.description;
    if (changeDescr === "") {
      changeDescr = "Not desription";
    } else if (changeDescr.length > 227) {
      changeDescr = changeDescr.substr(0, 227) + "...";
    }

    return {
      name: char.name,
      description: changeDescr,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
    };
  };
}

export default MarvelServices;
