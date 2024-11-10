const  CreateFormData = (form_element)=>{

  const formData = new FormData(form_element);

  var data = {};

  for (const [key, value] of formData) {
    data[key] = value;
  }

  return data;

}
