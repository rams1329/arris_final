const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const ExcelJS = require("exceljs");
const multer = require("multer");
const nodemailer = require('nodemailer');
const session = require('express-session');
const { differenceInMonths, addDays, differenceInYears ,parse,format} = require('date-fns');

const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = 3000;
const COMPANY_IP = '192.168.0.10'

// log requests
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));


app.use(
  session({
    secret: 'arris', //a secure secret
    resave: true,
    saveUninitialized: true,
  })
);



// Node mailer
let emailSentFlag = false;

// Function to check if a user has completed 6 months and send an email
async function checkAndSendEmail(user) {
  console.log('entered here');
  // ... (rest of your checkAndSendEmail logic)
}

// Middleware to check and send email on root page access
app.use(async (req, res, next) => {
  try {
    if (!emailSentFlag && req.url === '/') {
      const Userdb = require('./server/model/model');
      const data = await Userdb.find();

      // Trigger the email function for each user
      data.forEach((user) => {
        checkAndSendEmail(user);
      });

      emailSentFlag = true;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



// set view engine
app.set("view engine", "ejs");
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
   console.log(`Server is running on http://${COMPANY_IP}:${PORT}/login`);
});

const Userdb = require("./server/model/model");

app.get("/export-excel", async (req, res) => {
  try {
    const data = await Userdb.find();
    console.log(data);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Userdbs");

    // Assuming your Userdb model has fields like name, empemail, etc.
    worksheet.columns = [
      { header: "Name", key: "name", width: 15 },

      { header: "Employee mobile number", key: "empmn", width: 25 },
      { header: "Employee Departemnt", key: "department", width: 20 },
      { header: "Gender", key: "gender", width: 15 },
      { header: "Status", key: "status", width: 15 },
      { header: "DOB", key: "dob", width: 15 },
      { header: "Employee Email", key: "email", width: 20 },
      { header: "Employee Number", key: "empno", width: 20 },
      { header: "Permanent / Contract", key: "porc", width: 20 },
      { header: "Designation", key: "designation", width: 20 },
      { header: "qualification", key: "qualification", width: 20 },
      { header: "Year of graduation", key: "yog", width: 20 },
      { header: "Date of joining", key: "doj", width: 20 },
      { header: "Address", key: "address", width: 20 },
      { header: "Aadhar number", key: "aadharno", width: 20 },
      { header: "Pan number", key: "panno", width: 20 },
      { header: "Van number", key: "vanno", width: 20 },
      { header: "Pf number", key: "pfno", width: 20 },
      { header: "Remarks", key: "remarks", width: 20 },
      { header: "Previous experience", key: "prevexp", width: 15 },
      { header: "Arris experience", key: "arrisexp", width: 15 },
      { header: "Total experience", key: "totalexp", width: 15 },
      { header: "Previous company name", key: "prevcompname", width: 20 },
      { header: "Account number", key: "acno", width: 20 },
      { header: "IFSC code", key: "ifsc", width: 20 },
      { header: "Bank name", key: "bankname", width: 20 },
      { header: "Employement status", key: "empstatus", width: 20 },
      { header: "Bank id", key: "bankid", width: 20 },
      { header: "Discipline lead name", key: "dlname", width: 25 },
      { header: "Discipline lead email", key: "dlemail", width: 25 },
      { header: "Discipline lead phone number", key: "dlphno", width: 25 },
      { header: "Emergency contact person name", key: "ecpn", width: 25 },
      { header: "Emergency contact number", key: "ecn", width: 25 },
      { header: "Blood group", key: "bg", width: 20 },
      { header: "Probation letter provided date", key: "pl", width: 20 },

      // Add columns for other fields
    ];

    // Insert data into the worksheet
    data.forEach((user) => {
      worksheet.addRow({
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
        dob: user.dob,
        empmn: user.empmn,
        department:user.department,
        empno: user.empno,
        porc: user.porc,
        designation: user.designation,
        qualification: user.qualification,
        yog: user.yog,
        doj: user.doj,
        address: user.address,
        aadharno: user.aadharno,
        panno: user.panno,
        vanno: user.vanno,
        pfno: user.pfno,
        remarks: user.remarks,
        prevexp: user.prevexp,
        arrisexp: user.arrisexp,
        totalexp: user.totalexp,
        prevcompname: user.prevcompname,
        acno: user.acno,
        ifsc: user.ifsc,
        bankname: user.bankname,
        empstatus: user.empstatus,
        bankid: user.bankid,
        dlname: user.dlname,
        dlemail: user.dlemail,
        dlphno: user.dlphno,
        ecpn: user.ecpn,
        ecn: user.ecn,
        bg: user.bg,
        pl: user.pl,

        // Add other fields here
      });
    });

    // Set the response headers for Excel file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=Userdbs.xlsx");

    // Write the workbook to the response
    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});




// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'ramspa05@gmail.com',
      pass: 'izry wnfv ydbz lfnj',
  },
});





