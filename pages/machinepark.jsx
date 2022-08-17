import React, {useEffect, useState} from 'react';
import cookie from "cookie-cutter"

import Header from "../components/Header"

import Pumps from "../components/Pumps"
import Machines from "../components/Machines"

import CreateMachine from "../components/CreateMachine"
import UpdateMachine from "../components/UpdateMachine"
import DeleteMachine from "../components/DeleteMachine"

import CreatePump from "../components/CreatePump"
import UpdatePump from "../components/UpdatePump"
import DeletePump from "../components/DeletePump"
import { useRouter } from 'next/router';


const MachinePark = ({machineProps, pumpProps}) => {
  const [currentMachine, setCurrentMachine] = useState({})
  const [showingModal, setShowingModal] = useState({pump: false, createpump: false, deletepump: false, machine: false, createmachine: false, deletemachine: false})
  const [currentPump, setCurrentPump] = useState({
    name: "",
    number: "",
    startcode: "",
    stopcode: ""
  })
  const [pumps, setPumps] = useState(pumpProps) 
  const [machines, setMachines] = useState(machineProps)

  const router = useRouter()

  useEffect(() => {
    var bool = cookie.get("loggedin")
    if (bool && bool == "true") {
      return
    } else {
      router.push("/")
    }
  }, [])

  return (
    <div>
      <Header />
      <Pumps setCurrentPump={setCurrentPump} setShowingModal={setShowingModal} showingModal={showingModal} pumps={pumps}/>
      <Machines setCurrentMachine={setCurrentMachine} setShowingModal={setShowingModal} showingModal={showingModal} machines={machines}/>

      <React.Fragment>
        {showingModal.createpump ? <CreatePump    setShowingModal={setShowingModal} showingModal={showingModal} setPumps={setPumps} pumps={pumps}/> : <></>}
        {showingModal.pump ? <UpdatePump    setShowingModal={setShowingModal} currentPump={currentPump} showingModal={showingModal} pumps={pumps} setPumps={setPumps}/> : <></>}
        {showingModal.deletepump ? <DeletePump    setShowingModal={setShowingModal} currentPump={currentPump} showingModal={showingModal} setPumps={setPumps} pumps={pumps}/> : <></>}

        {showingModal.createmachine ? <CreateMachine setShowingModal={setShowingModal} showingModal={showingModal} machines={machines} setMachines={setMachines} /> : <></>}
        {showingModal.machine ? <UpdateMachine setShowingModal={setShowingModal} currentMachine={currentMachine} showingModal={showingModal} machines={machines} setMachines={setMachines}/> : <></>}
        {showingModal.deletemachine ? <DeleteMachine setShowingModal={setShowingModal} currentMachine={currentMachine} showingModal={showingModal} machines={machines} setMachines={setMachines}/> : <></>}
      </React.Fragment>
    </div>
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

export default MachinePark;