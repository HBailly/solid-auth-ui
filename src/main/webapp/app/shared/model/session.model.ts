import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export class Session {
  id: string = uuidv4();
  date = new Date(Date.now());
  completed = false;

  chronos: Array<Chrono> = [new Chrono(), new Chrono(), new Chrono()];

  async upload() {
    console.log('Uploading session...');
    console.log(this);
    await axios
      .post('/survey/session', this)
      .then(() => {
        console.log('Session uploaded.');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export class Chrono {
  startTime: Date;
  stopTime: Date;

  public start(): void {
    if (this.startTime == null) {
      console.log('Starting chronometer...');
      this.startTime = new Date(Date.now());
    }
  }

  public stop(): void {
    if (this.stopTime == null) {
      console.log('Stopping chronometer...');
      this.stopTime = new Date(Date.now());
    }
  }
}
