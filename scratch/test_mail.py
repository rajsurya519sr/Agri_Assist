import smtplib
from dotenv import load_dotenv
import os

load_dotenv()

def clean_env(key, default=None):
    val = os.environ.get(key, default)
    if val and isinstance(val, str):
        return val.strip("'").strip('"').strip()
    return val

username = clean_env('MAIL_USERNAME')
password = clean_env('MAIL_PASSWORD')
server = clean_env('MAIL_SERVER', 'smtp.gmail.com')
port = int(clean_env('MAIL_PORT', 587))

print(f"Testing connection for: {username}")
print(f"Using server: {server}:{port}")

try:
    with smtplib.SMTP(server, port) as smtp:
        smtp.starttls()
        smtp.login(username, password)
        print("SUCCESS: Login successful!")
except Exception as e:
    print(f"FAILURE: {e}")
