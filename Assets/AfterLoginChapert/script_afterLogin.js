const listMenu = document.querySelectorAll('.listMenu');
const brandName = document.querySelector('.brandName');
//----------------------------------------------------------------------
function clickSelection(element) {
  listMenu.forEach((ele) => {
    ele.classList.remove('active');
  });
  element.classList.add('active');
  brandName.innerHTML = element.lastElementChild.lastElementChild.innerHTML;
}

const clickSection = document.querySelectorAll('[data-click-section-active]');
const contentSelector = document.querySelectorAll('.contentSelector');

clickSection.forEach((section) => {
  section.addEventListener('click', () => {
    const sectionID = document.querySelector(
      section.dataset.clickSectionActive
    );
    contentSelector.forEach((cont) => {
      cont.classList.remove('active');
    });

    sectionID.classList.add('active');
  });
});

//Modal Opening and Clossing for all---------------------------------------------------------
const openModalElement = document.querySelectorAll('[data-modal-target]');
const overlay = document.getElementById('overlay');
openModalElement.forEach((element) => {
  element.addEventListener('click', () => {
    const modal = document.querySelector(element.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.boxModal.active');
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

let updateMode = false;

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
  updateMode = true;
}
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
  updateMode = false;
}
//---------------------------------------------------------------------------------------------

const inputFile = document.getElementById("inputFile");
const imgSrc = document.getElementById("imgSrc");
const imageFile = document.getElementById("imageFile")

var selectedFile;

inputFile.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    imageFile.style.background = `url(../Image/${file.name.split(".")[file.name.split(".").length - 1]}.png )`
    imageFile.style.backgroundSize = "125px";
    imageFile.style.backgroundPosition = "center";
    imageFile.style.backgroundRepeat = "no-repeat";

    selectedFile = file;

  }
})

const addQuestionForm = document.getElementById("addQuestions-form")

addQuestionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (selectedFile) {
    console.log("Running")

    var fileReader = new FileReader();
    fileReader.onload = function (event) {
      var data = event.target.result;
      var workbook = XLSX.read(data, {
        type: "binary"
      });
      workbook.SheetNames.forEach(function (sheetName) {
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        console.log(json_object);
      })
    }
    fileReader.readAsBinaryString(selectedFile);
  }
})