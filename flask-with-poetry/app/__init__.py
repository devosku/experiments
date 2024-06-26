import os
import time

import redis
from flask import Flask

app = Flask(__name__)

redis_host = os.getenv("REDIS_HOST")

cache = redis.Redis(host="redis", port=6379)


def get_hit_count() -> int:
    retries = 5
    while True:
        try:
            return cache.incr("hits")
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)


@app.route("/")
def hello_world() -> str:
    count = get_hit_count()
    return "Hello World! I have been seen {} times.\n".format(count)
