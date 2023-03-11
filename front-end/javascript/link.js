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

  link_pages.loadFor = (page) => {
    eval("link_pages.load_" + page + "();");
  }

  link_pages.load_meds = async () => {
    const get_medication_url = link_pages.base_url + "displaymedications.php";
    const response = await link_pages.getApi(get_medication_url);
    console.log(response.data);
    const displayMedButton = document.getElementById("display_medication");
    displayMedButton.disabled = true;
  }

