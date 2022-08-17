import React from 'react';
import styles from "./modal.module.css"

const DeleteMachine = (props) => {
    const RemoveMachine = () => {    
        if (props.currentMachine) {
          if(props.currentMachine.active == 1) {
            alert("Du kan ikke slette en aktiv maskine")
            return
          }
    
          fetch("/api/machines/" + props.currentMachine.id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
          }).then(res => res.json()).then(json => {
            props.setMachines(json)
            
            var temp = {...props.showingModal}
            temp.deletemachine = false
            props.setShowingModal(temp)
          })

        }
        else {
          alert("Ingen maskine valgt")
        }
      }

    return (
      <React.Fragment>
        {props.currentMachine ? <div className={styles.modal}>
            <form className={styles.modalforms + " " + styles.removemachinemodal} onSubmit={function(event){
                event.preventDefault();
                RemoveMachine();
            }}>
                <h1 className={styles.labelremovemodal}>Slet maskine {props.currentMachine.id}?</h1>
                <div className={styles.modalbuttonbox}>
                  <button className={styles.cancelmodalbutton + " " + styles.cancelmachinemodal} type="button" onClick={() => {
                    var temp = {...props.showingModal}
                    temp.deletemachine = false
                    temp.machine = true
                    props.setShowingModal(temp)
                  }}>Anuller</button>
                  <button className={styles.removemodalbutton + " " + styles.removemachinemodalbutton} type="submit">Slet Maskine</button>
                </div>
            </form>
        </div> : <></>}
      </React.Fragment>
    )
}

export default DeleteMachine;