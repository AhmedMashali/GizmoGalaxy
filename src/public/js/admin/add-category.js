const addConfig = document.querySelector("#add-config");
const configTail = document.querySelector("#config-tail");

addConfig.addEventListener("click", () => {
  const newConfig = createConfig();
  configTail.insertAdjacentElement("beforebegin", newConfig);
});

function createConfig() {
  const p = document.createElement("p");
  const input = document.createElement("input");
  input.type = "text";
  input.id = "configurations";
  input.name = "configurations";
  input.placeholder = "configuration name ...";
  p.appendChild(input);
  return p;
}
