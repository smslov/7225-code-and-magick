'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var fieldName = document.getElementById('review-name');
  var fieldText = document.getElementById('review-text');
  var formSubmitButton = document.querySelector('.review-submit');
  var marks = document.querySelector('.review-form-group.review-form-group-mark');

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
    }
  };

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

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
