const mongoose = require('mongoose');

// use when starting application as docker container, part of docker-compose
let mongoUrlDockerCompose = 'mongodb://mongo:27017/multi-tier-docker-db';

// use when starting application as k8s pod
let mongoUrlK8s = `mongodb://${process.env.DB_URL}/multi-tier-docker-db`;

const db = async () => {
  try {
    const connection = await mongoose.connect(mongoUrlDockerCompose, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(
      'Failed to connect to MongoDB at startup. Retrying in 60 seconds!',
      error
    );
    setTimeout(await db(), 60000);
  }
};

module.exports = db;
