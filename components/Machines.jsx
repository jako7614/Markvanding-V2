import React, { useState, useEffect } from 'react';

import styles from "./machines.module.css"

const Machines = (props) => {  

    return (
        <React.Fragment>
            <div className={styles.machineHeader}>   
                <h1 style={{ marginTop: "50px" }}>Maskiner</h1>
                <div className={styles.addMachineButton} onClick={() => {
                    var temp = {...props.showingModal}
                    temp.createmachine = true
                    props.setShowingModal(temp)
                }}>Tilføj Maskine</div>
            </div>   
            <div className={styles.machineContainer}>
                {props.machines ? props.machines.map(machine => {
                    return (
                    <div className={styles.machine} key={machine["id"]}>
                        <div className={styles.mainContainer}>
                            <div className={styles.dataContainer}>
                                <div>
                                    <div className={styles.header}>Maskine</div>
                                    <div styles={{margin: 0}}>{machine["id"]}</div>
                                </div>
                                <div>
                                    <div className={styles.header}>Model</div>
                                    <div>{machine["model"] ? machine["model"] : "Ingen"}</div>
                                </div>
                            </div>
                            <div className={styles.hiddenDiv}>
                                <div className={styles.hoverArrow}>
                                    <div style={{width: "60px", height: "4px", background: "lightgray", transform: "rotate(-20deg)", position: "relative", left: "2.5px", top: "12px"}}></div>
                                    <div style={{width: "60px", height: "4px", background: "lightgray", transform: "rotate(20deg)", position: "relative", right: "2.5px", top: "12px"}}></div>
                                    <div className={styles.dataContainerHidden}>
                                        <div>
                                            <div className={styles.header}>Dyse</div>
                                            <div>{machine["nozzle"] ? machine["nozzle"] : "Ingen"}</div>
                                        </div>
                                        <div onClick={(event) => {
                                            var temp = {...props.showingModal}
                                            temp.machine = true
                                            props.setShowingModal(temp)
                                            props.setCurrentMachine(props.machines.find(x => x.id === machine.id))
                                        }}>
                                            <img src="https://icons-for-free.com/iconfiles/png/512/draw+edit+pen+pencil+text+write+icon-1320162307919760358.png" alt="" style={{width: 32}}></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{background: machine["active"] == 1 ? "#42CB6B" : "#DF4848", height: "200px", width: "80px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            <div style={{position: "absolute"}}>{machine["active"] == 1 ? "Aktiv" : "Inaktiv"}</div>
                        </div>
                    </div>
                    )
                }) : <></>}
            </div>
        </React.Fragment>
    )
}

export default Machines