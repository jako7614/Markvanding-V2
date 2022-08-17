import React, { useState } from 'react';
import styles from "./modal.module.css"

const UpdateMachine = (props) => {
    const [machine, setMachine] = useState(props.currentMachine)

    const updateMachine = () =>{
        if (props.currentMachine.active == 1) {
            alert("Du kan ikke rette en aktiv maskine")
            return;
        }

        fetch("/api/machines/" + props.currentMachine.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(machine)
        }).then(res => res.json()).then(json => {
            props.setMachines(json)
            
            var temp = {...props.showingModal}
            temp.machine = false
            props.setShowingModal(temp)
        })
      
    }

    return (
        
        <div className={styles.modal}>
            <form className={styles.modalforms + " " + styles.machinemodal} onSubmit={function(event){
                event.preventDefault();
                updateMachine();
            }}>
                <div className={styles.modalDiv}>
                    <div className={styles.modallabelbox}>
                        <div className={styles.modalLabelContainer}>
                            <label>Maskine</label>
                            <input type="text" readOnly={true} className={styles.bigmodalinputs + " " + styles.editmachineid} value={props.currentMachine.id} required></input>
                        </div>
                        <div className={styles.modalLabelContainer}>
                            <label>Model</label>
                            <input type="text" className={styles.modalinputs} onChange={(e) => setMachine({...machine, ["model"]: e.target.value})} defaultValue={props.currentMachine.model}></input>
                        </div>
                        <div className={styles.modalLabelContainer}>
                            <label>Dyse</label>
                            <input type="text" className={styles.modalinputs} onChange={(e) => setMachine({...machine, ["nozzle"]: e.target.value})} defaultValue={props.currentMachine.nozzle} required></input>
                        </div>
                    </div>

                    <div className={styles.buttonContainer}>
                    <button className={styles.removemodalbutton + " " + styles.removemachinebutton} type="button" onClick={() => {
                        var temp = {...props.showingModal}
                        temp.machine = false
                        temp.deletemachine = true
                        props.setShowingModal(temp)
                    }}>Slet Maskine</button>

                        <div className={styles.modalbuttonbox}>
                            <button className={styles.cancelmodalbutton} type="button" onClick={() => {
                                var temp = {...props.showingModal}
                                temp.machine = false
                                props.setShowingModal(temp)
                            }}>Anuller</button>
                            <button className={styles.modalbuttons + " " + styles.updatemodalbutton} type="submit">Gem</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateMachine;