import React from "react";
import DeleteNotesGrid from "../DeleteNotesGrid/DeleteNotesGrid.jsx";

class DeletesPage extends React.Component {
    constructor() {
        super();
        this.state = {  notes: JSON.parse(sessionStorage.getItem('mydata')), 
                        note: null,
                        text: null};
        this.handleRestoreNote = this.handleRestoreNote.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.handleClickNote = this.handleClickNote.bind(this);
    }
    handleRestoreNote(){
        let noteId = this.state.note.id;
        let newNotes = this.state.notes.map((item) => {
            if (item.id === noteId) {
              const updatedItem = {
                ...item,
                delete: !item.delete,
              };
       
              return updatedItem;
            }
            return item;
          });
        this.setState({
            notes: newNotes
        })
        sessionStorage.setItem('mydata', JSON.stringify(newNotes));
    }
    handleDeleteNote(){
        let noteId = this.state.note.id;
        let newNotes = this.state.notes.filter(function (note) {
            return note.id !== noteId;
        });
        this.setState({
            notes: newNotes
        })
        sessionStorage.setItem('mydata', JSON.stringify(newNotes));
    }
    
    handleClickNote(newnote){
        this.setState({
            note: newnote,
            text: newnote.text
        })
      }


    render() {
        return (<div className="notes-page">
            <h2 className="notes-header">Deletes</h2>
            <DeleteNotesGrid notes={this.state.notes} onClickNode={this.handleClickNote}/>
            
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    <div >
                        <p >{(this.state.text !== null) ? this.state.text : "error"} </p>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleRestoreNote}>Restore</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleDeleteNote}>Delete</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
        </div>)
    }
}

export default DeletesPage;