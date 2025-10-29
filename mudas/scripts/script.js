document.addEventListener('DOMContentLoaded', () => {
  // evita que o usuário volte para páginas protegidas depois do logout
  Session.preventBackOnIndex();
  const form = document.querySelector('form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();  // 👉 Impede o recarregamento da página
    console.log("AQUI E O LOGIN.");
    const usuario = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    console.log('Tentando logar...');

    if (!usuario || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (usuario != 'admin' || senha != 'admin') {
      alert('Erro de usuario ou senha.');
      return;
    } else {
      location.replace('./menu.html');

    }
  });

  const loginInput = document.getElementById('login');

  /*loginInput.addEventListener('input', () => {
    loginInput.value = loginInput.value.toUpperCase();
  });*/





});

//FUNÇÃO QUE INICIA O TIMER
function onLoginSucesso(usuario) {
  try {
    if (usuario) localStorage.setItem('usuarioLogado', usuario);
  } catch (_) { }

  Session.startSession(1);      // <<< inicia a sessão (5 min)
  location.replace('./menu.html'); // <<< vai para a home (menu) sem criar histórico
}



