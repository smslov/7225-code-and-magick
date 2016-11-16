'use strict';

define(function() {
  return function() {
    var formContainer = document.querySelector('.overlay-container');
    var formCloseButton = document.querySelector('.review-form-close');
    var fieldName = document.getElementById('review-name');
    var fieldText = document.getElementById('review-text');
    var formSubmitButton = document.querySelector('.review-submit');
    var marks = document.querySelector('.review-form-group.review-form-group-mark');
    var allMarks = document.getElementsByName('review-mark');

    fieldName.required = true;
    fieldText.required = false;

    fieldName.placeholder = 'Ваше имя';
    fieldText.placeholder = 'Ваш отзыв';

    var form = {
      onClose: null,

      /**
       * @param {Function} cb
       */
      open: function(cb) {
        formContainer.classList.remove('invisible');
        cb();
      },

      close: function() {
        formContainer.classList.add('invisible');

        if (typeof this.onClose === 'function') {
          this.onClose();
        }
      },

      checkMarks: function(mark) {
        if (mark < 3) {
          fieldText.required = true;
        } else {
          fieldText.required = false;
        }
      },
      checkFields: function(name, text) {
        if (name === null || name === '') {
          formSubmitButton.disabled = true;
        } else if (fieldText.required) {
          if (text === null || text === '') {
            formSubmitButton.disabled = true;
          } else {
            formSubmitButton.disabled = false;
          }
        } else {
          formSubmitButton.disabled = false;
        }
      },
      hideLabels: function(name, text) {
        if (fieldName.required) {
          if (name === null || name === '') {
            document.querySelector('.review-fields-name').style.display = 'inline-block';
          } else {
            document.querySelector('.review-fields-name').style.display = 'none';
          }
        } else {
          document.querySelector('.review-fields-name').style.display = 'none';
        }
        if (fieldText.required) {
          if (text === null || text === '') {
            document.querySelector('.review-fields-text').style.display = 'inline-block';
          } else {
            document.querySelector('.review-fields-text').style.display = 'none';
          }
        } else {
          document.querySelector('.review-fields-text').style.display = 'none';
        }
        if (formSubmitButton.disabled === false) {
          document.querySelector('.review-fields').style.display = 'none';
        } else {
          document.querySelector('.review-fields').style.display = 'inline-block';
        }
      },
      setMarkFromCookie: function() {
        if (Cookies.get('review-mark') > 0 ) {
          allMarks[Math.abs(Cookies.get('review-mark') - 5)].checked = true;
        } else {
          allMarks[2].checked = true;
        }
      },
      setNameFromCookie: function() {
        if (typeof Cookies.get('review-name') !== 'undefined') {
          fieldName.value = Cookies.get('review-name');
        } else {
          fieldName.value = '';
        }
      }
    };

    form.setMarkFromCookie();
    form.setNameFromCookie();
    form.checkMarks(document.querySelector('input[name = "review-mark"]:checked').value);
    form.checkFields(fieldName.value, fieldText.value);
    form.hideLabels(fieldName.value, fieldText.value);

    fieldName.oninput = function() {
      form.checkFields(fieldName.value, fieldText.value);
      form.hideLabels(fieldName.value, fieldText.value);
    };

    fieldText.oninput = function() {
      form.checkFields(fieldName.value, fieldText.value);
      form.hideLabels(fieldName.value, fieldText.value);
    };

    marks.onclick = function() {
      form.checkMarks(document.querySelector('input[name = "review-mark"]:checked').value);
      form.checkFields(fieldName.value, fieldText.value);
      form.hideLabels(fieldName.value, fieldText.value);
    };

    formSubmitButton.onclick = function() {
      var now = new Date();
      var graceHopperBday = new Date(now.getFullYear(), 11, 9);
      if (now < graceHopperBday) {
        graceHopperBday = new Date(now.getFullYear() - 1, 11, 9);
      }
      var dateDiff = Math.abs(Math.floor((now - graceHopperBday) / (1000 * 60 * 60 * 24)));
      Cookies.set('review-mark', document.querySelector('input[name = "review-mark"]:checked').value, {expires: dateDiff});
      Cookies.set('review-name', fieldName.value, {expires: dateDiff});
    };

    formCloseButton.onclick = function(evt) {
      evt.preventDefault();
      form.close();
    };

    return form;
}();
});
