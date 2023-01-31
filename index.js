// function download(filename, text) {
//   var link = document.createElement('a');
//   link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
//   link.setAttribute('download', filename);

//   if (document.createEvent) {
//     var event = document.createEvent('MouseEvents');
//     event.initEvent('click', true, true);
//     link.dispatchEvent(event);
//   }
//   else {
//     link.click();
//   }
// }

function download(filename, csv) {
  // Korea language support
  const BOM = "\uFEFF";
  csv = BOM + csv;

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");

  link.download = filename;

  link.href = window.URL.createObjectURL(blob);

  link.style.display = "none";

  document.body.appendChild(link);

  link.click();
}

window.onload = function (e) {
  document.getElementById("save").addEventListener("click", (e) => {
    const contents = [];

    document
      .getElementById("reader")
      .value.split("\n")
      .forEach((element) => {
        contents.push(element);
      });

    console.log(contents);

    document.getElementById("results").innerHTML = contents
      .map((content) => {
        return `<li>${content}</li >`;
      })
      .reduce((a, b) => a + b);

    download(
      "result.csv",
      contents.reduce((a, b) => {
        return (a += "," + b);
      })
    );
  });
};
