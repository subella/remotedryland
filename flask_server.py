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
hour = 17
minute = 0
second = 0

work_out = None
printed_work_out = None
time_remaining = 0
current_set = 0
work_out_started = False
work_out_time = {"hours":hour, "minutes":minute, "seconds": second}

@app.route('/')
def update():
    workOutStarted = False
    time = datetime.datetime.now()
    time += datetime.timedelta(minutes = 10)
    return render_template('work_out.html', name="Berhta", work_out=work_out, printed_work_out=printed_work_out, current_set=current_set, time_remaining=time_remaining, work_out_started=work_out_started, work_out_time = work_out_time)

def generateWorkout():
    print ("Generating")
    jsondata = open('./static/work_outs_stripped.json').read()
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
    print(work_out)

def loadWorkout():
    global work_out
    jsondata = open('./workouts/3_21_20.json').read()
    work_out = json.loads(jsondata)
    
    print (work_out[0])




def playWorkout():
    print ("Playing")
    global work_out_started
    work_out_started = True
    global current_set
    for i in range(len(work_out)):
        current_set = i
        print (work_out[current_set]["name"])
        countdown(int(work_out[i]["intr"]))
    time.sleep(5)
    work_out_started = False
        

def countdown(set_time):
    for sec in range(set_time, -1, -1):
        global time_remaining
        print (sec)
        time_remaining = sec
        time.sleep(1)
    
        

if __name__ == '__main__':
    sched = BackgroundScheduler()
    #generateWorkout()
    loadWorkout()
    gen_trigger = OrTrigger([
    CronTrigger(hour=hour+1, minute=minute, second=second),
     ])
    play_trigger = OrTrigger([
    CronTrigger(hour=hour, minute=minute, second=second),
     ])
    #sched.add_job(generateWorkout, gen_trigger)
    sched.add_job(playWorkout, play_trigger)
    sched.start()
    app.run(port=8080,debug=True, use_reloader=False)
