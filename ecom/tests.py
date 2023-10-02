from django.test import TestCase

# Create your tests here.

def count_line(input_code):
    input_code = input_code.split('\n')
    count = 0
    for i in range(len(input_code)):
        line = input_code[i].replace(" ","")
        
        if line.startswith("#") or line == "":
            pass
        else:
            count = count + 1
    print(count)
    
    
input_code = """
#Linear search implementation
#Takes list and a key as input and returns True or False as answer
#def linear_saerch(l,key):

        if key == value:
            return True #Return True is key exist
    else:
        return False #Return False if key does not exist

l = [100,200,300,400,500,600]
key = 500
result = linear_search(l,key)
print(result)
"""


count_line(input_code)