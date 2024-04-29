const category = document.querySelector("#category");
const confContainer = document.querySelector("#configurations-container");

category.addEventListener("input", (e) => {
  // get conf
  fetch(`/admin/categories/${e.target.value}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      confContainer.textContent = "";
      console.log(res);
      res.configurations.forEach((conf) => {
        const newConf = createConfig(conf);
        confContainer.appendChild(newConf);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

/*
   <p>
      <label for="configurations">ram</label>
      <input type="text" id="configurations" name="configurations">
    </p>
*/

function createConfig(name) {
  const p = document.createElement("p");

  const label = document.createElement("label");
  label.htmlFor = "configurations";
  label.appendChild(document.createTextNode(name));

  const input = document.createElement("input");
  input.type = "text";
  input.id = "configurations";
  input.name = "configurations";

  p.appendChild(label);
  p.appendChild(input);

  return p;
}
