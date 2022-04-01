import { Schema, model, Document } from "mongoose";

interface EventsProps extends Document {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgcolor: string;
  user: any;
}

const EventShema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    bgcolor: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

EventShema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default model<EventsProps>("Event", EventShema);
