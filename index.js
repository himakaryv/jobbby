// index.js

const { submitApplication } = require('./applyTo');

const sampleInput = {
  jobUrl: "https://company.example.com/jobs/apply/123",
  fullName: "Ankit Shukla",
  email: "ankit@example.com",
  phone: "9876543210",
  coverLetter: "Dear Hiring Manager, I am excited to apply..."
};

submitApplication(sampleInput)
  .then(result => console.log(result))
  .catch(err => console.error(err));
