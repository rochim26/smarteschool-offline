const input = document.getElementsByTagName("input");

for (let i = 0; i < input.length; i++) {
  const d = input[i].getAttribute("type");

  if (d == "number") {
    input[i].addEventListener("wheel", (e) => e.preventDefault());
  }
}
