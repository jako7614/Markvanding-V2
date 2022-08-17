import React from 'react';
import styles from "./modal.module.css"

const DeleteNote = (props) => {
    const RemoveNote = (note) => {
        fetch(`/api/machines/note/${props.machine.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                id: note.id
            })
        }).then(res => res.json()).then(json => {            
            props.setNotes(json.maintenances)
            props.setMachine(json)
            props.setShowDeleteModal(false)
        })
    }

    return (
      <React.Fragment>
        {props.machine ? <div className={styles.modal}>
            <form className={styles.modalforms + " " + styles.removemachinemodal} onSubmit={function(event){
                event.preventDefault();
                RemoveNote(props.passNote);
            }}>
                <h1 className={styles.labelremovemodal}>Slet Note ?</h1>
                <div className={styles.modalbuttonbox}>
                  <button className={styles.cancelmodalbutton + " " + styles.cancelmachinemodal} type="button" onClick={() => {
                    props.setShowDeleteModal(false)
                  }}>Anuller</button>
                  <button className={styles.removemodalbutton + " " + styles.removemachinemodalbutton} type="submit">Slet Note</button>
                </div>
            </form>
        </div> : <></>}
      </React.Fragment>
    )
}

export default DeleteNote;