"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_CONSTANTS = void 0;
exports.ERROR_CONSTANTS = {
    NOT_FOUND_STATUS_CODE: 404,
    NOT_FOUND_MESSAGE: 'Не найдено',
    CONFLICT_STATUS_CODE: 409,
    ALREADY_EXIST_MESSAGE: 'Пользователь с таким email уже существует',
    DELETE_CONFLICT_MESSAGE: 'Удаление не произошло по причине конфликта',
    USER_DOES_NOT_EXIST_STATUS_CODE: 401,
    FORBIDDEN_STATUS_CODE: 403,
    FORBIDDEN_MESSAGE: 'Отказано в доступе',
    USER_DOES_NOT_EXIST_MESSAGE: 'Ошибка авторизации',
    COMMON_ERROR_422_STATUS_CODE: 422,
    ARTIST_NOT_FOUND_MESSAGE: 'Не удалось найти деятеля искусства',
    EVENT_NOT_FOUND_MESSAGE: 'Cтраница не найдена',
    CREATE_EVENT_ERROR: 'Не удалось создать событие',
    CREATE_EXHIBITION_ERROR: 'Не удалось создать выставку',
    EXHIBITION_NOT_FOUND_MESSAGE: 'Выставка не найдена',
    CREATE_ARTIST_ERROR: 'Не удалось создать художника',
    CREATE_IMAGES_ERROR: 'Не удалось загрузить изображения',
    EVENT_ALREADY_EXIST: 'Такое событие уже существует',
    EXHIBITION_ALREADY_EXIST: 'Такая выставка уже существует',
    ARTIST_ALREADY_EXIST: 'Такой деятель искусства уже существует',
};
