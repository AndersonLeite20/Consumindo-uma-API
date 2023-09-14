function criarBloco(dados) {
  const root = document.getElementById('root')
  const divConteiner = document.createElement('div')
  divConteiner.classList.add('divConteiner')

  const label = document.createElement('label')
  label.classList.add('nomeLabel')
  label.innerText = `${dados.nome}`

  const valor = document.createElement('p')
  valor.classList.add('inputValorRoot')
  valor.innerText = `Saldo: ${dados.valor}`

  const inputEditar = document.createElement('inputEditar')
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