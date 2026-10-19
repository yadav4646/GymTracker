import EventEmitter from "node:events";

// emit one event -> listerns listen to this event, do something.
//
// .on() -> register one listener
// .once() -> register one listener that runs only once.
// .emit() -> triggers an event and sends to the listeners

const appEvent = new EventEmitter();

type UserRegister = {
  id: number;
  name: string;
};

appEvent.on("checkInDesk", (checkIns: UserRegister) => {
  console.log(checkIns);
  console.log(`Good morning ${checkIns.name}`);
});

appEvent.once("checkInDesk", (checkIns: UserRegister) => {
  console.log(`Welcome to ${checkIns.name}`);
});

function registerUser(id: number, name: string): void {
  appEvent.emit("checkInDesk", { id, name });
}
registerUser(1, "Kuldeep");
registerUser(2, "Yadav");
registerUser(3, "Sish");
registerUser(4, "ramm4");
registerUser(5, "Kumar");
