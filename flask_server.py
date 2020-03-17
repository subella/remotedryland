from flask import Flask, render_template
import datetime
import logging
import json
app = Flask(__name__)

@app.route('/')
def update():
    workOutStarted = False
    time = datetime.datetime.now()
    time += datetime.timedelta(minutes = 10)
    work_out = generateWorkout()
    return render_template('work_out.html', name="Berhta", work_out=work_out)
    if workOutStarted:
        return render_template('template.html', name="Berhta")
    else:
        return render_template('countdown.html', time=str(time))

def generateWorkout():
    jsondata = open('./static/work_outs_new.json').read()
    work_out = json.loads(jsondata)['workouts']
    return work_out



if __name__ == '__main__':
    app.run(debug=True)
