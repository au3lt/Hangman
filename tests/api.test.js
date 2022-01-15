const request = require('supertest')
const app = require('../app.js')

describe('Register new player', () => {
  it('Shoud reject too short username', async () => {
    const res = await request(app)
      .post('/api/players')
      .send({
        name: 'na'
      })
    expect(res.statusCode).toEqual(400)
  })
})

describe('Register new player', () => {
    it('Shoud reject too short username', async () => {
      const res = await request(app)
        .post('/api/players')
        .send({
          name: 'name'
        })
      expect(res.statusCode).toEqual(200)
    })
  })

afterAll(done => {
    app.close();
    done();
});