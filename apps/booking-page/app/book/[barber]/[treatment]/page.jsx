import {firestore} from "../../../../utils/firebase"
import {collection, getDocs, doc, getDoc } from "firebase/firestore"
import { Koulen } from "next/font/google";
import moment from "moment"
import { extendMoment } from 'moment-range';
import styles from "./styles.module.css"
const koulen = Koulen({weight: "400", subsets: ["latin"]});
const extendedMoment = extendMoment(moment)
async function getStartEnd(barber, date){
    const calendarDocSnap = await getDocs(collection(firestore, `Calendars/${barber}/${date.toString()}`))
    for (const i in calendarDocSnap.docs){
        const doc = calendarDocSnap.docs[i]
        if(doc.id === "StartEnd"){
            return doc.data()
        }
    }
}
async function getBreaks(barber, date){
    var breaks = []
    const calendarDocSnap = await getDoc(doc(firestore, `Calendars/${barber}/${date.toString()}/Breaks`))
    Object.values(calendarDocSnap.data()).forEach(data => {
        breaks.push(data.map(dataItem => moment(dataItem, "HH:mm")))
    })
    const bookings = await getDocs(collection(firestore, `Calendars/${barber}/${date.toString()}/Breaks/Bookings`))
    for(const i in bookings.docs){
        const booking = bookings.docs[i]
        breaks.push(booking.data()["StartStop"].map(dataItem => moment(dataItem, "HH:mm")))
    }
    return breaks
}
function getFreeTimes(startEnd, breaks, treatmentTime){
    var initialTime = moment(startEnd.Start, "HH:mm")
    var stopTime = moment(startEnd.End, "HH:mm")
    var availiableTimes = []
    
    while(initialTime.isBefore(stopTime)){
        var boolArray = []
        var range = extendedMoment.range(initialTime, initialTime.clone().add(treatmentTime-1, "minutes"))
        breaks.forEach(singleBreak => {
            const breakRange = extendedMoment.range(singleBreak[0], singleBreak[1])
            console.log(breakRange, range, range.overlaps(breakRange, {adjacent: false}))
            boolArray.push(range.overlaps(breakRange, {adjacent: false}))
        })
        if(boolArray.every(e => e === false)){
            availiableTimes.push(initialTime.clone())
        }
        initialTime.add(treatmentTime, "minutes")
        
    }
    return availiableTimes
}
async function getTreatmentTime(barber, treatment){
    const treatmentDocSnap = await getDoc(doc(firestore, `Calendars/${barber}/Treatments/${treatment}`))
    return treatmentDocSnap.data()["Time"]
}
export default async function Calendar({params}){
    var startEnd = await getStartEnd(params.barber, moment(moment().subtract(1, "days")).format("YYYYMMDD"))
    var breaks = await getBreaks(params.barber, moment(moment().subtract(1, "days")).format("YYYYMMDD"))
    var treatmentTime = await getTreatmentTime(params.barber, params.treatment)
    var freeTimes = getFreeTimes(startEnd, breaks, treatmentTime)
    console.log(freeTimes.map(freeTime => freeTime.format("HH:mm")))
    return<p>Hello</p>
}