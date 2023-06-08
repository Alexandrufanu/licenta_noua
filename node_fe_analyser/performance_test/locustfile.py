import time
from locust import HttpUser, task, between, constant, FastHttpUser

class QuickstartUser(FastHttpUser):
    # initial wait time of 0 before running tasks
    wait_time = constant(0)  


    @task
    def hello_world(self):
        start_time = time.time()
        # self.client.get("/")
        elapsed_time = time.time() - start_time
    
        # Adjust wait time dynamically to maintain 1 request per second
        # self.wait_time = max(0, 1 - elapsed_time)


    def on_start(self):
        self.client.get("/")
        # post("/login", json={"username":"foo", "password":"bar"})
    

    def on_stop(self):
        self.environment.runner.quit()
