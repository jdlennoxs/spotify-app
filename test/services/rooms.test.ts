import assert from 'assert';
import app from '../../src/app';

describe('\'rooms\' service', () => {
  it('registered the service', () => {
    const service = app.service('rooms');
    expect(service).toBeTruthy();
  });

  it('creates a new room', async () => {
    const room = await app.service('rooms').create({
      owner: '123',
      playlist: '53Y8wT46QIMz5H4WQ8O22c'
    })

    assert.equal(room.owner, '123');
    assert.equal(room.playlist, '53Y8wT46QIMz5H4WQ8O22c');
    assert.equal(room.code.length, 4);
  })
});
