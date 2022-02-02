var local = window.localStorage.getItem("data");
if (!local) {
  //or if local === null. Both ways are correct
  window.localStorage.setItem("data", "");
  local = JSON.stringify([]);
}
var data = JSON.parse(local); //convert to array object type

function render() {
  $(".listData").html(`
        <tr>
            <th>Task Name</th>
            <th>Deadline</th>
        </tr>
  `);
  data.map(function (val, index) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(val.deadline);
    const month = months[date.getMonth()];
    const item = `
            <tr>
                <td><input type="checkbox" onclick='remove(${index})'> ${
      val.task
    }</td>
                <td>${month + " "} ${
      date.getDate() + 1 + " "
    } ${date.getFullYear()}
                </td>
            </tr>
          `;

    $(".listData").append(item);
  });
}

render();

function add() {
  const task = $("#task").val();
  const deadline = $("#deadline").val();
  if (task === "" || deadline === "") {
    alert("missing input");
  } else {
    data.push({ task: task, deadline: deadline });
    const newData = JSON.stringify(data); //convert to string
    window.localStorage.setItem("data", newData);
    $("#task").val("");
    $("#deadline").val("");
    const sorted = data.sort(function (after, before) {
      let a = new Date(after.deadline) - new Date(before.deadline);
      return a;
    });
    render();
  }
}

function remove(index) {
  data.splice(index, 1);
  const newData = JSON.stringify(data);
  window.localStorage.setItem("data", newData);
  render();
}
