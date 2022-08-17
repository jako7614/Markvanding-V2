import React, { useState } from 'react';
import styles from "./modal.module.css"

const UpdatePump = (props) => {  
    const [pump, setPump] = useState(props.currentPump)  

    const updatePump = () => {
        var defaultName = props.currentPump.name
        var defaultNumber = props.currentPump.number
        var valid = true;
        
        var re = new RegExp("[0-9]{8}$")

        if (pump.active == 1) {
            alert("Du kan ikke redigere en aktiv pumpe")
            valid = false;
        }
    
        if (pump.number.length !== 8) {
            alert("Nummeret skal være 8 cifre langt!")
            valid = false;
        }
        if (re.test(pump.number.toString()) === false) {
            alert("Nummeret må kun være tal")
            valid = false;
        }
        
        if (props.pumps.some(x => x.name == pump.name && pump.name != defaultName)) {
            alert("Navnet bruges allerede")
            valid = false;
        }

        if (props.pumps.some(x => x.number == pump.number && pump.number != defaultNumber)) {
            alert("Nummeret bruges allerede")
            valid = false;
        }

        if (!valid) return;

        fetch("/api/pumps/" + props.currentPump.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pump)
        }).then(res => res.json()).then(json => {
            props.setPumps(json)
            
            var temp = {...props.showingModal}
            temp.pump = false
            props.setShowingModal(temp)
        })
        

        // RELOAD ?
    }

    return (
        
        <div className={styles.modal}>
            <form className={styles.modalforms + " " + styles.pumpmodal} onSubmit={function(event){
                event.preventDefault();
                updatePump();
            }}>
                <div className={styles.modalDiv}>
                    <div className={styles.modallabelbox}>
                        <div className={styles.modalLabelContainer}>
                            <label>Navn</label>
                            <input type="text" className={styles.bigmodalinputs + " " + styles.editpumpname} defaultValue={props.currentPump.name} onChange={(e) => setPump({...pump, ["name"]: e.target.value})} required></input>
                        </div>
                        <div className={styles.modalLabelContainer}>
                            <label>Nummer</label>
                            <input type="text" className={styles.modalinputs + " " + styles.editpumpnumber} defaultValue={props.currentPump.number} onChange={(e) => setPump({...pump, ["number"]: e.target.value})} required></input>
                        </div>
                        <div className={styles.modalLabelContainer}>
                            <label>Startcode</label>
                            <input type="text" className={styles.modalinputs + " " + styles.editpumpstartcode} defaultValue={props.currentPump.startcode} onChange={(e) => setPump({...pump, ["startcode"]: e.target.value})} required></input>
                        </div>
                        <div className={styles.modalLabelContainer}>
                            <label>Stopcode</label>
                            <input type="text" className={styles.modalinputs + " " + styles.editpumpstopcode} defaultValue={props.currentPump.stopcode} onChange={(e) => setPump({...pump, ["stopcode"]: e.target.value})} required></input>
                        </div>
                    </div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.removemodalbutton + " " + styles.removepumpbutton} type="button" onClick={(event) => {
                                event.preventDefault();
                                var temp = {...props.showingModal}
                                temp.pump = false
                                temp.deletepump = true
                                props.setShowingModal(temp)
                            }}>Slet Pumpe</button>

                            <div className={styles.modalbuttonbox}>
                                <button className={styles.cancelmodalbutton} type="button" onClick={() => {
                                    var temp = {...props.showingModal}
                                    temp.pump = false
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

export default UpdatePump;