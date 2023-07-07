
const form = document.getElementById('admin-info');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = $('#admin-info');
    const formData = f.serializeArray();

    const jsonData = {};
    $.each(formData, function(index, field) {
      jsonData[field.name] = field.value;
      console.log(field);
    });


    $.ajax({
        url: '/adminInfo',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        success: function(response) {
          console.log('Form submitted successfully!');
          //console.log(response);
          window.location.assign("http://localhost:3000/adminChat")
          //console.log(response);
        },
        error: function(xhr, status, error) {
          console.error('Error:', error);
        }
      });
})

