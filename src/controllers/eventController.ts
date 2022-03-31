import { Request, RequestHandler, Response } from "express";
import Event from "../models/Events";
export const getEvents: RequestHandler = async (req: Request, res: Response) => {
  const allEvents = await Event.find().populate("user", "fullName");
  return res.status(200).json({
    ok: true,
    msg: "Se obtuvieron todos los eventos",
    allEvents,
  });
};

export const createdEvent: RequestHandler = async (req: Request, res: Response) => {
  const event = new Event(req.body);

  try {
    event.user = req.body.uid;
    const eventSave = await event.save();
    console.log(eventSave.id);
    return res.status(201).json({
      ok: true,
      msg: "Evento creado satisfactoriamente",
      event: eventSave,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Algo salio mal al crear un evento",
    });
  }
};

export const updatedEvent: RequestHandler = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  const uid = req.body.uid;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no disponible",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes los permisos correspondiente",
      });
    }

    const newEvento = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvento, { new: true });

    return res.status(200).json({
      ok: true,
      msg: "Se actualizo correctamente",
      event: eventUpdated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error a actualizar el evento",
    });
  }
};
export const deletedEvent: RequestHandler = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  const uid = req.body.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no disponible",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes los permisos correspondiente",
      });
    }

    await Event.findByIdAndDelete(eventId);

    return res.status(200).json({
      ok: true,
      msg: "Se elimino el evento satisfactoriamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al eliminar el evento",
    });
  }
};
