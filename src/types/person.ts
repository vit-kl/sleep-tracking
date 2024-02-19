export type Person = {
  name: string;
  timestamps: Record<string, TimeStamp[]>;
  id: number;
};

export type TimeStamp = {
  time: string;
  type: TimeStampType;
  id: string;
};

export enum TimeStampType {
  FellAsleep = "fellAsleep",
  WokeUp = "wokeUp",
  SleepExtension = "sleepExtension",
}
