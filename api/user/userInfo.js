const username = document.getElementById('name');
const email = document.getElementById('email');
const company = document.getElementById('company');
const message = document.getElementById('message');

const form = document.getElementById('user-info');

form.addEventListener('submit', e => {
    e.preventDefault();
    const f = $('#user-info');
    const formData = f.serializeArray();

    const jsonData = {};
    $.each(formData, function(index, field) {
      jsonData[field.name] = field.value;
    });
    $.ajax({
        url: '/userInfo',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        success: function(response) {
          console.log('Form submitted successfully!');
          window.location.assign("http://localhost:3000/user")
          //console.log(response);
        },
        error: function(xhr, status, error) {
          console.error('Error:', error);
        }
      });
})