// Function to check if a user has completed 6 months and 3 days or 1 year and send an email
async function checkAndSendEmail(user) {
  console.log('entered here');
  const { name, dlemail, doj, dlname } = user;

  // Check if Date of Joining is not null and is a valid date
  if (doj && !isNaN(new Date(doj))) {
    // Parse the input date into a JavaScript Date object
    const parsedDate = parse(doj, 'yyyy-MM-dd', new Date());

    // Calculate the difference in months and years between the current date and Date of Joining
    const currentDate = new Date();
    const monthsDifference = differenceInMonths(currentDate, parsedDate);
    const yearsDifference = differenceInYears(currentDate, parsedDate);

    // Add 6 months and 3 days to the Date of Joining
    const sixMonthsThreeDaysLater = addDays(parsedDate, 6 * 30 + 3);

    // Check if the current date is after 6 months and 3 days from Date of Joining
    if (currentDate >= sixMonthsThreeDaysLater) {
      // Check if the 6 months and 3 days email has not been sent yet
      const sixMonthsThreeDaysEmailSent = user.sixMonthsThreeDaysEmailSent || false;

      // Check if the 1-year email has not been sent yet
      const oneYearEmailSent = user.oneYearEmailSent || false;

      if (monthsDifference >= 6 && !sixMonthsThreeDaysEmailSent) {
        // Set the flag indicating that the 6 months and 3 days email has been sent for this user
        user.sixMonthsThreeDaysEmailSent = true;

        // Compose the email message for 6 months and 3 days
        const sixMonthsThreeDaysMessage = `
          <p>Dear ${dlname},</p>
          <p>We would like to inform you that <span class="highlight">${name}</span> from Arris Pvt Ltd has completed 6 months and 3 days of service with the company since joining on ${format(parsedDate, 'MM/dd/yyyy')}.</p>
          <p>Thank you for your continued support and guidance.</p>
          <p>Regards,<br>Arris Pvt Ltd</p>
        `;

        // Send the 6 months and 3 days email
        try {
          const info = await transporter.sendMail({
            from: 'ramspa05@gmail.com',
            to: dlemail,
            subject: '6-Month and 3-Day Service Update',
            html: sixMonthsThreeDaysMessage,
          });

          console.log(`6-Month and 3-Day Email sent to ${dlemail}: ${info.messageId}`);
        } catch (error) {
          console.error('Error sending 6-month and 3-day email:', error);
        }
      }

      if (yearsDifference >= 1 && !oneYearEmailSent) {
        // Set the flag indicating that the 1-year email has been sent for this user
        user.oneYearEmailSent = true;

        // Compose the email message for 1 year
        const oneYearMessage = `
          <p>Dear ${dlname},</p>
          <p>We would like to inform you that <span class="highlight">${name}</span> from Arris Pvt Ltd has completed 1 year of service with the company since joining on ${format(parsedDate, 'MM/dd/yyyy')}.</p>
          <p>Thank you for your continued support and guidance.</p>
          <p>Regards,<br>Arris Pvt Ltd</p>
        `;

        // Send the 1-year email
        try {
          const oneYearInfo = await transporter.sendMail({
            from: 'ramspa05@gmail.com',
            to: dlemail,
            subject: '1-Year Service Update',
            html: oneYearMessage,
          });

          console.log(`1-Year Email sent to ${dlemail}: ${oneYearInfo.messageId}`);
        } catch (error) {
          console.error('Error sending 1-year email:', error);
        }
      }
    } else {
      console.log(`Email not sent to ${dlemail}: Not yet 6 months and 3 days since the Date of Joining.`);
    }
  } else {
    console.log(`Email not sent to ${dlemail}: Date of Joining is null or invalid.`);
  }
}




// login code
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/index.html');
 
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("TEST ",username,password)
  // Check if the username and password match the specified values
  if (username === 'admin' && password === 'password') {
      console.log("DAMALU DUM<ELU GHOTHALAKKA")
    // Set isAuthenticated in the session
    req.session.isAuthenticated = true;
    res.redirect('/home');
  } else {
    res.send('Invalid username or password');
  }
});