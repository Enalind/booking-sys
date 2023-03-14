import {QueryDocumentSnapshot} from "firebase/firestore"

export interface Appointment{
    mail: string,
    treatment: string,
    start: Date,
    end: Date
}
export const AppointmentConverter = {
    toFirestore: (data: Appointment) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) =>
        snap.data() as Appointment
}