const container = typeof document !== 'undefined' ? document.getElementById("container") : null;
const registerBtn = typeof document !== 'undefined' ? document.getElementById("register") : null;
const loginBtn = typeof document !== 'undefined' ? document.getElementById("login") : null;

if (registerBtn && container) {
    registerBtn.addEventListener("click", () => {
        container.classList.add("active");
    });
}

if (loginBtn && container) {
    loginBtn.addEventListener("click", () => {
        container.classList.remove("active");
    });
}