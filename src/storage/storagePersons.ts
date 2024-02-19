import { differenceInSeconds, set, sub } from "date-fns";
import { Person, TimeStampType } from "../types/person";
import { v4 as uuidv4 } from "uuid";

export const STORAGE_KEY = "persons";

class StoragePerson {
  getKey(time?: string | Date): string {
    return set(time || new Date(), { hours: 0 }).toDateString();
  }

  getTime(time?: string | Date): string {
    return set(time || new Date(), { milliseconds: 0 }).toUTCString();
  }

  calcId(): number {
    const persons = this.getPersons();

    const findLastId = persons?.reduce(
      (lastId, { id }) => (id > lastId ? id : lastId),
      -1
    );

    const lastId = findLastId !== undefined ? findLastId : -1;

    return lastId + 1;
  }

  createPerson(name: string, id: number) {
    const person: Person = { name, timestamps: {}, id };

    this.setPerson(person);
  }

  setPersons(persons: Person[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persons));
  }

  setPerson(person: Person) {
    const persons = this.getPersons();

    const needIndex = persons?.findIndex((it) => it.id === person.id);

    if (persons) {
      if (needIndex !== undefined && needIndex >= 0) {
        persons[needIndex] = person;
      } else {
        persons.push(person);
      }

      this.setPersons(persons);
    } else {
      this.setPersons([person]);
    }
  }

  getPersons(): Person[] | undefined {
    const jsonPersons = localStorage.getItem(STORAGE_KEY);
    if (jsonPersons) {
      return JSON.parse(jsonPersons) as Person[];
    }
  }

  getPerson(id: number): Person | undefined {
    const persons = this.getPersons();

    return persons?.find((it) => it.id === id);
  }

  addTimestamp(time: string | Date, type: TimeStampType, id: number) {
    const person = this.getPerson(id);

    if (person) {
      const key = this.getKey(time);
      const timestamp = { time: this.getTime(time), type, id: uuidv4() };
      if (person.timestamps[key]) {
        person.timestamps[key].push(timestamp);
      } else {
        person.timestamps[key] = [timestamp];
      }

      this.setPerson(person);

      return person;
    }
  }

  deletePerson(id: number) {
    const persons = this.getPersons();
    const clearPersons = persons?.filter((it) => it.id !== id) || [];

    this.setPersons(clearPersons);
  }

  getIsSleep(id: number) {
    const person = this.getPerson(id);
    const keyCurrDay = storagePerson.getKey();
    const keyYesterday = storagePerson.getKey(sub(new Date(), { days: 1 }));
    const timestampsCurrDay = person?.timestamps[keyCurrDay];
    const timestamps = timestampsCurrDay || person?.timestamps[keyYesterday];

    if (timestamps) {
      const lastTimestapm = timestamps.sort((a, b) =>
        differenceInSeconds(b.time, a.time)
      )[0];

      return lastTimestapm?.type !== TimeStampType.WokeUp;
    }
  }
}

export const storagePerson = new StoragePerson();
