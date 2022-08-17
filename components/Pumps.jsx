import { getRouteMatcher } from 'next/dist/shared/lib/router/utils';
import React, { useState, useEffect } from 'react';

import styles from "./pumps.module.css"

const Pumps = (props) => {
    
    
    const setInactivePump = (id) => {    
        // fetch("http://remote.kkpartner.dk:3001/setinactivepump", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ id })
        // })
        // RELOAD?
    }

    return (
        <React.Fragment>
            <div className={styles.pumpHeader}>
                <h1>Pumper</h1>
                <div className={styles.addPumpButton} onClick={() => {
                    var temp = {...props.showingModal}
                    temp.createpump = true
                    props.setShowingModal(temp)
                }}>Tilføj Pumpe</div>
            </div>
            <div className={styles.pumpContainer}>              
                {props.pumps ? props.pumps.map(function(pump) {
                    return (
                        <div className={styles.pump} key={pump["id"]}>
                            <div className={styles.mainContainer}>
                                <div className={styles.dataContainer}>
                                    <div>
                                        <div className={styles.header}>Navn</div>
                                        <div>{pump["name"]}</div>
                                    </div>
                                    <div>
                                        <div className={styles.header}>Telefon</div>
                                        <div>{pump["number"]}</div>
                                    </div>
                                    <div></div>
                                </div>
                                <div className={styles.hiddenDiv}>
                                    <div className={styles.hoverArrow}>
                                        <div style={{width: "60px", height: "4px", background: "lightgray", transform: "rotate(-20deg)", position: "relative", left: "2.5px", top: "12px"}}></div>
                                        <div style={{width: "60px", height: "4px", background: "lightgray", transform: "rotate(20deg)", position: "relative", right: "2.5px", top: "12px"}}></div>
                                        <div className={styles.dataContainerHidden}>
                                            <div>
                                                <div className={styles.header}>Startkode</div>
                                                <div>{pump["startcode"]}</div>
                                            </div>
                                            <div>
                                                <div className={styles.header}>Stopkode</div>
                                                <div>{pump["stopcode"]}</div>
                                            </div>
                                            <div onClick={() => {
                                                var temp = {...props.showingModal}
                                                temp.pump = true
                                                props.setCurrentPump(pump)
                                                props.setShowingModal(temp)
                                            }}>
                                                <img src="https://icons-for-free.com/iconfiles/png/512/draw+edit+pen+pencil+text+write+icon-1320162307919760358.png" alt="" style={{width: 32}}></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{background: pump["active"] == 1 ? "#42CB6B" : "#DF4848", height: "200px", width: "80px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                <div style={{position: "absolute"}}>{pump["active"] == 1 ? "Aktiv" : "Inaktiv"}</div>
                            </div>
                        </div>
                    )
                }) : <></>} 
            </div>  
        </React.Fragment>
    )
}

export default Pumps;