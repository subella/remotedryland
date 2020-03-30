import json
import yaml
import random
from datetime import datetime, timezone, timedelta

full_body_framework = [["warmup_lo", "warmup_up"],
             ["warmup_lo", "warmup_up"],
             ["main_lo", "main_up"],
             ["main_lo", "main_up"],
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
             ["main_ab"],
             ["big_bertha"],
             ["main_ob"],
             ] 
core_framework = [["warmup_ab"],
             ["main_ob"],
             ["main_ab"],
             ["main_bk"],
             ["main_ab"],
             ["rest_ab"],
             ["main_ob"],
             ["main_ab"],
             ["big_bertha"],
             ["main_ob"],
             ] 

WORKOUT_POOL = "./workout_pool.json"
WORKOUT_TIMES = "./workout_times.yaml"
WORKOUT_LIST = "./workout_list.js"

def generateWorkout(workout_type):
    jsondata = open(WORKOUT_POOL).read()
    workout_data = json.loads(jsondata)
    workout = []
    framework = full_body_framework if workout_type=="full_body" else core_framework
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
    workout_times = parseYaml(WORKOUT_TIMES)
    if workout_times is None:
        print ("Loading Yaml file failed")
        return
    
    today = datetime.utcnow()
    workout_list = []
    for day_number in range(7):
        for workout_container in workout_times["workout_list"]:
            workout = workout_container["workout"]
            workout_date = today + timedelta(days=day_number)
            workout_day = datetime.strptime(workout_date.isoformat(), "%Y-%m-%dT%H:%M:%S.%f").strftime('%A')
            
            if workout_day not in workout["days"]:
                continue
            
            workout_hour = int(datetime.strptime(workout["time"], "%H:%M").strftime("%H"))
            workout_minute = int(datetime.strptime(workout["time"], "%H:%M").strftime("%M"))
            workout_date = workout_date.replace(hour=workout_hour,minute=workout_minute,second=0, microsecond=0, tzinfo=timezone.utc)

            workout = generateWorkout(workout["type"])
            data = {}
            data['date'] = workout_date.isoformat()
            data['workout'] = workout
            workout_list.append(data)
        
    writeWorkout(workout_list)
    

def writeWorkout(workout):
    with open(WORKOUT_LIST, 'w') as f:
        f.write("var workout_list = ")
        json.dump(workout, f, indent=2)

def parseYaml(yaml_file):
    with open(yaml_file, 'r') as stream:
        try:
            workout_times = yaml.safe_load(stream)
            return workout_times 
        except yaml.YAMLError as exc:
            print(exc)
            return None
 
generateWeek()
#parseYaml("./workout_times.yaml")
