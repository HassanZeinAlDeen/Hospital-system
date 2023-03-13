const link_pages = {};
link_pages.base_url = "http://localhost/hospital/back-end/";

link_pages.getApi = async (api_url) => {
  try {
    return await axios(api_url);
  }
  catch (error) {
    console.log("Error from GET API");
  }
}

link_pages.postAPI = async (api_url, api_data, api_token = null) => {
  try {
    return await axios.post(
      api_url,
      api_data,
      {
        headers: {
          'Authorization': "token " + api_token
        }
      }
    );
  } catch (error) {
    console.log("Error from POST API");
  }
}

link_pages.loadFor = (page) => {
  eval("link_pages.load_" + page + "();");
}

link_pages.load_meds = async () => {
  const get_medication_url = link_pages.base_url + "displaymedications.php";
  const response = await link_pages.getApi(get_medication_url);
  const displayMedButton = document.getElementById("display_medication");
  const meds = response.data;

  document.getElementById('mtable').innerHTML = "";
  for (let i = 0; i < meds.medications.length; i++) {
    let check = document.createElement('button');
    check.type = 'button';
    check.textContent = 'Choose';
    check.onclick = function () {
      addMedications(JSON.stringify(meds.medications[i]))
    };

    var rows = '<tr><td id="med' + i + '"></td><td>' + meds.medications[i].Id + '</td><td>'
      + meds.medications[i].Name + "</td><td>" + meds.medications[i].Cost + "$</td></tr>";
    document.getElementById('mtable').insertRow().innerHTML = rows;
    document.getElementById('med' + i).appendChild(check);
  }
}

link_pages.load_signup = async () => {
  const message = document.getElementById("response_message");
  const data = new FormData();
  const uName = document.getElementById("userName");
  const uEmail = document.getElementById("userEmail");
  const uPassword = document.getElementById("userPassword");
  const uDob = document.getElementById("userDOB");
  const uType = document.getElementById("userType");
  data.append("Name", uName.value);
  data.append("Email", uEmail.value);
  data.append("Password", uPassword.value);
  data.append("Dob", uDob.value);
  data.append("Usertype_id", uType.value);
  const signup_url = link_pages.base_url + "signup.php";
  const response = await link_pages.postAPI(signup_url, data);
  const signup = response.data;
  if (signup.status == "failed") {
    message.innerHTML = "email already exists";
    message.style.color = "red";
  } else if (signup.status == "success") {
    message.innerHTML = "Registration successful";
    message.style.color = "green";
    window.location.href = "./login.html";
  }
}

link_pages.load_login = async () => {
  let response_message = document.getElementById("message");
  let uEmail = document.getElementById("userEmail").value;
  let uPassword = document.getElementById("userPassword").value;
  // let uType = document.getElementById("userType").value;
  let data = new FormData();
  data.append('Email', uEmail);
  data.append('Password', uPassword);
  // data.append('Usertype_id', uType);
  const login_url = link_pages.base_url + "login.php";
  const response = await link_pages.postAPI(login_url, data);
  const login = response.data;
  console.log(login);
  console.log(login.response);
  if (login.response == "user not found") {
    response_message.innerHTML = "Email Not Found";
    message.style.color = "red";
  } else if (login.response == "logged in") {

    //save user in the local storage 
    localStorage.setItem("userName", login.Name);

    if (login.Usertype_id == 1) {//admin
      window.location.href = "admin.html";
    }
    if (login.Usertype_id == 2) {//employee
      window.location.href = "employee.html";
    }
    if (login.Usertype_id == 3) {//pattient
      window.location.href = "patient.html";
    }

  } else if (login.response == "Incorrect password") {
    response_message.innerHTML = "Password is Incorrect";
    message.style.color = "red";
  }
}


link_pages.load_serv = async () => {
  const get_services_url = link_pages.base_url + "displayservices.php";
  const response = await link_pages.getApi(get_services_url);
  const serv = response.data;

  document.getElementById('mtable').innerHTML = "";
  for (let i = 0; i < serv.services.length; i++) {
    let check = document.createElement('button');
    check.type = 'button';
    check.textContent = 'Request';
    check.onclick = function () {
      addMedications(JSON.stringify(serv.services[i]))
    };

    var rows = '<tr><td id="serv' + i + '"></td><td>' + serv.services[i].Name + '</td><td>'
      + serv.services[i].Description + "</td><td>" + serv.services[i].Cost + "$</td></tr>";
    document.getElementById('mtable').insertRow().innerHTML = rows;
    document.getElementById('serv' + i).appendChild(check);
  }
}


link_pages.load_rooms = async () => {
  const get_rooms_url = link_pages.base_url + "assignpatient.php";
  const response = await link_pages.getApi(get_rooms_url);
  const rooms = response.data;
  console.log(rooms);
  document.getElementById('mtable').innerHTML = "";

  for (let i = 0; i < rooms.patients.length; i++) {

    if (rooms.patients[i].Number_beds == 1) {
      let bed = document.createElement('button');
      bed.type = 'button';
      bed.textContent = 'Bed';
      let rows = '<tr><td id="bed' + i + '"></td><td>' + "Room-" + rooms.patients[i].Room_number + '</td><td>'
        + rooms.patients[i].Cost_day_usd + "$</td></tr>";
      document.getElementById('mtable').insertRow().innerHTML = rows;
      document.getElementById('bed' + i).appendChild(bed);
    }

    if (rooms.patients[i].Number_beds == 2) {
      let bed1 = document.createElement('button');
      bed1.type = 'button';
      bed1.textContent = 'Bed 1';
      let bed2 = document.createElement('button');
      bed2.type = 'button';
      bed2.textContent = 'Bed 2'
      let rows = '<tr><td id="bed' + i + '"></td><td>' + "Room-" + rooms.patients[i].Room_number + '</td><td>'
        + rooms.patients[i].Cost_day_usd + "$</td></tr>";
      document.getElementById('mtable').insertRow().innerHTML = rows;
      document.getElementById('bed' + i).appendChild(bed1);
      document.getElementById('bed' + i).appendChild(bed2);
    }
  }
}



