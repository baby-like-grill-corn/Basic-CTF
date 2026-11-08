p=int(input("p="))
b=int(input("b="))
a=int(input("a="))
g=int(input("g="))
print("g^a mod p = A = ", pow(g,a,p))
print("g^b mod p = B =  ",pow(g,b,p))
print("Alice:", pow( pow(g,b,p) ,a, p) )
print("Bob:", pow(pow(g,a,p), b, p))


