import React, { useState } from 'react';
import styles from "./modal.module.css"

const EditNote = (props) => {

    const [editedNote, setEditedNote] = useState({...props.passNote})

    const editNote = () =>{    
        
        fetch("/api/machines/note/" + props.machine.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedNote)
        }).then(res => res.json()).then(json => {
            props.setNotes(json.maintenances),
            props.setShowModal(false)
        })
    }

    const setNote = (note) => {
        var tempNote = {...editedNote}
        tempNote.note = note
        setEditedNote(tempNote)
    }

    return (
        <div className={styles.modal}>
            <form className={styles.modalforms + " " + styles.notemodal} style={{ height: "200px", justifyContent: "space-between", alignItems: "center" }} onSubmit={(event) => {
                event.preventDefault();
                editNote();
            }}>
                <div className={styles.modallabelbox}>
                    <label>Note</label>
                    <textarea type="text" style={{ width: "290px", height: "100px", resize: "none" }} onChange={e => setNote(e.target.value)} defaultValue={props.passNote.note}></textarea>
                </div>

                <div className={styles.modalbuttonbox} style={{ maginBottom: "10px" }}>
                    <button className={styles.cancelmodalbutton} type="button" onClick={() => {props.setShowModal(false)}}>Anuller</button>
                    <button className={styles.modalbuttons + " " + styles.updatemodalbutton} type="submit">Gem</button>
                </div>
            </form>
        </div>
    )
}

export default EditNote;