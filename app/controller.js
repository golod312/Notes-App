
export default class Controller {
          constructor(view, model) {
                    this.view = view;
                    this.model = model
          }

          bindEvents = () => {

                    if (this.model.notesData) {
                              this.model.notesData.forEach(el => { this.view.addNewNote(el.id, el.textArea, el.color, el.favId, el.img) })

                    }


                    this.view.addBtn.addEventListener("click", () => {
                              this.view.popupContainer.classList.remove("hide");
                              this.view.textArea.style.background = "";
                              this.view.popupTools.style.background = "";
                              this.view.popupMainContainer.style.background = "";
                              this.view.popupImg.setAttribute("src", "")
                              this.view.popupImg.classList.add("hide");

                              this.view.popup_color.classList.add("hide");
                              const mainId = this.model.createNewItem();
                              this.model.currentId = mainId.id;
                              this.view.addNewNote(mainId.id)

                    });

                    this.view.saveBtn.addEventListener("click", () => {
                              this.view.saveNotes(this.model.currentId)
                              this.model.saveTextLs(this.model.currentId, this.view.textArea.value);
                              this.model.currentId = null;
                              this.view.textArea.value = "";

                    })

                    this.view.colorBtn.addEventListener("click", () => {
                              this.view.showColorPanel()
                    })

                    this.view.deleteBtn.addEventListener("click", () => {
                              this.view.deleteNote(this.model.currentId)
                              this.model.deleteNoteLs(this.model.currentId)
                              this.view.popupContainer.classList.add("hide");
                    })

                    this.view.favBtn.addEventListener("click", () => {
                              if (this.view.favBtn.classList.contains("active")) {
                                        this.view.removeNoteFromFavorite(null, this.model.currentId);
                                        this.model.removeFavLs(this.model.currentId);
                              }
                              else {
                                        this.view.addNoteToFavorite(null, this.model.currentId);
                                        this.model.saveFavLs(this.model.currentId)
                              }
                    });

                    this.view.popupImgBtn.addEventListener("change", () => {
                              this.view.selectedImg(this.model.currentId, null)
                              this.model.loadImg(this.model.currentId, this.view.result, this.view.pasteNoteImg, this.view.popupImg)
                    })



                    this.view.popupContainer.addEventListener("click", (e) => {
                              if (e.target.classList.contains("circle")) {
                                        this.view.changeColor(e, this.model.currentId);
                                        this.model.saveColorLs(this.model.currentId, this.view.colorBack)

                              }

                    })

                    this.view.notesContainer.addEventListener("click", (e) => {

                              let id = e.target.closest(".notes_element").getAttribute("id");

                              if (e.target.classList.contains("fa-edit")) {

                                        this.view.editNote(id, this.model.notesData)
                              }
                              if (e.target.classList.contains("fa-trash-alt")) {
                                        this.view.deleteNote(id)
                                        this.model.deleteNoteLs(id)
                              }

                              if (e.target.classList.contains("fa-palette")) {

                                        this.view.showColorPanel(id)
                              }

                              if (e.target.classList.contains("notes_element")) {
                                        this.view.closeColorPanel(id)
                              }
                              if (e.target.classList.contains("circle")) {
                                        this.view.changeColor(e, id);
                                        this.model.saveColorLs(id, this.view.colorBack)

                              }

                              if (e.target.classList.contains("fa-thumbtack")) {
                                        this.view.addNoteToFavorite(e, id);
                                        this.model.saveFavLs(id)
                              }


                              this.model.currentId = id


                    })

                    this.view.notesContainer.addEventListener("change", (e) => {
                              let id = e.target.closest(".notes_element").getAttribute("id");

                              if (!e.target.classList.contains("img_btn")) {
                                        return
                              }
                              this.view.selectedImg(id, 1)
                              this.model.loadImg(id, this.view.result, this.view.pasteNoteImg, null)

                    })



                    this.view.favoriteContainer.addEventListener("click", (e) => {
                              let id = e.target.closest(".notes_element").getAttribute("id");
                              if (e.target.classList.contains("fa-thumbtack")) {
                                        this.view.removeNoteFromFavorite(e, id);
                                        this.model.removeFavLs(id);
                              }
                              if (e.target.classList.contains("fa-edit")) {
                                        this.model.currentId = id
                                        this.view.editNote(id, this.model.notesData)
                              }
                              if (e.target.classList.contains("fa-trash-alt")) {
                                        this.view.deleteNote(id)
                                        this.model.deleteNoteLs(id)
                              }

                              if (e.target.classList.contains("fa-palette")) {

                                        this.view.showColorPanel(id)
                              }

                              if (e.target.classList.contains("notes_element")) {
                                        this.view.closeColorPanel(id)
                              }
                              if (e.target.classList.contains("circle")) {
                                        this.view.changeColor(e, id);
                                        this.model.saveColorLs(id, this.view.colorBack)

                              }

                              this.view.favoriteContainer.addEventListener("change", (e) => {
                                        let id = e.target.closest(".notes_element").getAttribute("id");

                                        if (!e.target.classList.contains("img_btn")) {
                                                  return
                                        }
                                        this.view.selectedImg(id, 1)
                                        this.model.loadImg(id, this.view.result, this.view.pasteNoteImg, null)

                              })





                    })
          };





}


