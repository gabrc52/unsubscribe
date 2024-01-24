# Based on https://github.com/sipb/dormdigest-backend/blob/main/mail_scripts/send_to_backend.py

import sys
import os
import json
from urllib import request, error
from datetime import datetime
from config import TOKEN, ENDPOINT

# Go to script's location
abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)
# Ensure the `saved` folder exist
if not os.path.exists("saved"):
    os.mkdir("saved")


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
    try:
        req = request.Request(
            endpoint,
            data=json.dumps(payload).encode(),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        response = request.urlopen(req)
    # We want to save the email no matter what (especially useful if error)
    finally:
        save_last_email(email)


if __name__ == "__main__":
    email = sys.stdin.read()
    pass_to_api(email, ENDPOINT, save=True)

    # DormDigest has both a dev an production endpoint, but we don't need that right now.
    # I also skipped the "send message on failure" part.
