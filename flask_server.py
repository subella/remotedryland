from flask import Flask, render_template
import datetime
import logging
import json
from apscheduler.triggers.combining import OrTrigger
from apscheduler.triggers.cron import CronTrigger
from apscheduler.schedulers.background import BackgroundScheduler
import time
import random

app = Flask(__name__)

framework = [["warmup_lo", "warmup_up"],
             ["warmup_lo", "warmup_up"],
             ["main_lo", "main_up"],
             ["main_lo", "main_up"],
             ["main_lo", "main_up"],
             ["rest"],
             ["warmup_ab"],
             ["main_ob"],
             ["main_ab"],
             ["main_bk"],
             ["main_ab"],
             ["rest_ab"],
             ["main_ob"],
             ["big_bertha"],
             ["main_ob"],
             ] 

work_out = None
printed_work_out = None
time_remaining = 0
current_set = 0

@app.route('/')
def update():
    workOutStarted = False
    time = datetime.datetime.now()
    time += datetime.timedelta(minutes = 10)
    return render_template('work_out.html', name="Berhta", work_out=work_out, printed_work_out=printed_work_out, current_set=current_set, time_remaining=time_remaining)

    if workOutStarted:
        return render_template('template.html', name="Berhta")
    else:
        return render_template('countdown.html', time=str(time))

def generateWorkout():
    jsondata = open('./static/work_outs_new.json').read()
    global work_out
    global printed_work_out
    work_out_data = json.loads(jsondata)['workouts']
    work_out = []
    printed_work_out = framework.copy()

    rest = {"name":"Rest", "intr":10, "reps":10} 
    for exercise in range(len(framework)):
        sets=[] 
        for type_ in range(len(framework[exercise])):
            pool = [i for i in work_out_data if i["type"] == framework[exercise][type_]  and i not in work_out]
            if len(pool) > 0:
                choice = random.choice(pool)
                sets.append(choice)
                printed_work_out[exercise][type_]= choice

        if len(sets) >0: 
            for k in range(int(sets[0]["rnds"])):
                for p in range(len(sets)):
                    work_out.append(sets[p])         
                    rest["intr"] = sets[p]["rest"]
                    rest["reps"] = ":"+sets[p]["rest"]
                    work_out.append(rest)         

    print (work_out)
    playWorkout(work_out)

def playWorkout(work_out):
    global current_set
    for i in range(len(work_out)):
        current_set = i
        
        print (work_out[i]["name"])
        countdown(int(work_out[i]["intr"]))
        

def countdown(set_time):
    for sec in range(set_time, 0, -1):
        global time_remaining
        time_remaining = sec
        time.sleep(1)
        print (sec)
    
        

if __name__ == '__main__':
    sched = BackgroundScheduler()
    trigger = OrTrigger([
    CronTrigger(hour='*', minute='*', second='*'),
     ])
    sched.add_job(generateWorkout, trigger)
    sched.start()
    app.run(debug=True, use_reloader=False)
