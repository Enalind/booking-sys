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
        var range = extendedMoment.range(initialTime, initialTime.clone().add(treatmentTime, "minutes").subtract(1, "milliseconds"))
        breaks.forEach(singleBreak => {
            const breakRange = extendedMoment.range(singleBreak[0], singleBreak[1])
            
            boolArray.push(range.overlaps(breakRange, {adjacent: false}))
        })
        if(boolArray.every(e => e === false)){
            availiableTimes.push(initialTime.clone())
        }
        initialTime.add(treatmentTime, "minutes")
        
    }
    return availiableTimes
}
function getAllTimes(startEnd, increment){
    var initialTime = moment(startEnd.Start, "HH:mm")
    var stopTime = moment(startEnd.End, "HH:mm")
    var times = []
    while (initialTime.isSameOrBefore(stopTime)){
        times.push(initialTime.clone())
        initialTime.add(increment, "minutes")
    }
    return times
}
async function getTreatmentTime(barber, treatment){
    const treatmentDocSnap = await getDoc(doc(firestore, `Calendars/${barber}/Treatments/${treatment}`))
    return treatmentDocSnap.data()["Time"]
}
async function getTimes(barber, treatment, date){
    var startEnd = await getStartEnd(barber, date)
    var breaks = await getBreaks(barber, date)
    var treatmentTime = await getTreatmentTime(barber, treatment)
    var freeTimes = getFreeTimes(startEnd, breaks, treatmentTime)
    return {freeTimes: freeTimes.map(freeTime => freeTime.format("HH:mm")), startEnd: startEnd}
}
export default async function Calendar({params}){
    var date = moment(moment().subtract(1, "days")).format("YYYYMMDD")
    const timesObj = await getTimes(params.barber, params.treatment, date, 30)
    const freeTimes = timesObj["freeTimes"]
    const allTimes = getAllTimes(timesObj.startEnd, 30).map(e => e.format("HH:mm"))
    console.log(freeTimes, allTimes)
    return <div className={styles.pageWrapper} style={{gridTemplateRows: Array.of(allTimes.length).fill("auto").join(" ")}}>
        {allTimes.map((time, i) => {
            if(freeTimes.indexOf(time) === -1){
                return <div className={styles.box} style={{backgroundColor: "red"}}>{time.toString()}</div>
            }
            else{
                return <div className={styles.box} style={{backgroundColor: "green"}}>{time.toString()}</div>
            }
            
        }) }

    </div>
}