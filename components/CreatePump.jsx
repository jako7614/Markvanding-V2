import React, { useState } from 'react';
import styles from "./modal.module.css"

const CreatePump = (props) => {
    const [pump, setPump] = useState({
        name: "",
        number: "",
        startcode: "",
        stopcode: ""
    })

    const createPump = () =>{    
        var valid = true;

        var re = new RegExp("[0-9]{8}$")

        if (pump.number.length !== 8) {
            alert("Nummeret skal være 8 cifre langt!")
            valid = false;
        }

        if (re.test(pump.number.toString()) === false) {
            alert("Nummeret må kun være tal")
            valid = false;
        }

        if (props.pumps.some(x => x.name == pump.name)) {
            alert("Pumpenavn bruges allerede")
            valid = false
        }

        if (props.pumps.some(x => x.number == pump.number)) {
            alert("Nummeret bruges allerede")
            valid = false
        }


        if (!valid) return;
    
        // Temporary pump object that gets sent to the server to insert into the database
        var tempPump = {
            name: pump.name,
            number: pump.number,
            active: 0,
            startcode: pump.startcode,
            stopcode: pump.stopcode
        } 
        
        fetch('/api/pumps/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tempPump)
        }).then(res => res.json()).then(json => {
            props.setPumps(json)

            var temp = {...props.showingModal}
            temp.createpump = false
            props.setShowingModal(temp)
        })
    }

    return (        
        <div className={styles.modal}>
            <form className={styles.modalforms + " " + styles.createmodal} onSubmit={(event) => {
                event.preventDefault();
                createPump();
            }}>
                <h1 style={{textAlign: "center"}}>Opret ny pumpe</h1>
                <div className={styles.createmodallabelbox}>
                    <input type="text" className={styles.createmodalinputs} onChange={(e) => setPump({...pump, ["name"]: e.target.value})} placeholder="Navn" required></input>
                    <input type="text" className={styles.createmodalinputs} onChange={(e) => setPump({...pump, ["number"]: e.target.value})} placeholder="Nummer" required></input>
                    <input type="text" className={styles.createmodalinputs} onChange={(e) => setPump({...pump, ["startcode"]: e.target.value})} placeholder="Startkode" required></input>
                    <input type="text" className={styles.createmodalinputs} onChange={(e) => setPump({...pump, ["stopcode"]: e.target.value})} placeholder="Stopkode" required></input>
                </div>
                <div style={{ marginTop: "20px" }} className={styles.modalbuttonbox + " " + styles.createmodalbuttonbox}>
                    <button className={styles.cancelmodalbutton} type="button" onClick={() => {
                        var temp = {...props.showingModal}
                        temp.createpump = false
                        props.setShowingModal(temp)
                    }}>Anuller</button>
                    <button className={styles.modalbuttons + " " + styles.updatemodalbutton} type="submit">Gem</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePump;