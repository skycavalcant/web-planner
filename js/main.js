let tasks = {};
let dateKey = null

document.addEventListener('DOMContentLoaded', function() {
    const monthsBR = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro',];
    const tableDays = document.getElementById('dias');
    const taskBox = document.getElementById('task-box');
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const calendar = document.getElementById('calendar');
    const element = document.getElementById('myElement');

      // Adicionar evento de clique ao documento
      document.addEventListener('click', (e) => {
        // Verifica se o clique foi fora da taskBox e do calendário
        if (!taskBox.contains(e.target) && !calendar.contains(e.target) && !e.target.closest('#add-task')) {
            taskBox.classList.remove('show'); 
            taskBox.classList.add('hidden'); 
        }
    });

    if (element) {
        element.classList.add('newClass');
      } else {
        console.log('Element not found!');
      }
    let mes = new Date().getMonth();
    let ano = new Date().getFullYear();

    // Função para armazenar as tarefas no armazenamento local do navegador
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Função para carregar as tarefas do armazenamento local do navegador
  function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
    } else {
      tasks = {};
    }
  }
  
  // Carregar as tarefas ao iniciar o aplicativo
  loadTasks();

    function GetDaysCalendar(mes,ano){
        console.log('sucesso! Mes: ' + mes + ', Ano: ' + ano);
        // resto do código da função GetDaysCalendar
        document.getElementById('mes').innerHTML = monthsBR[mes];
        document.getElementById('ano').innerHTML = ano;
    
        let firstDayOfWeek = (new Date(ano, mes, 1).getDay() + 6) % 7;
        let getLastDayThisMonth = new Date(ano,mes+1,0).getDate();

        // Obter o dia atual
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
    
        // Limpar a tabela
        tableDays.innerHTML = '';
    
        // Criar novas linhas e células para os dias do mês
        let rows = Math.ceil((getLastDayThisMonth + firstDayOfWeek) / 7);
        for (let i = 0; i < rows; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
        let cell = document.createElement('td');
        let day = i * 7 + j - firstDayOfWeek + 1;
        if (day > 0 && day <= getLastDayThisMonth) {
        cell.textContent = day;

        // Verificar se é o dia atual
        if (day === currentDay && mes === currentMonth && ano === currentYear) {
          cell.classList.add('today'); 
      }
        }
         row.appendChild(cell);
    }
        tableDays.appendChild(row);
  }
    
        // Adicionar classes CSS para os dias do mês
        let cells = tableDays
    }

    // Adicionar evento de clique ao calendário
tableDays.addEventListener('click', (e) => {
    if (e.target.tagName === 'TD') {
      // Abrir a caixa lateral
      taskBox.classList.remove('hidden');
      taskBox.classList.add('show');
      renderTasksForDay(e.target.textContent);

      // Armazenar o dia selecionado
      const selectedDay = e.target.textContent; 
      dateKey = `${ano}-${mes + 1}-${selectedDay}`;

      // Renderizar as tarefas do dia
      renderTasksForDay(selectedDay);
  }
});

    const botao_proximo = document.getElementById('btn_prox');
    const botao_anterior = document.getElementById('btn_ant');

    botao_proximo.addEventListener('click', function(){
        mes++;
        if(mes > 11){
            mes = 0;
            ano++;
        }
        GetDaysCalendar(mes,ano);
    });
    
    botao_anterior.addEventListener('click', function(){
        mes--;
        if(mes < 0){
            mes = 11;
            ano--;
        }
        GetDaysCalendar(mes,ano);
    });

    GetDaysCalendar(mes, ano);

    // Função para renderizar as tarefas do dia
    function renderTasksForDay(day) {
      const dateKey = `${ano}-${mes + 1}-${day}`; 
      if (!tasks[dateKey]) {
          tasks[dateKey] = [];
      }
      renderTasks(tasks[dateKey]);
  }
    
    // Função para renderizar a lista de tarefas
function renderTasks(tasks) {
    // Limpar a lista de tarefas
    taskList.innerHTML = '';

    // Renderizar as tarefas
    tasks.forEach((task, index) => { // Adicionei o parâmetro index
        const taskElement = document.createElement('LI');
        taskElement.textContent = task.name;

        // Adicionar evento de teclado ao campo de entrada
    newTaskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') { 
      addTask(); 
  }
});

        // Criar o checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        // Adicionar evento de clique ao checkbox
        checkbox.addEventListener('click', (e) => {
    // Impede que o clique no checkbox feche a taskBox
    e.stopPropagation();
            // Verifica se o checkbox foi marcado
            if (checkbox.checked) {
                
                tasks.splice(index, 1); 
                // Atualizar o armazenamento local
                saveTasks();
                // Re-renderizar as tarefas
                renderTasks(tasks);
            }
        });

        // Adicionar o checkbox ao elemento da tarefa
        taskElement.appendChild(checkbox);
        // Adicionar o elemento da tarefa à lista de tarefas
        taskList.appendChild(taskElement);
    });
}

   // Função para adicionar uma nova tarefa
function addTask() {
  const newTask = newTaskInput.value.trim();
  if (newTask !== '' && dateKey) {
      if (!tasks[dateKey]) {
          tasks[dateKey] = [];
      }
      tasks[dateKey].push({ id: Date.now(), name: newTask, completed: false });
      saveTasks();
      renderTasks(tasks[dateKey]);
      newTaskInput.value = '';
  }
}

// Adicionar evento de clique ao botão de adicionar tarefa
addTaskButton.addEventListener('click', addTask);

// Adicionar evento de teclado ao campo de entrada
newTaskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
      addTask(); // Chama a função para adicionar a tarefa
  }
});
});