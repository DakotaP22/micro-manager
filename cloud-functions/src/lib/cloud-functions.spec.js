import { cloudFunctions } from './cloud-functions';
describe('cloudFunctions', () => {
  it('should work', () => {
    expect(cloudFunctions()).toEqual('cloud-functions');
  });
});
