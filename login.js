!function(d){
  if (d.location.host !== "lng-tgk-aime-gw.am-all.net") {
    return;
  }
  
  // https://stackoverflow.com/a/133997
  function post(path, params) {
    const form = d.createElement("form");
    form.method = "POST";
    form.action = path;
    
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = d.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];

        form.appendChild(hiddenField);
      }
    }

    d.body.appendChild(form);
    form.submit();
  }
  
  const params = new URLSearchParams(d.location.hash.substring(1));
  const otp = parseInt(params.get("otp") || prompt("Please enter the passcode provided by the bot"));
  const server = (params.get("server") || prompt("Please enter the login server address provided by the bot")).replace(/\/$/, "");
  
  if (isNaN(otp)) {
    return alert("Invalid code, please try again.");
  }
  
  const clal = Object.fromEntries(d.cookie.split(";").map(c => c.split("=")))["clal"];
  
  if (!clal || clal.length !== 64) {
    return alert("Couldn't retrieve login data, please logout and login, then try again.");
  }
  
  post(`${server}/login`, { otp, clal });
}(document)
