from fastapi import FastAPI
from pydantic import BaseModel
import pickle
from fastapi.middleware.cors import CORSMiddleware
from sklearn.preprocessing import StandardScaler

class CarDetail(BaseModel):
    kilometres: int
    body_type:int
    cylinder:int
    transmission:int
    drive_train:int
    fuel_type:int
    year:int
    brand:int
    name:int

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/getPredictedPrice")
def getPredictedPrice(car : CarDetail):
    kilometres = car.kilometres
    body_type = car.body_type
    cylinder = car.cylinder
    transmission = car.transmission
    drive_train = car.drive_train
    fuel_type = car.fuel_type
    year = car.year
    brand = car.brand
    name = car.name
    model = None

    with open('nn.pickle', 'rb') as f:
        model = pickle.load(f)

    # scaler = StandardScaler()
    

    # X_train1 = scaler.fit_transform([[kilometres, body_type, cylinder, transmission, drive_train, fuel_type, year, brand, name]])
    # return model.predict([[kilometres, body_type, cylinder, transmission, drive_train, fuel_type, year, brand, name]])
    predictedValue = model.predict([[kilometres, body_type, cylinder, transmission, drive_train, fuel_type, year, brand, name]])

    return predictedValue.item()