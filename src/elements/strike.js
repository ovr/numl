import NuInline from './inline';

export default class NuStrike extends NuInline {
  static get nuTag() {
    return 'nu-s';
  }

  static get nuName() {
    return '';
  }

  static get nuStyles() {
    return {
      text: 's',
    };
  }
}