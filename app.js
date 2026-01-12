function getData() {
  return JSON.parse(localStorage.getItem("researchData")) || [];
}

function saveData(data) {
  localStorage.setItem("researchData", JSON.stringify(data));
}

function saveResearch() {
  const topic = document.getElementById("topic").value.trim();
  const content = document.getElementById("content").value.trim();
  const source = document.getElementById("source").value.trim();

  if (!topic || !content) {
    alert("Topic and content are required");
    return;
  }

  const data = getData();

  data.push({
    topic,
    content,
    source,
    date: new Date().toLocaleDateString()
  });

  saveData(data);
  displayResearch();

  document.getElementById("content").value = "";
}

function displayResearch() {
  const list = document.getElementById("researchList");
  list.innerHTML = "";

  const data = getData();

  data.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${item.topic}</h3>
      <p>${item.content}</p>
      <small>${item.source || ""}</small>
      <hr/>
    `;
    list.appendChild(div);
  });
}

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  const data = getData();

  let y = 10;
  pdf.text("Digital Research Report", 10, y);
  y += 10;

  data.forEach((item, index) => {
    pdf.text(`${index + 1}. ${item.topic}`, 10, y);
    y += 8;
    pdf.text(item.content.substring(0, 500), 10, y);
    y += 20;
  });

  pdf.save("research_report.pdf");
}

displayResearch();
