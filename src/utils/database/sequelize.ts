import { Sequelize } from 'sequelize';
import path from 'path';
import fs from 'fs';
import { Restaurant } from '../../modules/Restaurent/model/restaurant.model';

const connectionString = 'postgres://postgres:12345678@localhost:5432/sumitdb';

export const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
});

async function loadModels(dir: string): Promise<void> {
  const modelFiles = fs
    .readdirSync(dir)
    .filter(file => (file.endsWith('.ts') || file.endsWith('.js')) && file !== 'associate.ts');

  for (const file of modelFiles) {
    const modelPath = path.join(dir, file);
    const modelModule = await import(modelPath);

    const model =
      modelModule?.default ??
      modelModule[Object.keys(modelModule)[0]];

    if (model?.initialize) {
      model.initialize();
    }
  }
}

const syncModels = async (): Promise<void> => {
  const modulesDir = path.join(__dirname, '../../modules');

  for (const moduleDir of fs.readdirSync(modulesDir)) {
    const modelsDir = path.join(modulesDir, moduleDir, 'models');
    if (fs.existsSync(modelsDir) && fs.lstatSync(modelsDir).isDirectory()) {
      await loadModels(modelsDir);
    }
  }
};

export const connectDatabase = async (): Promise<void> => {
  try {
    await syncModels();
    // Restaurant.initialize(); 

    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};