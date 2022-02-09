import warnings
import pandas as pd
warnings.filterwarnings("ignore")
import pickle
import json

with open('artifacts/model_pickle', 'rb') as f:
    __model = pickle.load(f)

with open('artifacts/columns.json','r') as f2:
    __all_symp=json.load(f2)['data_colums']

def get_all_symp():
    return __all_symp

def get_disease(symptoms):
    symptoms2D=[symptoms]
    try:
        result = __model.predict(symptoms2D)
        return result[0]
    except:
        print("Error in prediction")
    return None


def get_dict_descriptions():
    descriptons_of_diseases = pd.read_csv("artifacts/symptom_Description.csv")
    desc = dict(descriptons_of_diseases.values)
    return desc

def get_dict_precautions():
    precautions_of_diseases = pd.read_csv("artifacts/symptom_precaution.csv")
    prec = precautions_of_diseases.set_index('Disease').T.to_dict('list')
    return prec
