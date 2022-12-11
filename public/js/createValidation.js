const productsCreateForms = document.querySelector("#productsCreateForms");

let productName = document.querySelector("[name=name]")
const productDescription = document.querySelector("[name=description]")
const productImage = document.querySelector("[name=image]")
const productCategory = document.querySelector("[name=category_id]")
const productMaterial = document.querySelector("[name=material_id]")
const productColors = document.querySelector("[name=colors_id]")
const productSizes = document.querySelector("[name=size_id]")
const productPrice = document.querySelector("[name=price]") 


const validateEmptyField = (e) =>{
    const field = e.target;
    if (field.value.trim() === ""){
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

productName.addEventListener("blur", validateEmptyField)
productDescription.addEventListener("blur", validateEmptyField)
productImage.addEventListener("blur", validateEmptyField)
productCategory.addEventListener("blur", validateEmptyField)
productMaterial.addEventListener("blur", validateEmptyField)
productColors.addEventListener("blur", validateEmptyField)
productSizes.addEventListener("blur", validateEmptyField)
productPrice.addEventListener("blur", validateEmptyField)

productsCreateForms.addEventListener("submit", function(e){
    let error = false;
    formFields = [productsCreateForms.elements];
    console.log(formFields);
    formFields.pop();
    
    formFields.forEach(oneField =>{
        if (oneField.value.trim() === ""){
            const spanTagError = oneField.nextElementSibling;
            spanTagError.innerHTML = "</br> El campo " + oneField.name + " es obligatorio";
            spanTagError.classList.add("is-invalid");
            oneField.classList.add("alert-warning"); 
            error = true;       
        } else {
            const spanTagError = oneField.nextElementSibling;
            spanTagError.innerText = "";
            spanTagError.classList.remove("is-invalid");
            oneField.classList.remove("alert-warning");
            }
    })
    if(error){
        e.preventDefault();  // Evitamos que se envíe el form
        console.log("El formulario no se va a enviar");
    }
})