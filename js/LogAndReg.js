if (typeof document !== 'undefined') {
    function openModal(errorMessage) {
        const modal = document.getElementById('modal');
        const modalText = document.getElementById('modal-text');
    
        modalText.textContent = errorMessage;
        modal.style.display = 'block';
    }
    
    function closeModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    }
    const form = document.getElementById('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        validateInputs();
    });

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    const setSuccess = (element) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validateInputs = async () => {
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        let isValid = true;

        if (usernameValue === '') {
            setError(username, 'Требуется имя пользователя');
            isValid = false;
        } else {
            setSuccess(username);
        }

        if (emailValue === '') {
            setError(email, 'Требуется электронная почта');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Укажите действительный адрес электронной почты');
            isValid = false;
        } else {
            setSuccess(email);
        }

        if (passwordValue === '') {
            setError(password, 'Требуется пароль');
            isValid = false;
        } else if (passwordValue.length < 8) {
            setError(password, 'Пароль должен содержать не менее 8 символов.');
            isValid = false;
        } else {
            setSuccess(password);
        }

        if (isValid) {
            try {
                const action = form.getAttribute('data-action'); // получаем значение атрибута
                const response = await fetch(`http://localhost:3000/submit?action=${action}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: usernameValue,
                        email: emailValue,
                        password: passwordValue,
                    }),
                });
        
                if (response.ok) {
                    // Сохранение данных пользователя в localStorage
                    const userData = {
                        username: usernameValue,
                        email: emailValue,
                        // Можно добавить другие данные, если необходимо
                    };
                    localStorage.setItem('userData', JSON.stringify(userData));
                    
                    window.location.href = '../../html/index.html';
                } else {
                    const errorMessage = await response.text();
                    console.error('Ошибка при регистрации/входе:', errorMessage);
                    openModal(errorMessage);
                }
                
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
                // Обработка ошибки (например, вывод сообщения об ошибке)
            }
        }
    };

    // Обработчик для изменения значения атрибута
    const toggleFormAction = (action) => {
        form.setAttribute('data-action', action);
    };
}