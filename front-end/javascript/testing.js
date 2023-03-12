document.addEventListener("DOMContentLoaded", function () {
  // document.getElementById("tot").click = function () {

  // }

  document.getElementById("tot").addEventListener("click", function () {
    var u_input = document.getElementById("testing_input").value;
    console.log(u_input);
  });


  document.getElementById("tot").addEventListener("click", function () {
    var signup_data;
    //store data in JavaScript object
    let data = {
      "Name": Name.value,
      "Email": Age.value,
      "Password": Phone.value,
    }
    //convert JavaScript object to JSON
    var signup_data = JSON.stringify(data);
    console.log(signup_data);
    console.log(typeof(data));
  });

})