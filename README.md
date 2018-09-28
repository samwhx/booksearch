# Client

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Fully working with each of the below endpoints at the server side!

---

# Server

Navigate to `/server` folder. Run `nodemon` for a dev server (assuming you have nodemon installed). The server will be located at `http://localhost:3000/`, but only the below endpoints will be exposed:

## Endpoint: '/api/books'
> Only accepts GET requests.

1. No querystring or params.

```Bash
'/api/books'
```
Returns id, author, title, image names of all books in the server.

2. Querystring with empty name and title.

```Bash
'/api/books?name=&title='
```
Returns id, author, title, image names of all books in the server.

3. Querystring with filled name and title.

```Bash
'/api/books?name=harry&title=harry'
```
Returns id, author, title, image names of all books in the server where first or last name of author contains harry, or title of book contains harry.

4. Params with ID of book.

```Bash
'/api/books/1'
```
Returns id, author, title, image names of all books in the server where id is 1.

**For images, format is in `.jpg` format. e.g.`image.jpg`. To retrieve the image, go to `'/'` e.g. `'/image.jpg'`**

## Endpoint: '/api/books/upload'
> Only accepts POST requests.

1. Accepts multipart/form-data upload (Image Upload) with name `bookimage`.

```Bash
'/api/books/upload'
```
Returns "message": "Upload ok!" if upload is a success.

## Endpoint: '/api/books/uploadid'
> Only accepts POST requests.

1. Accepts an object containing `id` value of the book you are intending to change thumbnail image.

2. Should be used right after the `'/api/books/upload'` endpoint.

```Bash
'/api/books/uploadid'
```

## Endpoint: '/api/books/add'
> Only accepts POST requests.

1. Adds firstname, lastname, title.

```Bash
'/api/books/add'
```

## Endpoint: '/api/books/edit'
> Only accepts POST requests.

1. Updates firstname, lastname, title.

```Bash
'/api/books/edit'
```

## Endpoint: '/api/books/delete'
> Only accepts POST requests.

1. Deletes record using id.

```Bash
'/api/books/delete'
```