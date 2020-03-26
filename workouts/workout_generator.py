import json
import random
from datetime import datetime, timezone, timedelta
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


def generateWorkout():
    jsondata = open('./workout_pool.json').read()
    workout_data = json.loads(jsondata)
    workout = []
    rest = {"name":"Rest", "intr":10, "reps":10} 
    for exercise in range(len(framework)):
        sets=[] 
        for type_ in range(len(framework[exercise])):
            pool = [i for i in workout_data if i["type"] == framework[exercise][type_]  and i not in workout]
            if len(pool) > 0:
                choice = random.choice(pool)
                sets.append(choice)

        if len(sets) >0: 
            for k in range(int(sets[0]["rnds"])):
                for p in range(len(sets)):
                    workout.append(sets[p])         
                    rest["intr"] = sets[p]["rest"]
                    rest["reps"] = ":"+sets[p]["rest"]
                    workout.append(rest)         
    return workout


def generateWeek():
    today = datetime.utcnow()
    workout_date = today.replace(hour=19,minute=30,second=0, microsecond=0)
    workout_list = []
    for day_number in range(7):
        workout_date = today + timedelta(days=day_number)
        workout_date = workout_date.replace(hour=16,minute=55,second=0, microsecond=0)
        workout = generateWorkout()
        data = {}
        data['date'] = workout_date.isoformat()
        data['workout'] = workout
        workout_list.append(data)
        
    writeWorkout(workout_list)
    

def writeWorkout(workout):
    with open('workout_list.js', 'w') as f:
        f.write("var workout_list = ")
        json.dump(workout, f)
    

#workout = generateWorkout()
#writeWorkout(workout);
generateWeek()
