// busca o botão submit
const submit = document.querySelector('.pesquisar');

//função para ser executada ao clicar botão submit. Requisita objeto json da API Via CEP
submit.addEventListener('click', async (e) => {
     e.preventDefault();
  try {
    const cep = document.querySelector('.campo_numero').value;
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    const localidade = data.localidade;
    const uf = data.uf;
    
    //atualiza data, cidade e uf no document HTML;
    document.getElementById('data').innerHTML = defineDataAtual();
    document.getElementById('cidade').innerHTML = localidade;
    document.getElementById('uf').innerHTML = uf;

    requisitaIdApiClimaTempo(localidade, uf);

  } catch (err) {
    //acrescentar aqui código a ser executado em caso de erro;
  }
});

//função para buscar a data atual e retornar o dia e mês da mesma no formato: DD/MM
function defineDataAtual(){
    let dataAtual = new Date();
    let dia = dataAtual.getDate().toString().padStart(2, '0');
    let mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    return dia + '/' + mes;
}

//função para requisitar o número de id da cidade na API da Clima Tempo
async function requisitaIdApiClimaTempo (cidade, estado) {
    try {
        const idCidade = await fetch(`http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=${cidade}&state=${estado}&token=ae8afe89cabda7baee162de7f49ca2c0`);
        const dadoId = await idCidade.json();
        const id = dadoId[0].id;

        requisitaPrevisaoDoTempo(id);
    } catch (err) {
        console.log(err);
    }     
}

//função para requisitar informações do clima utilizando o número de id da cidade
async function requisitaPrevisaoDoTempo(id) {
    try {
        const apiCurrentWeather = await fetch(`http://apiadvisor.climatempo.com.br/api/v1/weather/locale/${id}/current?token=ae8afe89cabda7baee162de7f49ca2c0`);
        const dadosApi = await apiCurrentWeather.json();
        console.log(dadosApi);
    } catch (err) {
        console.log(err);
    }
}
