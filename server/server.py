from flask import Flask,request,jsonify,json
import util
app = Flask(__name__)

Current_disease=None


@app.route('/get_all_symptoms')
def get_all_symptoms():
    response = jsonify({
        'symptoms': util.get_all_symp()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response



@app.route('/passing_the_symptoms')
def passing_the_symptoms():
    global Current_disease
    print(request)
    symptoms = json.loads(request.args.get('symptoms'))
    # do some stuff
    print(symptoms)
    response =jsonify({
        'predicted_disease': util.get_disease(symptoms)
    })
    Current_disease=str(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/get_description')
def get_description():
    global Current_disease
    if(Current_disease!=None):
        return "You have not received yet the result of your symptoms"
    descriptons_of_diseases=util.get_dict_descriptions()
    description=descriptons_of_diseases.get(Current_disease)
    return description


@app.route('/get_precaution')
def get_precaution():
    global Current_disease
    if (Current_disease != None):
        return "You have not received yet the result of your symptoms"
    precautions_dict=util.get_dict_precautions()
    precaution=precautions_dict.get(Current_disease)

    return "\n".join(precaution)

app.run()