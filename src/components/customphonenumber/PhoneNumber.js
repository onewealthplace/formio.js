import TextFieldComponent from '../textfield/TextField';
import _ from 'lodash';

export default class PhoneNumberComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'customPhoneNumber',
      label: 'Phone Number',
      key: 'customPhoneNumber'
    }, ...extend);
  }

  get defaultSchema() {
    return PhoneNumberComponent.schema();
  }

  set dataValue(value) {
    if (this.component.multiple) {
      if (_.isArray(value)) {
        super.dataValue = value.map(this.fmt);
      }
      else {
        super.dataValue = [this.fmt(value)];
      }
    }
 else {
      super.dataValue = this.fmt(value);
    }
  }

  get dataValue() {
    return super.dataValue;
  }

  fmt(value) {
    if (!_.isObject(value)) return value;
    if (window.intlTelInputUtils) {
      return window.intlTelInputUtils.formatNumber(value.value, value.maskName, window.intlTelInputUtils.numberFormat.INTERNATIONAL);
    }
  }
}
