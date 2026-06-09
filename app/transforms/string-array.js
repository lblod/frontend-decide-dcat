export default class StringArrayTransform {
  deserialize(serialized) {
    return serialized.toString().split(',');
  }

  serialize(deserialized) {
    return deserialized.join(',');
  }

  static create() {
    return new this();
  }
}
