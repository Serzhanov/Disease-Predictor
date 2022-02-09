import pandas as pd
import pickle
import warnings
warnings.filterwarnings("ignore")
import yaml
#Reading the description file

description_symp=pd.read_csv("server/artifacts/symptom_Description.csv")
description_dict=description_symp.set_index('Disease').to_dict()['Description']

#Reading the precaution file

precautions=pd.read_csv("server/artifacts/symptom_precaution.csv")
precautions["list_of_prec"] = 0
for i in range(precautions.shape[0]):
    values = precautions.iloc[i].values
    values = values.tolist()
    values.pop(len(values)-1)
    precautions["list_of_prec"][i] = values[1:]
precautions_dict=precautions.set_index('Disease').to_dict()["list_of_prec"]


#Getting all symptoms
all_symp={'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3, 'shivering': 4, 'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8, 'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12, 'spotting_ urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16, 'cold_hands_and_feets': 17, 'mood_swings': 18, 'weight_loss': 19, 'restlessness': 20, 'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24, 'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28, 'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32, 'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36, 'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40, 'mild_fever': 41, 'yellow_urine': 42, 'yellowing_of_eyes': 43, 'acute_liver_failure': 44, 'fluid_overload': 45, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47, 'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50, 'throat_irritation': 51, 'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54, 'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58, 'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61, 'irritation_in_anus': 62, 'neck_pain': 63, 'dizziness': 64, 'cramps': 65, 'bruising': 66, 'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69, 'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71, 'brittle_nails': 72, 'swollen_extremeties': 73, 'excessive_hunger': 74, 'extra_marital_contacts': 75, 'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78, 'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82, 'movement_stiffness': 83, 'spinning_movements': 84, 'loss_of_balance': 85, 'unsteadiness': 86, 'weakness_of_one_body_side': 87, 'loss_of_smell': 88, 'bladder_discomfort': 89, 'foul_smell_of urine': 90, 'continuous_feel_of_urine': 91, 'passage_of_gases': 92, 'internal_itching': 93, 'toxic_look_(typhos)': 94, 'depression': 95, 'irritability': 96, 'muscle_pain': 97, 'altered_sensorium': 98, 'red_spots_over_body': 99, 'belly_pain': 100, 'abnormal_menstruation': 101, 'dischromic _patches': 102, 'watering_from_eyes': 103, 'increased_appetite': 104, 'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107, 'rusty_sputum': 108, 'lack_of_concentration': 109, 'visual_disturbances': 110, 'receiving_blood_transfusion': 111, 'receiving_unsterile_injections': 112, 'coma': 113, 'stomach_bleeding': 114, 'distention_of_abdomen': 115, 'history_of_alcohol_consumption': 116, 'blood_in_sputum': 117, 'prominent_veins_on_calf': 118, 'palpitations': 119, 'painful_walking': 120, 'pus_filled_pimples': 121, 'blackheads': 122, 'scurring': 123, 'skin_peeling': 124, 'silver_like_dusting': 125, 'small_dents_in_nails': 126, 'inflammatory_nails': 127, 'blister': 128, 'red_sore_around_nose': 129, 'yellow_crust_ooze': 130}
#Loading model
with open('model_pickle','rb') as f:
    model=pickle.load(f)

#Get the predicted disease from model
def get_the_dis(symptoms,model):
    arr_to_feed_to_model=list()
    under_arr=list()
    for i in range(131):
        under_arr.append(0)
    for k,v in all_symp.items():
        if k in symptoms:
            print(v)
            under_arr[v]=1
    arr_to_feed_to_model.append(under_arr)#model takes 2d arr
    result=model.predict(arr_to_feed_to_model)
    return result[0]

#Get the description of disease
def get_description(description_dict,res):
    return description_dict.get(res)

#Get the precautuins of disease
def get_the_precations(precautions_dict,disease):
    return precautions_dict.get(disease)


#Printing all the code of symptoms
def print_the_symptoms(symptoms):
    print(yaml.dump(symptoms, sort_keys=False, default_flow_style=False))


#Main program

symptoms_patient=[]
print_the_symptoms(all_symp)
while True:
    symptoms_input=input("Enter the code of symptom please or Enter 'STOP' to go for the next step .If you want to delete previous symptom Enter 'del'->: \n")
    symptoms_input=symptoms_input.lower()
    if symptoms_input=='stop':
        break
    elif  len(symptoms_patient)!=0 and symptoms_input=='del':
        symptoms_patient.pop(len(symptoms_patient)-1)
    else:
        name_sym=all_symp.get(int(symptoms_input))
        symptoms_patient.append(name_sym)

print("You have just stopped entering the symptoms.Your result and precaution will be appear below.\n")
print("REMEMBER TO CONSULT WITH DOCTOR")
res=get_the_dis(symptoms_patient,model)
print("RESULT  is ",res)
print("Description of your disease ",get_description(description_dict,res))
print("Your precautions recomended :")
print("Precautions : ",get_the_precations(precautions,res))