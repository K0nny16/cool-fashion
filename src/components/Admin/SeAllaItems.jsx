import { Footer } from "../footer";
import { Navbar } from "../nav";
import { AllItems } from "./AllItems";

export function SeAllaItems(){
    return(
        <>
            <Navbar/>
            <AllItems/>
            <Footer/>
        </>
    )
}