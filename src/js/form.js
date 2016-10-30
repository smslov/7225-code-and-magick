'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var fieldName = document.getElementById('review-name');
  var fieldText = document.getElementById('review-text');
  var formSubmitButton = document.querySelector('.review-submit');
  var marks = document.querySelector('.review-form-group-mark');
  var negativeMarks = [document.getElementById('review-mark-2'), document.getElementById('review-mark-1')];

  fieldName.required = true;
  fieldText.required = false;
  formSubmitButton.disabled = true;
  document.querySelector('.review-fields-text').style.display = 'none';

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
    disableSubmit: function(name, text) {
      if (name == null || name == '') {
        formSubmitButton.disabled = true;
      } else if (negativeMarks[0].checked == true || negativeMarks[1].checked == true) {
        if (text == null || text == '') {
          formSubmitButton.disabled = true;
        } else {
         formSubmitButton.disabled = false;
        }
      } else {
        formSubmitButton.disabled = false;
      }
      if (negativeMarks[0].checked == true || negativeMarks[1].checked == true) {
        fieldText.required = true;
      } else {
        fieldText.required = false;
      }
    },
    hideLabels: function (name, text) {
      if (fieldName.required) {
        if (name == null || name == '') {
          document.querySelector('.review-fields-name').style.display = 'inline-block';
        } else {
          document.querySelector('.review-fields-name').style.display = 'none';
        }
      } else {
        document.querySelector('.review-fields-name').style.display = 'none';
      }
      if (fieldText.required) {
        if (text == null || text == '') {
          document.querySelector('.review-fields-text').style.display = 'inline-block';
        } else {
          document.querySelector('.review-fields-text').style.display = 'none';
        }
      } else {
        document.querySelector('.review-fields-text').style.display = 'none';
      }
      if (formSubmitButton.disabled == false) {
        document.querySelector('.review-fields').style.display = 'none';
      } else {
        document.querySelector('.review-fields').style.display = 'inline-block';
      }
    }
  };

  fieldName.oninput = function() {
    form.disableSubmit(fieldName.value, fieldText.value);
    form.hideLabels(fieldName.value, fieldText.value);
  };

  fieldText.oninput = function() {
    form.disableSubmit(fieldName.value, fieldText.value);
    form.hideLabels(fieldName.value, fieldText.value);
  };

  marks.onclick = function() {
    form.disableSubmit(fieldName.value, fieldText.value);
    form.hideLabels(fieldName.value, fieldText.value);
  }

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
