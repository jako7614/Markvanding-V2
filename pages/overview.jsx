import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { UseAppContext } from '../context/AppContext';
import cookie from "cookie-cutter"

import Header from "./../components/Header";

import machinestyles from "./../components/machines.module.css"
import pumpstyles from "./../components/pumps.module.css"
import Head from "next/head";

const Overview = ({machineProps, pumpProps}) => {
  // const {loggedIn, setLoggedIn} = UseAppContext()
  const [machines, setMachines] = useState(machineProps)
  const [pumps, setPumps] = useState(pumpProps)
  const [displayMode, setDisplayMode] = useState(true)

  const router = useRouter();

  const sendStopSMS = () => {
    // fetch("/api/sendsms", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ 
    //     number: pumpnumber,
    //     message: pumpStopcode
    //   })
    // })
  }

  const stopMachine = (machine) => {
    fetch("/api/machines/stop/" + machine.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(machine)
    }).then(res => res.json()).then(json => setMachines(json))
  }

  const getMachines = () => {
    fetch("/api/machines", {
      method: "GET",
      headers: {
        "Content-Type" : "application/json"
      }
    }).then(res => res.json().then(json => {
      setMachines(json)
    }))
  }

  useEffect(() => {
    if (displayMode == true) {
      const interval = setInterval(() => {
        getMachines()
      }, 60000);
      return () => clearInterval(interval)
    }
  }, [displayMode])

  useEffect(() => {
    // if (!loggedIn) router.push("/")
    var bool = cookie.get("loggedin")
    if (bool && bool == "true") {
      return
    } else {
      router.push("/")
    }
  }, [])

  var color = displayMode ? {
    background: "red"
  } : {
    background: "green"
  }
  
  return (
      <React.Fragment>
        <Header />
        {/* <button style={{color: "white", background: color.background, borderRadius: "24px", padding: "10px", marginTop: "10px", position: "absolute", right: "5vw"}} onClick={() => {setDisplayMode(!displayMode)}}>{displayMode ? "Slå auto opdatering fra" : "Slå auto opdatering til"}</button> */}
        <div style={{marginTop: "50px"}}>
          {machines.filter(machine => machine.active == 1).length < 1 ? <h1 style={{fontSize: "48px", marginTop: "200px"}}>Ingen aktive vandinger</h1> : <></>}
          {machines.filter(machine => new Date() > new Date(machine.time) && machine.active == 1 && machine.time == null).length > 0 ? <h1 className={machinestyles.tableLabel}>Vandinger uden tider</h1> : <></>}
          <div className={machinestyles.machineContainer}>
            {machines ? machines.filter(machine => new Date() > new Date(machine.time) && machine.active == 1 && machine.time == null).sort((a, b) => a.time - b.time).map(function(machine) {
                  var datePart = new Date(machine["time"]).toLocaleString("da-DK", {
                    month: "short", day: "numeric"
                  });
                  var timePart = new Date(machine["time"]).toLocaleTimeString("da-DK", {
                    hour: "numeric", minute: "numeric"
                  }).replace("." , ":")

                  return (
                  <div className={machinestyles.machine} key={machine["id"]}>
                    <div className={machinestyles.mainContainer}>
                      <div style={{height: "198px"}} className={machinestyles.dataContainer}>
                        <div>
                          <div className={machinestyles.header}>Maskine</div>
                          <div>{machine["id"]}</div>
                        </div>
                        <div>
                          <div className={machinestyles.header}>Pumpe</div>
                          <div>{machine["pumpname"]}</div>
                        </div>
                        <div>
                          <div className={machinestyles.header}>Færdig</div>
                          <div>{machine.time ? datePart + " " + timePart : "Mangler tid"}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ background: "#F3AB23", height: "200px", width: "80px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                      <div id="stopwateringbutton" style={{background: "dodgerblue", fontSize: "12px"}} onClick={() => {
                        var verify = window.confirm("Er du sikker på at du vil ændre tid på maskinen?")

                        if (!verify === true) return;
                        
                        router.push("/choosetime/" + machine.id)
                      }}>
                        <h4>INDSTIL TID</h4>
                      </div>
                      <div>Venter</div>
                      <div style={{ background: "#DF4848" }} id="stopwateringbutton" onClick={(event) => {
                        var confirmed = window.confirm("Er du sikker på at du vil stoppe vanding?")
                        
                        if (!confirmed === true) return;

                        stopMachine(machine)
                        router.push("/overview")
                      }}>
                        <h4>STOP</h4>
                      </div>
                    </div>
                  </div>
                  )
              }) : <></>}
          </div>
          {machines.filter(machine => new Date() > new Date(machine.time) && machine.active == 1 && machine.time != null).length > 0 ? <h1 className={machinestyles.tableLabel}>Færdige vandinger</h1> : <></>}
          <div className={machinestyles.machineContainer}>
            {machines ? machines.filter(machine => new Date() > new Date(machine.time) && machine.active == 1 && machine.time != null).sort((a, b) => a.time - b.time).map(function(machine) {
                  var datePart = new Date(machine["time"]).toLocaleString("da-DK", {
                    month: "short", day: "numeric"
                  });
                  var timePart = new Date(machine["time"]).toLocaleTimeString("da-DK", {
                    hour: "numeric", minute: "numeric"
                  }).replace("." , ":")

                  return (
                  <div className={machinestyles.machine} key={machine["id"]}>
                    <div className={machinestyles.mainContainer}>
                      <div style={{height: "198px"}} className={machinestyles.dataContainer}>
                        <div>
                          <div className={machinestyles.header}>Maskine</div>
                          <div>{machine["id"]}</div>
                        </div>
                        <div>
                          <div className={machinestyles.header}>Pumpe</div>
                          <div>{machine["pumpname"]}</div>
                        </div>
                        <div>
                          <div className={machinestyles.header}>Færdig</div>
                          <div>{machine.time ? datePart + " " + timePart : "Mangler tid"}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ background: "#DF4848", height: "200px", width: "80px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                      <div id="stopwateringbutton" style={{background: "dodgerblue", fontSize: "12px"}} onClick={() => {
                        var verify = window.confirm("Er du sikker på at du vil ændre tid på maskinen?")

                        if (!verify === true) return;
                        
                        router.push("/choosetime/" + machine.id)
                      }}>
                        <h4>INDSTIL TID</h4>
                      </div>
                      <div>Færdig</div>
                      <div style={{ background: "darkorange" }} id="stopwateringbutton" onClick={(event) => {
                        var confirmed = window.confirm("Er du sikker på at du vil stoppe vanding?")
                        
                        if (!confirmed === true) return;

                        stopMachine(machine)
                        router.push("/overview")
                      }}>
                        <h4>FJERN</h4>
                      </div>
                    </div>
                  </div>
                  )
              }) : <></>}
          </div>

          {machines.filter(machine => new Date() < new Date(machine.time) && machine.active == 1).length > 0 ? <h1 className={machinestyles.tableLabel}>Aktive vandinger</h1> : <></>}
          <div className={machinestyles.machineContainer}>
            {machines ? machines.filter(machine => new Date() < new Date(machine.time) && machine.active == 1).sort((a, b) => a.time - b.time).map(function(machine) {
              var datePart = new Date(machine["time"]).toLocaleString("da-DK", {
                month: "short", day: "numeric"
              });
              var timePart = new Date(machine["time"]).toLocaleTimeString("da-DK", {
                hour: "numeric", minute: "numeric"
              }).replace("." , ":")
              
              return (
                  <div className={machinestyles.machine} key={machine["id"]}>
                    <div className={machinestyles.mainContainer}>
                      <div style={{height: "198px"}} className={machinestyles.dataContainer}>
                        <div>
                          <div className={machinestyles.header}>Maskine</div>
                          <div>{machine["id"]}</div>
                        </div>
                        <div>
                          <div className={machinestyles.header}>Pumpe</div>
                          <div>{machine["pumpname"]}</div>
                        </div>
                        <div>
                          <div className={machinestyles.header}>Færdig</div>
                          <div>{datePart + " " + timePart}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{background: "#42CB6B", height: "200px", width: "80px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                      <div id="stopwateringbutton" style={{background: "dodgerblue", fontSize: "12px"}} onClick={() => {
                        var verify = window.confirm("Er du sikker på at du vil ændre tid på maskinen?")

                        if (!verify === true) return;

                        router.push("/choosetime/" + machine.id)
                      }}>
                        <h4>INDSTIL TID</h4>
                      </div>
                      <div>Aktiv</div>
                      <div id="stopwateringbutton" onClick={(event) => {
                        var confirmed = window.confirm("Er du sikker på at du vil stoppe vanding?")

                        if (!confirmed === true) return;

                        // sendStopSMS(pumpnumber, pumpstopcode)

                        stopMachine(machine)
                        router.push("/overview")

                      }}>
                        <h4>STOP</h4>
                        </div>
                    </div>
                  </div>
              )
            }) : <></>}
          </div>
        </div>
        
      </React.Fragment>
  )
}

export async function getServerSideProps() {
  var machineResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/machines")
  var machines = await machineResponse.json()

  var pumpResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/pumps")
  var pumps = await pumpResponse.json()

  return {
    props: { 
      machineProps: machines,
      pumpProps: pumps
    },
  }
}

export default Overview;
