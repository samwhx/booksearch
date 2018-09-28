////////////////////////////////////LIBRARIES////////////////////////////////////
require('dotenv').config() // config files
const express = require('express') // expressjs
const mysql = require("mysql") // database
const cors = require('cors') // cross origin requests
const multer = require('multer') // image upload
const bodyParser = require('body-parser') // parse body of post/put messages

////////////////////////////////////METHODS////////////////////////////////////
// express
const app = express()

// api uri to be appended to all api routes.
const API_URI = "/api";

// cors
app.use(cors())

// multer
global.filename = "";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/samuel/Workspace/fsf/server/library/server/public/images')
  },
  filename: function (req, file, cb) {
    console.log(JSON.stringify(file));
    filename = file.originalname;
    var uploadFileTokens = file.originalname.split('.');
    console.log(uploadFileTokens);
    cb(null, uploadFileTokens[0] + '.' + uploadFileTokens[uploadFileTokens.length-1])
  },
  fieldSize: 20 * 1024 * 1024 // 20MB
})
var upload = multer({ storage: storage })

// sql
const sqlFindAllBooks = "SELECT * FROM books"
const sqlFindBookbyId = "SELECT * FROM books WHERE id = ?"
const sqlFindBookbySearchString = "SELECT * FROM books WHERE (author_firstname LIKE ?) || (author_lastname LIKE ?) || (title LIKE ?)"
const sqlEditBook = "UPDATE books SET author_firstname = ?, author_lastname= ?, title = ?  WHERE id = ?"
const sqlAddBook = "INSERT INTO books (author_firstname, author_lastname, title, cover_thumbnail) VALUES (?, ?, ?, ?)"
const sqlDeleteBook = "DELETE FROM books WHERE id = ?"
const sqlUploadPhoto = "UPDATE books SET cover_thumbnail = ? WHERE id = ?"
var pool = mysql.createPool ({ 
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONLIMIT
})

// promise for sql query
var makeQuery = (sql, pool) => {
  console.info('sql >>>>> ', sql)
  return (args) => {
    let queryPromise = new Promise ((resolve, reject) => {
      pool.getConnection ((err, connection) => {
        if (err) {
          reject (err)
          return
        }
        console.info('args >>>>> ', args)
        connection.query(sql, args || [], (err, results) => {
          connection.release();
          if (err) {
            reject (err)
            return
          }
          // console.info('results >>>>> ', results)
          resolve(results)
        })
      })
    })
    return queryPromise
  }
}

// var turned into promise when makeQuery executes
var findAllBooks = makeQuery(sqlFindAllBooks, pool)
var findBookbyId = makeQuery(sqlFindBookbyId, pool)
var findBookbySearchString = makeQuery(sqlFindBookbySearchString, pool)
var editBook = makeQuery(sqlEditBook, pool)
var addBook = makeQuery(sqlAddBook, pool)
var deleteBook = makeQuery(sqlDeleteBook, pool)
var uploadPhoto = makeQuery(sqlUploadPhoto, pool)

////////////////////////////////////ROUTES////////////////////////////////////
// GET all books or search string
app.get(API_URI + '/books', (req, res) => {
  console.info('query >>>>>', req.query)
  console.info('name >>>>>', req.query.name)
  console.info('title >>>>>', req.query.title)
  if(!req.query.name.trim() && !req.query.title.trim()){
    findAllBooks().then ((results) => {
      let finalResult = []
      let name = ''
      results.forEach((element) => {
        if (element.author_firstname != '') {
        name = element.author_firstname + ' ' + element.author_lastname
        } else {
        name = element.author_lastname
        }
        let value = { id: "", fullname: "", title: "", thumbnail: "", firstname: "", lastname: "" }
        value.id = element.id
        value.fullname = name
        value.title = element.title
        value.thumbnail = element.cover_thumbnail
        value.firstname = element.author_firstname
        value.lastname = element.author_lastname
        finalResult.push(value)
      })
      console.info('query result to be passed back >>>>> ', finalResult)
      res.json(finalResult)
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  }
  else {
    findBookbySearchString([req.query.name,
                            req.query.name,
                            req.query.title]).then ((results) => {
      let finalResult = []
      let name = ''
      results.forEach((element) => {
        if (element.author_firstname != '') {
        name = element.author_firstname + ' ' + element.author_lastname
        } else {
        name = element.author_lastname
        }
        let value = { id: "", fullname: "", title: "", thumbnail: "", firstname: "", lastname: "" }
        value.id = element.id
        value.fullname = name
        value.title = element.title
        value.thumbnail = element.cover_thumbnail
        value.firstname = element.author_firstname
        value.lastname = element.author_lastname
        finalResult.push(value)
      })
      console.info('query result to be passed back >>>>> ', finalResult)
      res.json(finalResult)
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  }
})

// GET one book by Id (params)
app.get(API_URI + '/books/:bookId', (req, res) => {
  console.info('params >>>>>', req.params);
  findBookbyId([parseInt(req.params.bookId)]).then ((results) => {
    let finalResult = []
      let name = ''
      results.forEach((element) => {
        if (element.author_firstname != '') {
        name = element.author_firstname + ' ' + element.author_lastname
        } else {
        name = element.author_lastname
        }
        let value = { id: "", fullname: "", title: "", thumbnail: "", firstname: "", lastname: "" }
        value.id = element.id
        value.fullname = name
        value.title = element.title
        value.thumbnail = element.cover_thumbnail
        value.firstname = element.author_firstname
        value.lastname = element.author_lastname
        finalResult.push(value)
      })
      console.info('query result to be passed back >>>>> ', finalResult)
      res.json(finalResult)
  }).catch((error) => {
    console.info(error)
    res.status(500).json(error)
  })
})

// EDIT one book
app.put(API_URI + '/books/edit', bodyParser.json(), bodyParser.urlencoded(), (req, res) => {
  console.info('body >>>>>', req.body);
  editBook([req.body.firstname, req.body.lastname, req.body.title, req.body.id]).then ((results) => {
    res.json(results)
  }).catch((error) => {
    console.info(error)
    res.status(500).json(error)
  })
})

// ADD one book
app.post(API_URI + '/books/add', bodyParser.json(), bodyParser.urlencoded(), (req, res) => {
  console.info('body >>>>>', req.body);
  addBook([req.body.firstname, req.body.lastname, req.body.title, 'no_book_cover.jpg']).then ((results) => {
    res.json(results)
  }).catch((error) => {
    console.info(error)
    res.status(500).json(error)
  })
})

// DELETE one book
app.post(API_URI + '/books/delete', bodyParser.json(), bodyParser.urlencoded(), (req, res) => {
  console.info('body >>>>>', req.body);
  deleteBook([req.body.id]).then ((results) => {
    res.json(results)
  }).catch((error) => {
    console.info(error)
    res.status(500).json(error)
  })
})

// POST one image for Upload
app.post(API_URI + '/books/upload', upload.single("bookimage"), (req, res, next)=>{
    res.json({message: "Upload ok!"});
});

// Update image thumbnail
app.post(API_URI + '/books/uploadid', bodyParser.json(), bodyParser.urlencoded(), (req, res)=>{
  console.info('body >>>>>', req.body);
  uploadPhoto([filename, req.body.id]).then ((results) => {
    console.info ('Results >>>>> ', results)
    res.json({message: "Database Updated!"});
  });
});

// static assets folder
app.use(express.static('public'))

////////////////////////////////////LISTEN////////////////////////////////////
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000
app.listen(PORT, () => {
  console.info(`Application started on port ${PORT} on ${new Date()}`)
})