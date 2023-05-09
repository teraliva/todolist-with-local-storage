document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form')
    const list = document.getElementById('list')
    const button = document.getElementById('form__btn')
    const form__input = document.getElementById('form__input')
    const item = document.querySelectorAll('item')

    let todos = [];

    getFromLocalStorage();

    function getFromLocalStorage() {
        if (localStorage.getItem('todos')) {
            todos = JSON.parse(localStorage.getItem('todos'))
            renderTodos()
        }
    }

    button.addEventListener('click', addItem)

    form__input.addEventListener('keypress', function (e) {
        if (e.key === "Enter") {
            addItem()
        }
    })

    function addItem() {
        if (form__input !== '') {
            createtodo()
            addToLocalStorage()
            renderTodos()

            form__input.value = '';
        }


    }


    // creating object from input 


    function createtodo() {
        const name = form__input.value;

        const newObj = {
            name: name,
            iscompleted: false
        };

        todos.push(newObj)
        console.log(todos)
    }

    function addToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    function renderTodos() {
        if (form__input !== '') {
            list.innerHTML = ''
            todos.forEach(todo => {
                const paragraph = document.createElement('p')
                list.appendChild(paragraph)
                paragraph.innerText = todo.name
    
                if (todo.iscompleted) {
                    paragraph.style.textDecoration = 'line-through'
                }
    
                paragraph.addEventListener('click', function () {
                    todo.iscompleted = !todo.iscompleted
                    addToLocalStorage()
                    renderTodos()
                })
                paragraph.addEventListener('dblclick', function () {
                    const index = todos.indexOf(todo)
                    todos.splice(index, 1)
                    list.removeChild(paragraph)
                    addToLocalStorage()
                    renderTodos()
    
                })
            })
        }
        }
        
})
    







