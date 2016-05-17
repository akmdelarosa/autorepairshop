# Auto Repair Shop Using Angular, Express and MySql
[![bitHound Code](https://www.bithound.io/github/akmdelarosa/autorepairshop/badges/code.svg)](https://www.bithound.io/github/akmdelarosa/autorepairshop)&nbsp;[![GitHub version](https://badge.fury.io/gh/akmdelarosa%2Fautorepairshop.svg)](https://badge.fury.io/gh/akmdelarosa%2Fautorepairshop)&nbsp;[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

This is a simple auto repair shop web application where users can schedule appointments, view service history information, and use the estimator tool to calculate the cost of a particular repair or maintenance service. This is a working application but it still requires many process improvements.

## Requirements
 [node.js](https://nodejs.org/en/) and [mysql](https://www.mysql.com/) are required.

## Getting Started

To get started, you'll want to first clone this GitHub repository locally:

```bash
$ git clone https://github.com/akmdelarosa/autorepairshop.git
```

Next, you'll want to go into the autorepairshop app directory:

```bash
$ cd autorepairshop
```

Then you'll want to run `npm install` and `bower install` to download the dependencies and get
running!

Please read the full output of the `npm install` command -- it will explain how to run the project once
you've done so.

If you get stuck during the install process, you can restart it anytime.

The next step would be to set up your database. The schema used in this application can be found under the schema folder. Make sure you update your database connection string on server/mysqlConnectionString.js. To update the database you would want to use depending on the environment, update this line on server/mysqlConnectionStringProvider.js. For example, change the ...connection.prod to ...connection.dev if your on development mode.

```bash
var connection = mysql.createConnection(mysqlConnectionString.mysqlConnectionString.connection.prod);
```
That's it!

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
