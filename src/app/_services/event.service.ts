import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Event } from "../_models/Event";
import {ContactUs} from "../_models/ContactUs";

@Injectable({
  providedIn: "root"
})
export class EventService {
  eventsCollection: AngularFirestoreCollection<Event>;
  eventDoc: AngularFirestoreDocument<Event>;
  events: Observable<Event[]>;
  event: Observable<Event>;

  messagesCollection:AngularFirestoreCollection<ContactUs>;
  messageDoc:AngularFirestoreDocument<ContactUs>;
  messages:Observable<ContactUs[]>;
  message:Observable<ContactUs>;

  constructor(private afs: AngularFirestore) {
    this.eventsCollection = this.afs.collection<Event>("Events");
    this.messagesCollection=this.afs.collection<ContactUs>("Messages");
  }

  newEvent(event: Event) {
    this.eventsCollection.add(event);
  }

  getEvents(): Observable<Event[]> {
    this.events = this.eventsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Event;
          data.LastName = action.payload.doc.id;
          return data;
        });
      })
    );
    return this.events;
  }

  newMessage(message:ContactUs) {

    this.messagesCollection.add(message);

  }
}
