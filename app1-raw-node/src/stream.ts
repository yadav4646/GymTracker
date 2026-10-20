import { Readable, Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";
// Readable
const Myreadable = Readable.from(["hello", "There"]);

// transform

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    const text = chunk.toString();
    callback(null, text.toUpperCase());
  },
});

// writeable
const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log("Recieved Chunk", chunk.toString());
    callback();
  },
});

async function main(): Promise<void> {
  try {
    await pipeline(Myreadable, uppercase, writable);
    console.log("stream completed");
  } catch (error) {
    console.log(error);
  }
}

main();
