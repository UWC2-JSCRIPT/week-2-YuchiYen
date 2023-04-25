const Events = require('../models/events');

module.exports = {};

module.exports.getAllEventsByCalendarId = async (id) => {
    try {
        const result = await Events.find({calendarId: id}) 
        return result;
    } catch (e) {
        console.log("exception! getAllEventsByCalendarId - " + e );
        return null;
    }
};

module.exports.getById = async (eventId, calendarId) => {
    try {
        const event = await Events.findOne({ _id: eventId, calendarId: calendarId }).lean();
        return event;
    } catch (e) {
        console.log("exception! getAllEventsByCalendarId - " + e );
        return null;
    }
};

module.exports.create = async (name, date, calendarId ) => {
    return await Events.create({ name: name, date: date, calendarId, calendarId });
  };

  module.exports.updateById = async (id, calendarId, newData) => {
    try {
        const event = await Events.findOneAndUpdate({ _id: id, calendarId: calendarId }, newData, { new: true }).lean();
        return event;
    } catch (e) {
        console.log("updateById exception: " + e);
        next(e);
    }
  };  

  module.exports.removeById = async (id) => {
    try {
      const event = await Events.findByIdAndDelete(id);
      return event;
    } catch (e) {
        console.log("Events removeById Exception: " + e);
      return null;
    }
  };





