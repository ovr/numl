import LocalizedWidgetBehavior from './localized-widget';

export default class InputBehavior extends LocalizedWidgetBehavior {
  init() {
    this.props.disabled = () => {
      return this.transferAttr('disabled', this.ref) != null;
    };
    this.props.placeholder = () => this.transferAttr('placeholder', this.ref, '...');

    super.init();

    const { $host } = this;

    this.ref = $host.querySelector('input');

    if (!this.ref) {
      const input = document.createElement('input');

      $host.appendChild(input);

      this.ref = input;

      input.addEventListener('input', (event) => {
        event.stopPropagation();

        this.setValue(input.value);
      });

      input.addEventListener('change', (event) => {
        event.stopPropagation();

        this.emit('change', this.value);
      });
    }

    this.transferAttr('placeholder', this.ref, '...');

    this.ref.addEventListener('input', () => {
      this.setEmpty();
    });

    $host.nuRef = this.ref;

    if ($host.hasAttribute('label')) {
      $host.nuChanged('label', null);
      $host.removeAttribute('aria-label');
    }

    if ($host.hasAttribute('labelledby')) {
      $host.nuChanged('label', null);
      $host.removeAttribute('aria-labelledby');
    }

    return this.nuRef;
  }

  setEmpty() {
    this.$host.nuSetMod('empty', !this.ref.value);
  }

  setValue(value, silent) {
    this.value = value;

    if (!silent) {
      this.emit('input', this.value);
    }
  }
}