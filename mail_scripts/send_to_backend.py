# Based on https://github.com/sipb/dormdigest-backend/blob/main/mail_scripts/send_to_backend.py

import sys
import os
import json
from urllib import request, error
from datetime import datetime


TOKEN = os.getenv("BACKEND_SHARED_SECRET")
ENDPOINT = os.getenv("ENDPOINT")

_headers = {"Content-Type": "application/json"}


# Copied from linked code
def save_last_email(email):
    filename = datetime.now().strftime("%Y-%m-%d_%H-%M-%S.txt")
    filepath = "./saved/" + filename
    with open(filepath, "w") as f:
        f.write(email + "\n")

    link = "mail_scripts/saved/" + filename
    return link


# Modified from linked code
def pass_to_api(email, endpoint, *, save=True):
    payload = {
        "email": email,
        "token": TOKEN,
    }
    req = request.Request(
        endpoint, data=json.dumps(payload).encode(), headers=_headers, method="POST"
    )

    response = request.urlopen(req)
    if response.status == 201 and save:
        save_last_email(email)


if __name__ == "__main__":
    email = sys.stdin.read()
    pass_to_api(email, ENDPOINT, save=True)

    # DormDigest has both a dev an production endpoint, but we don't need that right now.
    # I also skipped the "send message on failure" part.
