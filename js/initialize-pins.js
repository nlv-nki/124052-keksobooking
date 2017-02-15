'use strict';

(function () {
  /** @type {HTMLElement} */
  var pinMapElement = document.querySelector('.tokyo__pin-map');

  /** @type {HTMLElement} */
  var dialogElement = document.querySelector('.dialog');

  /** @type {HTMLElement} */
  var dialogCloseBtnElement = dialogElement.querySelector('.dialog__close');

  /** @const {string} */
  var PIN_CLASS = 'pin';

  /** @const {string} */
  var PIN_CLASS_ACTIVE = 'pin--active';

  /** @const {number} */
  var ENTER_KEY_CODE = 13;

  /** @const {number} */
  var ESCAPE_KEY_CODE = 27;

  pinMapElement.addEventListener('click', pinClickHandler);
  pinMapElement.addEventListener('keydown', pinKeydownHandler);
  dialogCloseBtnElement.addEventListener('click', dialogCloseBtnClickHandler);

  /** @param {MouseEvent} event */
  function pinClickHandler(event) {
    selectPin(event.target);
  }

  /** @param {KeyboardEvent} event */
  function pinKeydownHandler(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      selectPin(event.target);
    }
  }

  /** @param {MouseEvent} event */
  function dialogCloseBtnClickHandler(event) {
    closeDialog();
  }

  /** @param {KeyboardEvent} event */
  function dialogCloseBtnKeydownHandler(event) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      closeDialog();
    }
  }

  /**
   * Поведение при выборе пина — его активация и открытие диалога
   * @param {HTMLElement} element
   */
  function selectPin(element) {
    if (element.classList.contains(PIN_CLASS)) {
      var pinActive = pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE);

      if (pinActive) {
        pinActive.classList.remove(PIN_CLASS_ACTIVE);
        pinActive.setAttribute('aria-checked', 'false');
      }
      element.classList.add(PIN_CLASS_ACTIVE);
      element.setAttribute('aria-checked', 'false');
      dialogElement.style.visibility = 'visible';
      document.addEventListener('keydown', dialogCloseBtnKeydownHandler);
    }
  }

  /** Поведение при закрытии диалога — скрытие модального окна и деактивация пина */
  function closeDialog() {
    dialogElement.style.visibility = 'hidden';
    document.removeEventListener('keydown', dialogCloseBtnKeydownHandler);
    pinMapElement.querySelector('.' + PIN_CLASS_ACTIVE).classList.remove(PIN_CLASS_ACTIVE);
  }
})();
