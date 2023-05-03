/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/monitores';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.monitores.forEach(monitor => insertList(monitor.nome, monitor.email, monitor.habilidade, monitor.disponibilidade))
    })
    
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()

/*
  --------------------------------------------------------------------------------------
  Função para colocar um monitor na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputMonitor, inputEmail, inputSkill, inputAvailability) => {
  const formData = new FormData();
  formData.append('nome', inputMonitor);
  formData.append('email', inputEmail);
  formData.append('habilidade', inputSkill);
  formData.append('disponibilidade', inputAvailability);


  let url = 'http://127.0.0.1:5000/monitor';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada monitor da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um monitor da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const emailItem = div.getElementsByTagName('td')[1].innerHTML
      if (confirm("Você tem certeza que quer deletar o Monitor?")) {
        div.remove()
        deleteItem(emailItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um monitor da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/monitor?email=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo monitor com nome, email, habilidade e disponibilidade
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputMonitor = document.getElementById("newInput").value;
  let inputEmail = document.getElementById("newEmail").value;
  let inputSkill = document.getElementById("newSkill").value;
  let inputAvailability = document.getElementById("newAvailability").value;


  if (inputMonitor === '') {
    alert("Escreva o nome do Monitor!");
  } else if (inputEmail === ''||  inputSkill === ''||  inputAvailability === '')  {
    alert("todos os campos precisam ser preenchidos!");
  } else {
    insertList(inputMonitor, inputEmail, inputSkill, inputAvailability)
    postItem(inputMonitor, inputEmail, inputSkill, inputAvailability)
    alert("Monitor adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir Monitores na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameMonitor, email, habilidade, disponibilidade) => {
  var item = [nameMonitor, email, habilidade, disponibilidade]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newEmail").value = "";
  document.getElementById("newSkill").value = "";
  document.getElementById("newDisponibilidade").value = "";
  removeElement()
}

