"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = exports.app = exports.containerModule = void 0;
const app_1 = require("./app");
const logger_service_1 = require("./logger/logger.service");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const exception_handler_1 = require("./errors/exception.handler");
const users_controller_1 = require("./users/users.controller");
const config_service_1 = require("./config/config.service");
const database_connection_1 = require("./database/database.connection");
const users_service_1 = require("./users/users.service");
const users_repository_1 = require("./users/users.repository");
const events_controller_1 = require("./events/events.controller");
const events_repository_1 = require("./events/events.repository");
const events_service_1 = require("./events/events.service");
const exhibitions_controller_1 = require("./exhibitions/exhibitions.controller");
const exhibitions_repository_1 = require("./exhibitions/exhibitions.repository");
const exhibitions_service_1 = require("./exhibitions/exhibitions.service");
const images_controller_1 = require("./images/images-module/images.controller");
const images_service_1 = require("./images/images-module/images.service");
const artists_controller_1 = require("./artists/artists.controller");
const artists_service_1 = require("./artists/artists.service");
const artists_repository_1 = require("./artists/artists.repository");
exports.containerModule = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.LoggerService).to(logger_service_1.LoggerService).inSingletonScope();
    bind(types_1.TYPES.ExceptionHandler).to(exception_handler_1.ExceptionHandler).inSingletonScope();
    bind(types_1.TYPES.Application).to(app_1.App).inSingletonScope();
    bind(types_1.TYPES.ConfigService).to(config_service_1.ConfigService).inSingletonScope();
    bind(types_1.TYPES.DatabaseConnection).to(database_connection_1.DatabaseConnection).inSingletonScope();
    bind(types_1.TYPES.UsersController).to(users_controller_1.UsersController).inSingletonScope();
    bind(types_1.TYPES.UsersService).to(users_service_1.UsersService).inSingletonScope();
    bind(types_1.TYPES.UsersRepository).to(users_repository_1.UsersRepository).inSingletonScope();
    bind(types_1.TYPES.EventsController).to(events_controller_1.EventsController).inSingletonScope();
    bind(types_1.TYPES.EventsService).to(events_service_1.EventsService).inSingletonScope();
    bind(types_1.TYPES.EventsRepository).to(events_repository_1.EventsRepository).inSingletonScope();
    bind(types_1.TYPES.ExhibitionsController)
        .to(exhibitions_controller_1.ExhibitionsController)
        .inSingletonScope();
    bind(types_1.TYPES.ExhibitionsService).to(exhibitions_service_1.ExhibitionsService).inSingletonScope();
    bind(types_1.TYPES.ExhibitionsRepository)
        .to(exhibitions_repository_1.ExhibitionsRepository)
        .inSingletonScope();
    bind(types_1.TYPES.ImagesController).to(images_controller_1.ImagesController).inSingletonScope();
    bind(types_1.TYPES.ImagesService).to(images_service_1.ImagesService).inSingletonScope();
    bind(types_1.TYPES.ArtistsController).to(artists_controller_1.ArtistsController).inSingletonScope();
    bind(types_1.TYPES.ArtistsService).to(artists_service_1.ArtistsService).inSingletonScope();
    bind(types_1.TYPES.ArtistsRepository).to(artists_repository_1.ArtistsRepository).inSingletonScope();
});
function bootstrap() {
    const container = new inversify_1.Container();
    container.load(exports.containerModule);
    const app = container.get(types_1.TYPES.Application);
    app.init();
    return { app, container };
}
_a = bootstrap(), exports.app = _a.app, exports.container = _a.container;
