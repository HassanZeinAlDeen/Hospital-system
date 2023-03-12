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


  for (let i = 0; i < meds.medications.length; i++) {
    let check = document.createElement('button');
    check.type = 'button';
    check.textContent = 'Choose';
    var rows = "<tr><td>" + check.outerHTML + "</td><td>" + meds.medications[i].Id + "</td><td>"
      + meds.medications[i].Name + "</td><td>" + meds.medications[i].Cost + "</td></tr>";
    document.getElementById('mtable').getElementsByTagName('tbody')[0].insertRow().innerHTML = rows;
  }
  displayMedButton.disabled = true;
}

link_pages.load_signup = async () => {
  const data = new FormData();
  const uName = document.getElementById("userName");
  const uEmail = document.getElementById("userEmail");
  const uPassword = document.getElementById("userPassword");
  const uDob = document.getElementById("userDOB");
  const uType = document.getElementById("userType");
  data.append("Name",uName.value);
  data.append("Email",uEmail.value);
  data.append("Password",uPassword.value);
  data.append("Dob",uDob.value);
  data.append("Usertype_id",uType.value);
  const signup_url = link_pages.base_url + "signup.php";
  const response = await link_pages.postAPI(signup_url, data);
  const signup = response.data;
  console.log(signup);
}






