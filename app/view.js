export default class View {
  constructor() {
    this.addBtn = document.querySelector("#addBtn");
    this.notesContainer = document.querySelector("#notes");
    this.popupContainer = document.querySelector(".popup_main");
    this.popupImg = document.querySelector("#img_popup")
    this.popupMainContainer = document.querySelector(".popup_main_container");
    this.popupTools = this.popupContainer.querySelector(".popup_tools_container");
    this.colorBtn = this.popupContainer.querySelector(".fa-palette");
    this.popup_color = this.popupContainer.querySelector(".popup_color");
    this.deleteBtn = this.popupContainer.querySelector(".fa-trash-alt");
    this.favBtn = this.popupContainer.querySelector(".fa-thumbtack");
    this.popupImgBtn = this.popupContainer.querySelector(".img_btn")
    this.favoriteContainer = document.querySelector("#favorites");
    this.textArea = this.popupContainer.querySelector("textarea");
    this.favoriteContainer = document.querySelector("#favorites");
    this.saveBtn = document.querySelector("#save_btn");
    this.colorBack = "";
    this.result = "";
    this.pasteNoteImg = "";

  }


  addNewNote = (id, text = "", color, favId, img = "") => {

    const note = document.createElement("div");
    note.classList.add("notes_element");
    note.setAttribute("id", `${id}`);

    note.innerHTML += `
                    <div class="tools">
                      
                        <div class="tools_left">
                
                        <button class="favorite" ><i ${favId ? `class="fa-solid fa-thumbtack active"` : `class="fa-solid fa-thumbtack"`}></i></button>
                        <label class="custom-file-upload">
        
                         <input class="img_btn" type="file" id="file-upload${id}" index_img=${id} />
                         <i class="fa-solid fa-image "></i>
        
                        </label>
                        
                        </div>
                      
                        <div class="tools_right">
                
                        <button class="edit"><i class="far fa-edit"  index_edit=${id}></i></button>
                        <button class="polette"><i class="fa-solid fa-palette" index_pal=${id}></i></button>
                        <button class="delete" ><i class="far fa-trash-alt" index_del=${id}></i></button>
                
                        </div>
                      
                    </div>
                      
                      <div class="color_main hide">
                      <div class="color">
                          <div class="circle color_1" index_id="${id}"   index_color="FFFFFF"></div>
                          <div class="circle color_2" index_id="${id}"   index_color="CCFF90"></div>
                          <div class="circle color_3" index_id="${id}"   index_color="FDCFE8"></div>
                          <div class="circle color_4" index_id="${id}"   index_color="FBF475"></div>
                          <div class="circle color_5" index_id="${id}"   index_color="CBF0F8"></div>
                          <div class="circle color_6" index_id="${id}"   index_color="eeaa9e"></div>
                      </div>
                        </div>
                
                     
                
                        <div>
                        <img id="img" class="img hide" src="${img}" alt="">
                        </div>
                        <div id="text" index_text="${id}" class="text">${text}</div>
                      
                      `;
    note.style.background = `#${color}`;

    const imgPaste = note.querySelector("#img");

    if (img) {
      imgPaste.classList.remove("hide")

    }

    favId ? this.favoriteContainer.appendChild(note) : this.notesContainer.appendChild(note);

  }



  saveNotes = (id) => {

    this.note = document.getElementById(id)
    const noteEl = this.note.querySelector(".text");
    noteEl.innerHTML = this.textArea.value.replaceAll("\n", "<br>");
    this.popupContainer.classList.toggle("hide");
  }



  editNote = (id, data) => {

    this.popupContainer.classList.toggle("hide");
    this.popup_color.classList.add("hide");


    data.forEach(el => {
      if (el.id == id) {
        this.textArea.value = el.textArea.replaceAll("<br>", "\n");
        this.textArea.style.background = `#${el.color}`;
        this.popupTools.style.background = `#${el.color}`;
        this.popupMainContainer.style.background = `#${el.color}`;

        if (el.img) {
          this.popupImg.classList.remove("hide");
          this.popupImg.setAttribute("src", el.img)
        }
        if (el.favId) {
          this.favBtn.classList.add("active")
        }
      }
    })

  }


  deleteNote = (id) => {
    const note = document.getElementById(id)
    if (note.parentNode == this.notesContainer) {
      this.notesContainer.removeChild(note)
    }
    else {
      this.favoriteContainer.removeChild(note);
    }


  }

  showColorPanel = (id) => {
    if (id) {
      const note = document.getElementById(id);
      const colorPanel = note.querySelector(".color_main");
      colorPanel.classList.toggle("hide")
    }

    this.popup_color.classList.toggle("hide")

  }

  closeColorPanel = (id) => {
    const note = document.getElementById(id);
    const colorPanel = note.querySelector(".color_main");
    colorPanel.classList.add("hide")
  }

  changeColor = (e, id) => {
    const classList = Array.from(e.target.classList);
    if (!classList.includes("circle")) {
      return
    };
    const note = document.getElementById(id);
    const popup = this.popupContainer.querySelector(".popup_tools_container")
    let color = e.target.getAttribute("index_color");

    note.style.background = `#${color}`;
    this.textArea.style.background = `#${color}`;
    this.popupTools.style.background = `#${color}`;
    this.popupMainContainer.style.background = `#${color}`;

    this.colorBack = color
  }

  addNoteToFavorite = (e, id) => {
    if (e) {
      const note = document.getElementById(id);
      const list = e.target.classList;
      list.add("active");
      this.favoriteContainer.appendChild(note);
    }
    const note = document.getElementById(id);
    const favBtnNote = note.querySelector(".fa-thumbtack");
    this.favBtn.classList.add("active")
    favBtnNote.classList.add("active");
    this.favoriteContainer.appendChild(note);
  }

  removeNoteFromFavorite = (e, id) => {
    if (e) {
      const note = document.getElementById(id);
      const list = e.target.classList;
      list.remove("active");
      this.favBtn.classList.remove("active");
      this.notesContainer.appendChild(note);
    }
    const note = document.getElementById(id);
    const favBtnNote = note.querySelector(".fa-thumbtack");
    favBtnNote.classList.remove("active");
    this.favBtn.classList.remove("active");
    this.notesContainer.appendChild(note);
  }


  selectedImg = (id, param) => {
    if (param) {

      const note = document.getElementById(id);
      const imgPasteNote = note.querySelector("#img");
      const imgBtn = note.querySelector(".img_btn")
      const selectedFile = document.getElementById(imgBtn.id.toString()).files[0];
      this.result = selectedFile;
      this.pasteNoteImg = imgPasteNote;
    }
    else {
      const note = document.getElementById(id);
      const imgPasteNote = note.querySelector("#img");
      const imgBtn = this.popupContainer.querySelector(".img_btn")
      const selectedFile = document.getElementById(imgBtn.id.toString()).files[0];
      this.result = selectedFile;
      this.pasteNoteImg = imgPasteNote;

    }



  }



}








