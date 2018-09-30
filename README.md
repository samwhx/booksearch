# Now Live!!!

The Live server is on https://samwhx.tk/. It supports PWA. So you can add it to home screen on your mobile phone.

# Client

## Development server

Run `ng serve` for a dev server.

Navigate to `http://localhost:4200/`.

Fully working with each of the below endpoints at the server side!

---

# Server

Navigate to `/server` folder.

Run the `library_books.sql` sql script located inside `/sql_file` to generate your database.

Duplicate the `.env.sample` file and rename it `.env`. Change the details to match your system's DB information and folder locations.

Run `nodemon` for a dev server (assuming you have nodemon installed).

The server will be located at `http://localhost:3000/`, but only the below endpoints will be exposed:

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
> Only accepts PUT requests.

1. Updates firstname, lastname, title using id.

```Bash
'/api/books/edit'
```

## Endpoint: '/api/books/delete'
> Only accepts POST requests.

1. Deletes record using id.

```Bash
'/api/books/delete'
```

# Production

Below contain the instructions to set up your own HTTPS server in production!

## AWS
1. Get a EC2 server in AWS. Use SSH to access the server. AWS will generate a key file (.pem) for you.
2. Open terminal and type the following to access AWS server.
```Bash
ssh -v -i <your-generated.pem> ubuntu@<0.0.0.0>
```
E.g. `ssh -v -i samuelwhx.pem ubuntu@13.229.207.200`. My pem file is located in the same folder i am using terminal.
3. In AWS terminal, key the following:
```Bash
mkdir app && cd app
```
4. Check if git installed
```Bash
which git
```
5.  If git not installed 
```Bash
sudo apt update
sudo apt install git
```
6. Clone your git repository
e.g. `git clone https://github.com/samwhx/booksearch.git`
7. Check if node is installed
```Bash
which node
```
8. If node not installed
```Bash
sudo apt update
sudo apt install nodejs
sudo apt install npm
```
9. Install the node modules for both client and server.
```Bash
npm i
cd server/
npm i
```
10. Go back to client folder and edit the `environments/environment.prod.ts` to reflect your new urls.

## PM2 to run server even after closing the terminal
```Bash
npm install pm2 -g
pm2 start index.js
pm2 startup
```
Copy and paste the command given to you. E.g. `sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu`
```Bash
pm2 save
sudo reboot
```

## Domain Name
Go to https://www.freenom.com/en/index.html?lang=en to get a free web domain.

Map your AWS public IPV4 to your new domain name.

## Build angular project
Build your project in angular.
```Bash
ng build --prod --base-href=<your new domain name>/
```
E.g. `ng build --prod --base-href=https://samwhx.tk/` 
Push it to github.

## SQL server
Install SQL on AWS using the guide at https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04.

Run the the following statements inside mysql to generate database. The file is provided at `/server/sql_file/library_books.sql`
```Bash
mysql>CREATE DATABASE <database_name>;
mysql>USE <database_name>;
mysql>source /path/to/your/file.sql;
```
Update the `server/.env` file with your mysql details. a sample is provided at `server/.env.sample`.

Also update the folder path of your `public/images` folder. Navigate to the folder using `cd <folder name>` and use the following to find out the path of the folder in your system.
```Bash
pwd
```
E.g. `/home/samuel/Workspace/fsf/server/library/server/public/images`

## Nginx to manage HTTPS (SSL)
```Bash
sudo -s
nginx=stable
add-apt-repository ppa:nginx/$nginx
apt-get update
apt-get install nginx
```

## Register SSL free using CertBot
```Bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx 
sudo certbot --nginx
sudo -s
cd /etc/nginx/sites-available/
nano default
```
Using the nano editor:
1. Delete the original configuration for port 80 under server {}.
2. In location for the new server{} with all the pre-generated elements by certbot change location to the following:
```Bash
location /  {
                proxy_pass    http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
```
Save and exit the nano editor.
Run the following command lines after that:
```Bash
sudo nginx -t
sudo systemctl restart nginx
exit
```

Done!!! Check if your website is working by entering Your domain address. E.g. https://samwhx.tk