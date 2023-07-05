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
    jsonData.name = username.value;
    jsonData.email = email.value;
    jsonData.company = company.value;
    jsonData.message = message.value;


    $.ajax({
        url: '/info',
        type: 'POST',
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        success: function(response) {
          console.log('Form submitted successfully!');
          console.log('Response:', response);
        },
        error: function(xhr, status, error) {
          console.error('Error:', error);
        }
      });
    //console.log(user); 


    //window.location.assign("http://localhost:3000/user")
})