import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import EditNote from "../../components/EditNote"
import DeleteNote from "../../components/DeleteNote"
import Header from "../../components/Header"

function Machine({ query }) {
    const [machine, setMachine] = useState({})
    const [note, setNote] = useState("")
    const [testNote, setTestNote] = useState({})
    const [notes, setNotes] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [passNote, setPassNote] = useState({})
    const maxCharacters = 190

    const router = useRouter();

    const HandleClick = () => {
        router.push("/maintenance")
    }
    
    const CreateNote = () => {
        if (note == "") return;  

        fetch(`/api/machines/note/${machine.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: note
            })
        }).then(res => res.json()).then(json => {
            setNotes(json.maintenances)
            setMachine(json)
            setNote("")
        })
    }

    const ShowNote = (note) => {
        setPassNote(note)
        setShowModal(true)
    }

    useEffect(() => {
        fetch("/api/machines/" + query.mid)
            .then(res => res.json())
            .then(json => {
                setNotes(json.maintenances)
                setMachine(json)
            })
    }, [])

    var datePart = new Date(machine.time).toLocaleString("da-DK", {
        month: "short", day: "numeric"
    });
    var timePart = new Date(machine.time).toLocaleTimeString("da-DK", {
        hour: "numeric", minute: "numeric"
    }).replace("." , ":")

    return(
        <div>
            <Header />
            <div id="shownmachine">
                <button id="backbutton" onClick={HandleClick}>Tilbage</button>
                <div id="allmachineattributes">
                    <div className="machineattributes">
                        <h1 className="showmachineh1">Maskine nr.</h1>
                        <p>{machine ? machine.id : "Fejl"}</p>
                    </div>
                    <div className="machineattributes">
                        <h1 className="showmachineh1">Pumpe navn</h1>
                        <p>{machine ? machine.pumpname == null ? "Ingen pumpe" : machine.pumpname : "Fejl"}</p>
                    </div>
                    <div className="machineattributes">
                        <h1 className="showmachineh1">Tid tilbage</h1>
                        <p>
                            {machine ? machine.time == null ? "Ingen tid" : datePart + " " + timePart : "Fejl"}
                        </p>
                    </div>
                    <div className="machineattributes">
                        <h1 className="showmachineh1">Aktivitet</h1>
                        <p>{machine ? machine.active === 0 ? "Inaktiv" : "Aktiv" : "Fejl"}</p>
                    </div>
                </div>
                <div id="allaboutnotes">
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        CreateNote()
                    }}>
                        <h2 id="createnotetext">Tilføj vedligeholdelses note til maskine</h2>
                        <label>Note:</label>
                        <input id="createnoteinput" type="text" required onChange={(e) => {
                            if (e.target.value.length < maxCharacters) {
                                setNote(e.target.value)
                                
                            } else {
                                alert("Du må ikke skrive mere end " + maxCharacters +  " karakterer")
                            }
                        }} value={note}></input>
                        <button id="createnotebutton" type="submit">Opret note</button>
                    </form>
                    <div id="shownotes" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "50px", alignItems: "center", marginTop: "20px" }}>
                        {notes ? notes.map((note, index) => {
                            var time = new Date(note.time).toLocaleString("da-DK" , {month: "short", day: "numeric", year: "numeric"})
                            return (
                                <div key={index} style={{ width: "300px", minHeight: "130px", borderRadius: "12px", background: "whitesmoke", display: "flex", overflow: "hidden" }}>
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", width: "250px", gap: "20px" }}>
                                        <div style={{ textAlign: "start", display: "flex", flexDirection: "column", gap: "6px", marginLeft: "10px", marginTop: "10px" }}>
                                            <div style={{ color: "gray" }}>Dato</div>
                                            <div>{time}</div>
                                        </div>
                                        <div style={{ textAlign: "start", display: "flex", flexDirection: "column", gap: "6px", marginLeft: "10px", marginBottom: "10px" }}>
                                            <div style={{ color: "gray" }}>Note</div>
                                            <div>{note.note}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <button onClick={() => {ShowNote(note)}} style={{ display: "flex", width: "60px", height: "50%", background: "orange", fontSize: "24px", alignItems: "center", justifyContent: "center" }}><img src="https://icons-for-free.com/iconfiles/png/512/draw+edit+pen+pencil+text+write+icon-1320162307919760358.png" style={{ width: "28px" }}/></button>
                                        <button onClick={() => {
                                            setPassNote(note)
                                            setShowDeleteModal(true)
                                        }} style={{ width: "60px", height: "50%", background: "red", fontSize: "24px" }}>X</button>
                                    </div>
                                </div>
                            )
                        }) : <></>}
                    </div>
                </div>
            </div>

            
            {showModal ? <EditNote notes={notes} passNote={passNote} setShowModal={setShowModal} setNotes={setNotes} machine={machine} setMachine={setMachine}/> : <></>}
            {showDeleteModal ? <DeleteNote notes={notes} setNotes={setNotes} machine={machine} setShowDeleteModal={setShowDeleteModal} passNote={passNote} setMachine={setMachine}/> : <></>}
        </div>
    )
}

export async function getServerSideProps(context) {

    return {
        props: { query: context.query }, // will be passed to the page component as props
    }
}
export default Machine;