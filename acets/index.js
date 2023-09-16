function criarBloco(dados) {
  const root = document.getElementById('root')
  const divConteiner = document.createElement('div')
  divConteiner.classList.add('divConteiner')

  const label = document.createElement('label')
  label.classList.add('nomeLabel')
  label.innerText = `${dados.nome}`

  const valor = document.createElement('p')
  valor.classList.add('inputValorRoot')
  valor.innerText = `Valor: ${dados.valor}`


  const divSaldo = document.createElement('div')
  divSaldo.classList.add('divSaldo')

  /*const saldo = document.createElement('label')
  saldo.innerText = 'Saldo: '

  const sapanSaldo = document.createElement('span')
  sapanSaldo.classList.add('sapanSaldo')
  sapanSaldo.innerText = 'xxx'

  divSaldo.append(saldo, sapanSaldo)*/

  const inputEditar = document.createElement('span')
  inputEditar.classList.add('inputEditar')

  const editar = document.createElement('button')
  editar.innerText = 'Editar'
  editar.classList.add('editar')
  editar.id = `${dados.id}`

  const deletar = document.createElement('button')
  deletar.innerText = 'Deletar'
  deletar.classList.add('deletar')
  deletar.id = `${dados.id}`

  divConteiner.append(label, valor, inputEditar, editar, deletar)
  root.appendChild(divConteiner)

  //Atualizar 
  document.querySelectorAll('.editar').forEach(function () {
    document.addEventListener('click', async (bot) => {
      let botaoAtualizar = bot.target
      botaoAtualizar = botaoAtualizar.id
      atualizarSaldo(botaoAtualizar)
    })
  })
  //deletar
  document.querySelectorAll('.deletar').forEach(function () {
    document.addEventListener('click', async (bot) => {
      let botaoAcionado = bot.target
      botaoAcionado = botaoAcionado.id
      deleteConta(parseInt(botaoAcionado))
    })
  })
}
async function deleteConta(id) {
  const deletarConta = await fetch(`http://localhost:3000/posts${id}`, {
    method: 'DELETE'
  })

  console.log(deletarConta)
  // console.log(deletarConta)
}
async function getDados() {
  const jsonSever = 'http://localhost:3000/posts'
  const valores = await fetch(jsonSever).then(async function (respose) {
    return respose.json()
  }).catch((ret) => {
    console.log('falha na requisição')
  })
  valores.forEach(element => {
    criarBloco(element)
  });
  console.log(valores)
}

//DOMContentLoaded
//Adicionar informação no BackEnd
document.addEventListener('submit', async (ev) => {
  ev.preventDefault()
  const dados = {
    nome: document.querySelector('#nome').value,
    valor: document.querySelector('#valor').value
  }
  const enviarPost = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados)
  })
  const resposta = await enviarPost.json()
})
getDados()