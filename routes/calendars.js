const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const calendars = await CalendarDAO.getAll();
    res.json(calendars);
  } catch (e) {
    console.log("Exception! CalendarDAO.getAll() - " + e);
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.id);
    if (calendar) {
      res.json(calendar);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log("Exception! CalendarDAO.getById(req.params.id) - " + e);
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (req === undefined || req.body === undefined || req.body.name === undefined) {
      res.sendStatus(400);
      return;
    }
    await CalendarDAO.create(req.body.name);
    res.sendStatus(200);
  } catch (e) {
    console.log("Exception! CalendarDAO.create(req.body.name) - " + e);
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {

  try {
    const itemId = req.params.id;
    const newObj = req.body;

    if (req === undefined || req.body === undefined || req.body.name === undefined) {
      res.sendStatus(400);
      return;
    }

    const calendar = await CalendarDAO.getById(itemId);
    if (!calendar) {
      res.sendStatus(404);
      return;
    }
    const updatedCalendar = await CalendarDAO.updateById(itemId, newObj);

    if (updatedCalendar)
      res.json(updatedCalendar);
    else
      res.sendStatus(500);
  } catch (e) {
    console.log("Exception! router.put - " + e);
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.removeById(req.params.id);
    if (calendar) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log("Exception! CalendarDAO.removeById(req.params.id) - " + e);
    next(e);
  }
});

module.exports = router;