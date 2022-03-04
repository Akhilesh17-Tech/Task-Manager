





function handleClickListner(e) {
  const target = e.target;
  console.log(target);
  if (target.className == "custom-checkbox") {
    const taskId = String(target.id);
    console.log(taskId);
    toggleTask(taskId);
    return;
  }
}
function initialize() {
  document.addEventListener("click", handleClickListner);
}

initialize();
