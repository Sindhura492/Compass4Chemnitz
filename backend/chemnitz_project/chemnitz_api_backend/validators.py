import re

def validate_password(password):
    errors = []

    # check length
    if len(password) < 7:
        errors.append("Password must be at least 7 characters long.")

    #checking for uppercase
    if not re.search(r'[A-Z]', password):
        errors.append("Password must contain at least one uppercase letter.")

    #checking for lowercase
    if not re.search(r'[a-z]', password):
        errors.append("Password must contain at least one lowercase letter.")

    #checking for atleast one number
    if not re.search(r'\d', password):
        errors.append("Password must contain at least one digit.")

    #checking for speacial characters
    if not re.search(r'[~!@#$%^&*()_+{}":;<>\']', password):
        errors.append("Password must contain at least one special character")

    if errors:
        raise ValueError(errors)



def validate_email(email):
    if not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email):
        raise ValueError("Enter a valid email address.")
