import {firestore} from "../../../../utils/firebase"
import {collection, getDocs, doc, getDoc } from "firebase/firestore"
import { Koulen } from "next/font/google";
import moment from "moment"
import styles from "./styles.module.css"
const koulen = Koulen({weight: "400", subsets: ["latin"]});
async function getStartEnd(barber, date){
    console.log(barber)
    const calendarDocSnap = await getDocs(collection(firestore, `Calendars/${barber}/${date.toString()}`))
    for (const i in calendarDocSnap.docs){
        const doc = calendarDocSnap.docs[i]
        if(doc.id === "StartEnd"){
            return doc.data()
        }
    }
}
async function getBreaks(date){
    const calendarDocSnap = await getDoc(doc(firestore, "Calendars", barber, date.toString(), "Breaks"))
    console.log(calendarDocSnap.data())
}
export default async function Calendar({params}){
    console.log(typeof params.barber)
    var StartEnd = await getStartEnd(params.barber, moment(moment().subtract(1, "days")).format("YYYYMMDD"))
    await getBreaks()

    return<p>Hello</p>
}