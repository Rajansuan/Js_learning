// As we can tell by now, anyone can send requests to our backend
// They can just go to postman and send a request
// How do we ensure that this user has access to a certain resource?

//Dumb way - Ask user to send username and password in all requests as headers

// Slightly better way -
// 1. Give the user back a token on signup/signin
// 2. Ask the user to send back the token in all future requests
// 3. When the user logs out, ask the user to forget the token (or revoke it from the backend)

//Why we store the token in local storage not the email and password, because local storage is very public

//app.use(express.json()) -> this middleware to get the body

