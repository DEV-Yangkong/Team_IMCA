import requests

service= "a587792556ca44c5af747c8652c82345"

url =f"http://www.kopis.or.kr/openApi/restful/pblprfr?service={service}&stdate=20230801&eddate=20230831&cpage=1&rows=5&shcate=AAAA&area=11"
response = requests.get(url)
if response.status_code ==200:
    print(response.text)