// Example starter JavaScript for disabling form submissions if there are invalid fields
//This is called IIFE(Immediately invoked function expression -> function is created and executed immediately)
(() => {
  'use strict' //enable strict mode which will catch silent errors 

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission

  Array.from(forms).forEach(form => {
    //form.addEventListener("submit", handler, false) -> it means first browser will reaches target, then bubbling starts, then this handler runs 
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) { //Browser internally checks required,pattern,type,min,max...
        event.preventDefault() //form action="/listings" will stop 
        event.stopPropagation() //This will stop event bubbling 
      }

      form.classList.add('was-validated')
    }, false)
  })
})()