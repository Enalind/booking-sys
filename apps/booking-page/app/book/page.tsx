
import Image from "next/image"
import { Koulen } from "next/font/google"
import {collection, getDocs } from "firebase/firestore"
import {firestore, storage} from "../../utils/firebase"
import {ref, getDownloadURL} from "firebase/storage"
import styles from "./styles.module.css"
import Link from "next/link"

const koulen = Koulen({weight: "400", subsets: ["latin"]});

export default async function Book(){
    const docRef = collection(firestore, "Calendars")
    const docSnap = await getDocs(docRef)
    
    var calendars: Array<object> = []
    
    for (const docSnapIndex in docSnap.docs){
        const docSnapObj = docSnap.docs[docSnapIndex]
        var url = await getDownloadURL(ref(storage, `${docSnapObj.id}.jpg`))
        calendars.push({id: docSnapObj.id, url: url})
    }
    
  
    return <div className={`${styles.barberWrapper}`}>
        
        {calendars.map(calendar => {
            
            return (<Link href={`/book/${calendar.id}`} key={calendar.id} className={styles.profileWrapper}>
                <p className={koulen.className}>{calendar.id}</p>
                
                <Image src={calendar.url} alt={calendar.id} width={100} height={100} className={styles.image}/>
                
            </Link>)
        })}
        </div>
}