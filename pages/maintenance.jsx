import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import Header from "./../components/Header";
import cookie from "cookie-cutter"

function Maintenance({ history, setNotes, machineProps }) {

  const router = useRouter();

  const [machines, setMachines] = useState(machineProps)
  const [shownMachine, setShownMachine] = useState({})

  const HandleClick = (machine) => {

    setShownMachine(machine)
    router.push("/machine/" + machine.id)
  }

  useEffect(function () {
    // fetch("http://remote.kkpartner.dk:3001/getnotes")
    //   .then(function (data) {
    //     return data.json();
    //   }).then(function (json) {
    //     setNotes(json)
    //   }).catch((error) => {
    //     console.log(error);
    //   });
  }, [setNotes])

  useEffect(() => {
    var bool = cookie.get("loggedin")
    if (bool && bool == "true") {
      return
    } else {
      router.push("/")
    }
  }, [])

  return (
    <React.Fragment>
      <Header />
      <div id="maintenance">
        <h1 id="maintenancetext">Tryk på en boks for at tilgå maskinen</h1>
        {machines ? machines.map((machine) => {
          var data = machine.active == 1 ? {
            color: "#42CB6B",
            active: "Aktiv",
            pumpname: machine.pumpname,
            time: new Date(machine["time"]).toLocaleString("da-DK", {
              dateStyle: "medium",
              timeStyle: "short"
            })
          } : {
            color: "#DF4848",
            active: "Inaktiv",
            pumpname: "Ingen pumpe",
            time: "Ingen tid",
          }
          return (
              <button key={machine.id} id="maintenanceboxes" onClick={() => { HandleClick(machine) }}>
                <div>
                  <h1 id="machineid">
                    {machine.id}
                  </h1>
                  <div id="hid-box" style={{ background: data.color }}>
                    <p id="active">
                      {data.active}
                    </p>
                    <div id="maintenanceboxhover">
                      <p className="maintenanceboxheading">
                        Pumpenavn
                      </p>
                      <h3 className="maintenanceboxtext">
                        {data.pumpname}
                      </h3>
                      <p className="maintenanceboxheading">
                        Stop tidspunkt
                      </p>
                      <h3 className="maintenanceboxtext">
                        {data.time}
                      </h3>
                    </div>
                  </div>
                </div>
              </button>
          )
        }) : <></>}
      </div>
    </React.Fragment>
  )


}

export async function getServerSideProps() {
  var machineResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/machines")
  var machines = await machineResponse.json()

  return {
    props: { 
      machineProps: machines,
    },
  }
}

export default Maintenance;