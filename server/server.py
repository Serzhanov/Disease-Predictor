from re import L
from flask import Flask,request,jsonify,json,render_template, template_rendered
from flask_cors import CORS
from logging import FileHandler,WARNING
import util
app = Flask(__name__,template_folder='../template',static_folder='../static')
CORS(app,support_credentials=True)
description=""
precautions=[]
file_handler = FileHandler('errorlog.txt')
file_handler.setLevel(WARNING)

@app.route('/get_all_symptoms')
def get_all_symptoms():
    response = jsonify({
        'symptoms': util.get_all_symp()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/passing_the_symptoms',methods =['POST'])
def passing_the_symptoms():
    global precautions,description
    symptoms = request.get_json()
    answer=util.get_disease(symptoms['symptoms'])
    #Description delcaration
    descriptons_of_diseases = util.get_dict_descriptions()
    description = descriptons_of_diseases.get(answer)
    # Precaution delcaration
    precautions_dict = util.get_dict_precautions()
    precautions = precautions_dict.get(answer)
    response =jsonify({
        'predicted_disease': answer
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response




@app.route('/get_description')
def get_description():
    global description
    if description=="":
        return "We dont have the description of this disease"
    response = jsonify({
        'description_disease': description
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/get_precaution')
def get_precaution():
    global precautions
    if (len(precautions)==0):
        return "You have not received yet the result of your symptoms"
    to_add_precautions=",".join(precautions)
    response = jsonify({
        'precautions_of_disease': to_add_precautions
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


app.run()