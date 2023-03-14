import {firestore} from "../../../utils/firebase"
import {collection, getDocs } from "firebase/firestore"
import styles from "./styles.module.css"
import { Koulen } from "next/font/google";
import Link from "next/link";
const koulen = Koulen({weight: "400", subsets: ["latin"]});

export default async function TreatmentSelection({params}){
    const docRef = collection(firestore, "Calendars", params.barber, "Treatments")
    const docSnap = await getDocs(docRef)
    var treatments: Array<object> = []
    
    for (const docSnapIndex in docSnap.docs){
        const docSnapObj = docSnap.docs[docSnapIndex]
        console.log(docSnapObj.data())
        treatments.push({name: docSnapObj.id, description: docSnapObj.data().Description, price: docSnapObj.data().Price, time: docSnapObj.data().Time})
    }
    return<div className={styles.wrapper}>
        {treatments.map(treatment => {
            return <Link href={`/book/${params.barber}/${treatment.name}`} className={`${koulen.className} ${styles.treatmentWrapper}`}>
            <h1>{treatment.name}</h1>   
            <div className={styles.infoWrapper}>
                <p>{treatment.description}</p>
                <p>{treatment.price} kr &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {treatment.time} minutes</p>
               
            </div>
        </Link>
    })}</div>
}