//validaciones

/*window.addEventListener ("load", function(){
    let form = document.getElementById("productsCreateForms")
    console.log(form)
    
    form.addEventListener("submit", function(e){
        let errores = [];
                    
        let name = document.getElementById("name")
        console.log(name)
        if(name.value == ""){
            errores.push("Campo no puede estar vacío")
        }else if (name.value.length < 5){
            errores.push("Nombre min 5 caracteres")
        }

        let description = document.getElementById("description")
        if(description.value == ""){
            errores.push("Campo no puede estar vacío")
        } else if(description.value.length < 5){
            errores.push("Descripcion min 5 caracteres")
        }else if(description.value.length >=200){
            errores.push("Maximo 200 caracteres")
        }

        let image = document.getElementById("image")
        if(image.value == ""){
            errores.push("Debe contener una imagen")
        }

        let category = document.getElementsByClassName("category_id")
        if(category.value == ""){
            errores.push("Debe escoger una categoria")
        }

        let material = document.getElementById("material_id")
        if(material.value == ""){
            errores.push("Debe escoger una categoria")
        }

        let colors = document.getElementById("colors_id")
        if(colors.value == ""){
            errores.push("Debe escoger un color")
        }

        let size = document.getElementById("size_id")
        if(size.value == ""){
            errores.push("Debe escoger una talla")
        }

        let price = document.getElementById("price")
        if(price.value == ""){
            errores.push("Campo no puede estar vacío")
        } else if(price.value == number){
            errores.push("Campo solo admite valores numericos")
        }else if(price.value.length < 5){
            errores.push("Minimo 5 caracteres")
        }else if(price.value.length >= 7){
            errores.push("Maximo 7 caracteres")
        }

        if (errores.length > 0) {
            e.preventDefault();
            let ulErrores = document.querySelector('.errores');
            //ulErrores.classList.add('alert-warning');//
            //ulErrores.innerHTML = '';//
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += `<li >  ${errores[i]} </li>`;
            };
        }else{
            alert('La validación fué exitosa')
            form.submit();
        }
    console.log(errores)

    })

})
let ulErrores = document.querySelector(".errores")*/
window.onload = function(){
    let titulo = document.querySelector('.titleAddProduct')
    let formulario = document.querySelector('#formProductAdd');
    let article = document.querySelector('article');
    titulo.innerHTML = 'AGREGAR PRODUCTO';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    formulario.classList.add('fondoCRUD');

//------DESDE AQUÍ CONTINUE CON LAS VALIDACIONES DEL FORMULARIO -------//    
    let form = document.querySelector('.form');
    form.title.focus();
    form.addEventListener('submit', (e) => {
        
        let errors = [];

        let nameProduct = document.querySelector('#nameProduct');
        let description = document.querySelector('#description');
        let image = document.querySelector('#image');
        let category_id = document.querySelector('#category_id');
        let material_id = document.querySelector('#material_id');
        let colors_id = document.querySelector('#colors_id');
        let sizes_id = document.querySelector('#sizes_id');
        let price = document.querySelector('#price');




        if (nameProduct.value == '') {
            errors.push('El campo Nombre no puede estar vacío');
            nameProduct.classList.add('is-invalid');
        } else {
            nameProduct.classList.add('is-valid');
            nameProduct.classList.remove('is-invalid');
            form.description.focus();
        };
        if (description.value == '') {
            errors.push('El campo Descripcion no puede estar vacío');
            description.classList.add('is-invalid');
        } else {
            description.classList.add('is-valid');
            description.classList.remove('is-invalid');
            form.image.focus();
        };
        if (image.value == '') {
            errors.push('El campo Fotos no puede estar vacío');
            image.classList.add('is-invalid');
        } else {
            image.classList.add('is-valid');
            image.classList.remove('is-invalid');
            form.category_id.focus();
        };
        if (category_id.value == "") {
            errors.push('El campo Categoria no puede estar vacío');
            category_id.classList.add('is-invalid');
        } else {
            category_id.classList.add('is-valid');
            category_id.classList.remove('is-invalid');
            form.material_id.focus();
        };
        if (material_id.value == '') {
            errors.push('El campo Materiales no puede estar vacío');
            material_id.classList.add('is-invalid');
        } else {
            material_id.classList.add('is-valid');
            material_id.classList.remove('is-invalid');
            form.colors_id.focus();
        };
        if (colors_id.value == '') {
            errors.push('El campo Colores no puede estar vacío');
            colors_id.classList.add('is-invalid');
        } else {
            colors_id.classList.add('is-valid');
            colors_id.classList.remove('is-invalid');
            form.sizes_id.focus();
        };
        if (sizes_id.value == '') {
            errors.push('El campo Tallas no puede estar vacío');
            sizes_id.classList.add('is-invalid');
        } else {
            sizes_id.classList.add('is-valid');
            sizes_id.classList.remove('is-invalid');
            form.price.focus();
        };
        if (price.value == '') {
            errors.push('El campo Precio no puede estar vacío');
            price.classList.add('is-invalid');
        } else {
            price.classList.add('is-valid');
            price.classList.remove('is-invalid');
        };
        
        //Aquí controlo que es lo que debo hacer si hay o no errores en el formulario

        if (errors.length > 0) {
            e.preventDefault();
            let ulErrors = document.querySelector('.errores');
            ulErrors.classList.add('alert-warning');
            ulErrors.innerHTML = '';
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li >  ${errors[i]} </li>`;
            };
        }else{
            alert('La validación fué exitosa')
            form.submit();
        }

    });


}