user_name = input('name: ')
name = user_name or 'N/A'

if name == 'N/A':
    print('No name')
else:
    print('Hello', name)

user_address = input('address: ')
address = user_address or 'N/A'

user_AdressNumber = input('Address Number: ')
addressNumber = user_AdressNumber or 'N/A'

user_city = input('City: ')
city = user_city or 'N/A'

if city == 'N/A' or address == 'N/A' or addressNumber == 'N/A':
    print('You are not registered')
else:
    print('You are registered at', address, addressNumber, 'in', city)

user_age = input('Age: ')
age = user_age or 'N/A'
xAge = int(age)
adult = (xAge > 18 )
if age == adult: 
    print('You are old enough to vote')
else:
    print('You are not old enough to vote')


