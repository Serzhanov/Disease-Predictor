import warnings
import pandas as pd
warnings.filterwarnings("ignore")
import pickle
import json
import sys

with open('model_pickle', 'rb') as f:
    __model = pickle.load(f)

with open('columns.json','r') as f2:
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
    descriptons_of_diseases = pd.read_csv("server/artifacts/symptom_Description.csv")
    desc = dict(descriptons_of_diseases.values)
    return desc

def get_dict_precautions():
    precautions_of_diseases = pd.read_csv("server/artifacts/symptom_precaution.csv")
    if (precautions_of_diseases.isnull().values.any()):
        precautions_of_diseases=precautions_of_diseases.fillna("")
    prec = precautions_of_diseases.set_index('Disease').T.to_dict('list')
    return prec
def returnStatement():
    disease=get_disease(sys.argv[1])
    descriptionInfo=get_dict_descriptions().get(disease)
    precaution=get_dict_precautions().get(disease)
    print("go")
    return (disease,descriptionInfo,precaution)
    
if __name__ == "__main__":
    # arguments to execute [values of symptoms in 0 1 format]
    returnStatement()