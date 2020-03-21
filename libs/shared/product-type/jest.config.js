module.exports = {
  name: 'shared-product-type',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/product-type',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
