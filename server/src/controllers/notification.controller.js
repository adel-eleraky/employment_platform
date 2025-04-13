import Notification from "../DB/models/notification.model.js"


export const saveNotification = async (employee , message) => {

    const notification = await Notification.create({ employee , message})
}