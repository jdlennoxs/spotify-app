const SpotifyWebApi = require('spotify-web-api-node');
const fastify = require('fastify')({logger: true});

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: 'b4072203bdc74769862cb135b900c3b7',
  clientSecret: '313ba8800a24449c89f2eda939d4e7d9',
  redirectUri: 'http://localhost:3030/callback'
});

const scopes = ['user-read-private'];
const authorizeURL = spotifyApi.createAuthorizeURL(scopes)

fastify.get('/', async (req, res) => {
    try {
        const profile = await (await spotifyApi.getMe()).body
        return {user: profile}
    } catch (err) {
        res.redirect('/login')
    }
})

fastify.get('/login', async (req, res) => {
    res.redirect(authorizeURL)
})

fastify.get('/callback', async (req, res) => {
    try {
        const data = await spotifyApi.authorizationCodeGrant(req.query.code)
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);

        // Set the access token on the API object to use it in later calls
        await spotifyApi.setAccessToken(data.body['access_token']);
        await spotifyApi.setRefreshToken(data.body['refresh_token']);
        res.redirect('/')
    } catch (err) {
        fastify.log.error(err)
    }
})


const start = async () => {
    try {
        await fastify.listen(8888)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()