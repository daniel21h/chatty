import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

const routes = Router()

const settingsController = new SettingsController()
const usersControllers = new UsersController()
const messagesController = new MessagesController()

routes.post('/users', usersControllers.create)

routes.post('/settings', settingsController.create)
routes.get('/settings/:username', settingsController.show)
routes.put('/settings/:username', settingsController.update)

routes.post('/messages', messagesController.create)
routes.get('/messages/:user_id', messagesController.show)

// HTML
routes.get('/chatty/client', (_, response) => {
  return response.render('html/client.html')
})

routes.get('/chatty/admin', (_, response) => {
  return response.render('html/admin.html')
})

export { routes }
