window.onload = function () {
    let name = document.querySelector("[name=name]");
    let description = document.querySelector("[name=description]");
    let image = document.querySelector("[name=image]");
    let category = document.querySelector("[name=category_id]");
    let material = document.querySelector("[name=material_id]");
    let color = document.querySelector("[name=color_id]");
    let size = document.querySelector("[name=size_id]");
    let price = document.querySelector("[name=price]");
    let errosUl = document.querySelector("ul.errores");
    let body = document.querySelector("body");

    const validateEmptyField = (e) => {
        const field = e.target;
        if (field.value.trim() === "") {
            const spanTagError = field.nextElementSibling;
            spanTagError.innerHTML = "</br> El campo " + field.name + " es obligatorio";
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
            spanTagError.innerHTML = "</br> El campo " + field.name + " es obligatorio";
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
        image.addEventListener("blur", validateEmptyField)
        category.addEventListener("blur", validateSelectField)
        material.addEventListener("blur", validateSelectField)
        color.addEventListener("blur", validateSelectField)
        size.addEventListener("blur", validateSelectField)
        price.addEventListener("blur", validateEmptyField)

}