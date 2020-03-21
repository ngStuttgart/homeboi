module.exports = {
  name: 'shared-base64url',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/base64url',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
