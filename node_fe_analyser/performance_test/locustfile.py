import time
from locust import HttpUser, task, between, constant, FastHttpUser

# This is a Python class for load testing using the FastHttpUser library
# FastHttpUser is a subclass of HttpUser that uses the faster httpx library instead of requests
class QuickstartUser(FastHttpUser):
    # initial wait time of 0 before running tasks
    wait_time = constant(0)  


    @task
    def main_task(self):
        start_time = time.time()
        # self.client.get("/")
        elapsed_time = time.time() - start_time
    
        # Adjust wait time dynamically to maintain 1 request per second
        # self.wait_time = max(0, 1 - elapsed_time)


    def on_start(self):
        """
        This is a Python function that defines a main task, an on_start function that sends a GET request to
        the root URL, and an on_stop function that quits the runner.
        """
        self.client.get("/")
    

    def on_stop(self):
        """
        This is a function in Python that quits the runner when the program is stopped.
        """

        self.environment.runner.quit()


# Path: performance_test\locustfile.py
