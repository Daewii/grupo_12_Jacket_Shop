window.onload = function () {
    let name = document.querySelector("[id=nombre]");
    let description = document.querySelector("[id=descripción]");
    let image = document.querySelector("[id=imagen]");
    let category = document.querySelector("[id=categoría]");
    let material = document.querySelector("[id=material]");
    let color = document.querySelector("[id=color]");
    let size = document.querySelector("[id=talla]");
    let price = document.querySelector("[id=precio]");
    let errosUl = document.querySelector("ul.errores");
    let body = document.querySelector("body");

    const validateEmptyField = (e) => {
        const field = e.target;
        if (field.value.trim() === "") {
            const spanTagError = field.nextElementSibling;
            spanTagError.innerHTML = "</br> El campo " + field.id + " es obligatorio";
            spanTagError.classList.add("is-invalid");
            field.classList.add("alert-warning");
        } else {
            const spanTagError = field.nextElementSibling;
            spanTagError.innerText = "";
            spanTagError.classList.remove("is-invalid");
            field.classList.remove("alert-warning");
        }
    }

    const validateSelectField = (e) => {
        const field = e.target;
        if (field.value.indexOf() === -1) {
            const spanTagError = field.nextElementSibling;
            spanTagError.innerHTML = "</br> El campo " + field.id + " es obligatorio";
            spanTagError.classList.add("is-invalid");
            field.classList.add("alert-warning");
        } else {
            const spanTagError = field.nextElementSibling;
            spanTagError.innerText = "";
            spanTagError.classList.remove("is-invalid");
            field.classList.remove("alert-warning");
        }
    }

        name.addEventListener("blur", validateEmptyField)
        description.addEventListener("blur", validateEmptyField)
        price.addEventListener("blur", validateEmptyField)
        image.addEventListener("blur", validateEmptyField)
        category.addEventListener("blur", validateSelectField)
        material.addEventListener("blur", validateSelectField)
        color.addEventListener("blur", validateSelectField)
        size.addEventListener("blur", validateSelectField)

}