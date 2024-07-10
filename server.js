const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());

app.post('/referrals', async (req, res) => {
  const { referrer, referrerEmail, referee, refereeEmail } = req.body;

  try {
    const referral = await prisma.referral.create({
      data: {
        referrer,
        referrerEmail,
        referee,
        refereeEmail,
      },
    });
    res.status(200).json(referral);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
