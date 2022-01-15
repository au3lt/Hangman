const request = require('supertest')
const app = jest.requireActual('../app.js')

beforeEach(() => {
    jest.resetAllMocks();
});

describe('Register new player', () => {
  it('Shoud reject too short username', async () => {
    const res = await request(app)
      .post('/api/players')
      .send({
        name: 'na'
      })
    expect(res.statusCode).toEqual(400)
  })
  it('Shoud accept username', async () => {
    const res = await request(app)
      .post('/api/players')
      .send({
        name: 'name'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('player')
    expect(res.body).toHaveProperty('word')
    expect(res.body).toHaveProperty('guessed')
  })
})

  describe('Guess the letter', () => {
    it('No letter present', async () => {
        playerInfo = {
            player: {
                id: 100,
                name: 'test',
                hp: 10
            },
            word: 'testing',
            guessed: '_______'
        }
        app.arr.find = jest.fn(() => playerInfo);
        app.arr.findIndex = jest.fn(() => 100);
        const res = await request(app)
            .put('/api/guess/100')
            .send({
                letter: ''
            })
        expect(res.statusCode).toEqual(400)
    })
    it('Letter is present and is in word', async () => {
        playerInfo = {
            player: {
                id: 100,
                name: 'test',
                hp: 10
            },
            word: 'testing',
            guessed: '_______'
        }
        app.arr.find = jest.fn(() => playerInfo);
        app.arr.findIndex = jest.fn(() => 100);
        const res = await request(app)
            .put('/api/guess/100')
            .send({
                letter: 'e'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.player.name).toEqual('test')
        expect(res.body.player.id).toEqual(100)
        expect(res.body.player.hp).toEqual(10)
        expect(res.body.word).toEqual('testing')
        expect(res.body.guessed).toEqual('_e_____')
    })
    it('Letter is present but not in word', async () => {
        playerInfo = {
            player: {
                id: 100,
                name: 'test',
                hp: 10
            },
            word: 'testing',
            guessed: '_______'
        }
        app.arr.find = jest.fn(() => playerInfo);
        app.arr.findIndex = jest.fn(() => 100);
        console.log(playerInfo)
        const res = await request(app)
            .put('/api/guess/100')
            .send({
                letter: 'a'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.player.name).toEqual('test')
        expect(res.body.player.id).toEqual(100)
        expect(res.body.player.hp).toEqual(9)
        expect(res.body.word).toEqual('testing')
        expect(res.body.guessed).toEqual('_______')
    })
    it('No user found with given ID', async () => {
        const res = await request(app)
            .put('/api/guess/100000')
            .send({
                letter: 'e'
            })
        expect(res.statusCode).toEqual(404)
    })
  })

  describe('Restart the game', () => {
    it('Right ID given', async () => {
        playerInfo = {
            player: {
                id: 100,
                name: 'test',
                hp: 5
            },
            word: 'testing',
            guessed: '_______'
        }
        app.arr.find = jest.fn(() => playerInfo);
        app.arr.findIndex = jest.fn(() => 100);
        const res = await request(app)
            .put('/api/restart/100')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body.player.name).toEqual('test')
        expect(res.body.player.id).toEqual(100)
        expect(res.body.player.hp).toEqual(10)
    })
    it('Wrong ID given', async () => {
        const res = await request(app)
            .put('/api/restart/100')
            .send()
        expect(res.statusCode).toEqual(404)
    })
  })

afterAll(done => {
    app.close();
    done();
});