export default class Model {
          constructor() {
                    this.notesData = JSON.parse(localStorage.getItem("notes"));
                    this.currentId = null;
          }

          createNewItem = () => {
                    const notesDataId = this.notesData ? this.notesData[this.notesData.length - 1].id : 0;
                    const newId = parseInt(notesDataId) + 1;
                    const newNote =
                    {
                              id: newId,
                              textArea: "",
                              color: "FFFFFF",
                              favId: "",
                              img: ""
                    }
                    this.notesData = this.notesData || [];
                    this.notesData.push(newNote);
                    return newNote

          }



          saveTextLs = (id, value) => {

                    this.notesData.forEach(el => {
                              if (el.id == id) {
                                        el.textArea = value.replaceAll("\n", "<br>")
                              }

                    })
                    localStorage.setItem("notes", JSON.stringify(this.notesData))
          };

          deleteNoteLs = (id) => {
                    this.notesData = this.notesData.filter(el => el.id.toString() !== id);
                    localStorage.setItem("notes", JSON.stringify(this.notesData));
                    if (this.notesData.length === 0) {
                              localStorage.removeItem("notes");
                              this.notesData = null
                    }
          }

          saveColorLs = (id, color) => {
                    this.notesData.forEach(el => {
                              if (el.id == id) {
                                        el.color = color
                              }
                    })
                    localStorage.setItem("notes", JSON.stringify(this.notesData))
          }

          saveFavLs = (id) => {
                    this.notesData.forEach(el => {
                              if (el.id == id) {
                                        el.favId = id
                              }
                    })
                    localStorage.setItem("notes", JSON.stringify(this.notesData))
          }

          removeFavLs = (id) => {
                    this.notesData.forEach(el => {
                              if (el.id == id) {
                                        el.favId = "";
                              }
                    })
                    localStorage.setItem("notes", JSON.stringify(this.notesData))
          }

          loadImg = (id, src, element_1, element_2) => {
                    const reader = new FileReader();
                    reader.addEventListener("load", () => {

                              this.saveImgLs(id, reader.result)

                              if (element_2) {
                                        element_1.classList.remove("hide")
                                        element_1.setAttribute("src", reader.result)
                                        element_2.classList.remove("hide")
                                        element_2.setAttribute("src", reader.result)

                              }
                              else {
                                        element_1.classList.remove("hide")
                                        element_1.setAttribute("src", reader.result)
                              }


                    })
                    reader.readAsDataURL(src)
          }

          saveImgLs = (id, img) => {
                    console.log(id)
                    this.notesData.forEach(el => {
                              if (el.id == id) {
                                        el.img = img
                              }
                    })
                    localStorage.setItem("notes", JSON.stringify(this.notesData))
          }

}