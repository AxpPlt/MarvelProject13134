import { useHttp } from "../hooks/http.hook";

const useMarvelServices = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  // ключ может не работать
  const _apiKey = "apikey=ec8c0f589de5f88cd1848cb0d3010268";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };
  const getCharacter = async (id) => {
    const res = await request(` ${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
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

  return { loading, error, clearError, getAllCharacters, getCharacter };
};

export default useMarvelServices;
