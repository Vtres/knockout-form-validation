const api = "https://viacep.com.br/ws/{cep}/json/";

const headers = {
  Accept: "application/json"
};

function getCep(cep) {
  return new Promise((resolve, reject) => {
    const url = api.replace("{cep}", cep);
    fetch(url, {
        headers
      })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });
}

export default {getCep}