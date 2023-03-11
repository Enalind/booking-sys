
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"
import {firebase, firestore, env} from "../../utils/firebase"
import { useEffect, useState } from 'react';

function Book({data}){
    const [Docs, GetDocs] = useState([])
    async function getDocuments(){
        const docRef = await getDocs(collection(firestore, "Calendars"))
        docRef.forEach(doc => {
            console.log(doc.data)
        })
        return docRef.docs
    }

    useEffect(() => {
        getDocuments().then(res => console.log(res))
        console.log(data)
    }, [])
    
    return<p>Hello</p>
}

export async function getServerSideProps(){
    
    const data = env
    return {props: {data}}
}

export default Book