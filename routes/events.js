const { Router } = require("express");
const router = Router({ mergeParams: true });
const EventDAO = require('../daos/events');
const CalendarDAO = require('../daos/calendars');

router.get('/', async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const calendar = await CalendarDAO.getById(calendarId);
        if (!calendar) {
            res.sendStatus(404);
            return;
        }
        const events = await EventDAO.getAllEventsByCalendarId(calendarId);
        res.json(events);
    } catch (e) {
        console.log("Exception! - " + e);
        next(e)
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;
        const eventId = req.params.id;
        const event = await EventDAO.getById(eventId, calendarId);
        
        if (event == null) { 
            res.sendStatus(404);            
            return;
        }
        res.json(event);            
    } catch (e) {
        console.log("Exception! - " + e);
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const calendarId = req.params.calendarId;

        if (req.body.name === null || req.body.date === null) {
            res.sendStatus(400);
            return;
        }

        await EventDAO.create(req.body.name, req.body.date, calendarId);
        res.sendStatus(200);
    } catch (e) {
        console.log("Exception! - " + e);
        next(e);
    }
});

router.put("/:id", async (req, res, next) => {

    try {
        const itemId = req.params.id;
        const calendarId = req.params.calendarId;
        const newObj = req.body;

        const updatedEvent = await EventDAO.updateById(itemId, calendarId, newObj);

        if (updatedEvent)
            res.json(updatedEvent);
        else
            res.sendStatus(404);
    } catch (e) {
        console.log("Exception! - " + e);
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const calendarId = req.params.calendarId;
        const event = await EventDAO.getById(itemId,calendarId);

        if (!event || !event.calendarId.equals(calendarId)) {
            res.sendStatus(404);
            return;
        }

        const deletedEvent = await EventDAO.removeById(req.params.id);
        if (deletedEvent) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        console.log("Exception! - " + e);
        next(e);
    }
});

module.exports = router;