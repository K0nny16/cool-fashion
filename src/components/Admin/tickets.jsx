import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestoreDB } from "../../firebase";
import "../../css/tickets.css"

export function Tickets(){
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestoreDB,"Support"),(snapshot)=> {
            const fetchedTickets = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTickets(fetchedTickets);
        })
        return () => unsubscribe;
    },[])

    const handleDelete = async (id) => {
        try{
            await deleteDoc(doc(firestoreDB,"Support",id));
            alert("Ticket deleted!")
        }catch(error){
            console.error(error)
            alert("Error")
        }
    }

    return (
        <div className="tickets-container">
            <h2>Support Tickets</h2>
            {tickets.length === 0 ? (
                <p>Inga tickets tillgängliga!</p>
            ):(
                <ul>
                    {tickets.map((ticket) => (
                        <li key={ticket.id}>
                            <p>
                                <strong>Email:</strong> {ticket.email}
                            </p>
                            <p>
                                <strong>Message:</strong> {ticket.message}
                            </p>
                            <p>
                                <strong>Post date:</strong> {new Date(ticket.date).toISOString().split("T")[0]}
                            </p>
                            <button onClick={() => handleDelete(ticket.id)}>Tabort</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}