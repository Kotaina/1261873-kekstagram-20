'use strict';

// https://javascript.pages.academy/kekstagram/data

(function () {
  var STATUS_CODES = {
    SUCCESS: 200,
    ERROR_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    NOT_FOUND: 404
  };

  var ERROR_MESSAGES = {
    ERROR_REQUEST: 'Неверный запрос',
    NOT_AUTHORIZED: 'Пользователь не авторизован',
    NOT_FOUND: 'Ничего не найдено',
    CONNECTION_LOST: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за '
  };

  var loadData = function (URL, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case STATUS_CODES.SUCCESS:
          onSuccess(xhr.response);
          break;

        case STATUS_CODES.ERROR_REQUEST:
          error = ERROR_MESSAGES.ERROR_REQUEST;
          break;
        case STATUS_CODES.NOT_AUTHORIZED:
          error = ERROR_MESSAGES.NOT_AUTHORIZED;
          break;
        case STATUS_CODES.NOT_FOUND:
          error = ERROR_MESSAGES.NOT_FOUND;
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ERROR_MESSAGES.CONNECTION_LOST);
    });

    xhr.addEventListener('timeout', function () {
      onError(ERROR_MESSAGES.TIMEOUT + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  window.dataLoad = {
    load: loadData
  };
})();
