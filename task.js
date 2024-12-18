const fs = require("fs");
const path = require("path");
function createFolders(...folderNames) {
  if (folderNames.length < 1 || folderNames.length > 100) {
    throw new Error("Folder soni kamida 1 va ko'pi bilan 100 bo'lishi kerak.");
  }

  folderNames.forEach((folderName) => {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
      console.log(`${folderName} papka yaratildi.`);
    } else {
      console.log(`${folderName} papka allaqachon mavjud.`);
    }
  });
}
const carsFilePath = path.join(__dirname, "cars.json");
if (!fs.existsSync(carsFilePath)) {
  fs.writeFileSync(carsFilePath, JSON.stringify([]));
  console.log("cars.json fayli yaratildi.");
}
function addCar(data) {
  if (!data || !data.id || !data.model || !data.price) {
    throw new Error(
      "Data to'g'ri formatda emas. Misol: {id: 1, model: 'audi', price: 1000}"
    );
  }

  const cars = JSON.parse(fs.readFileSync(carsFilePath, "utf-8"));
  cars.push(data);
  fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));
  console.log(`Yangi mashina qo'shildi: ${data.model}`);
}
function getAllCars() {
  const cars = JSON.parse(fs.readFileSync(carsFilePath, "utf-8"));
  console.log("Hamma mashinalar: ", cars);
  return cars;
}
function deleteCarById(id) {
  const cars = JSON.parse(fs.readFileSync(carsFilePath, "utf-8"));
  const updatedCars = cars.filter((car) => car.id !== id);

  if (cars.length === updatedCars.length) {
    console.log(`ID = ${id} bo'lgan mashina topilmadi.`);
  } else {
    fs.writeFileSync(carsFilePath, JSON.stringify(updatedCars, null, 2));
    console.log(`ID = ${id} bo'lgan mashina o'chirildi.`);
  }
}
function writeStreamExample(data) {
  const writeStream = fs.createWriteStream("stream_output.txt");
  writeStream.write(data);
  writeStream.end();
  console.log("Stream orqali yozildi.");
}
function readStreamExample() {
  const readStream = fs.createReadStream("stream_output.txt", "utf-8");
  readStream.on("data", (chunk) => {
    console.log("Streamdan olingan data: ", chunk);
  });
  readStream.on("end", () => {
    console.log("Stream o'qish tugadi.");
  });
}
try {
  createFolders("Folder1", "Folder2", "Folder3");
  addCar({ id: 1, model: "audi", price: 1000 });
  addCar({ id: 2, model: "bmw", price: 2000 });
  getAllCars();
  deleteCarById(1);
  getAllCars();
  writeStreamExample("Bu stream orqali yozilgan data.");
  readStreamExample();
} catch (error) {
  console.error("Xatolik: ", error.message);
}
