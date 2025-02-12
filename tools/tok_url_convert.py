import requests


def get_full_url(short_url):
    try:
        response = requests.get(short_url, allow_redirects=True)
        return response.url
    except requests.exceptions.RequestException as e:
        return f"Error: {str(e)}"


# Example usage
urls = [
    "https://vm.tiktok.com/ZNeKBA8QP/",
    "https://vm.tiktok.com/ZNeouxkXP/",
    "https://vm.tiktok.com/ZNeouCXdC/",
    "https://vm.tiktok.com/ZNeouH4F5/",
    "https://vm.tiktok.com/ZNeou7t6r/",
    "https://vm.tiktok.com/ZNeou9o1f/",
    "https://vm.tiktok.com/ZNeousy7p/",
    "https://vm.tiktok.com/ZNeou48V5/",
    "https://vm.tiktok.com/ZNeoucmg4/",
    "https://vm.tiktok.com/ZNeouCbPe/",
    "https://vm.tiktok.com/ZNeoucs3N/",
    "https://vm.tiktok.com/ZNeouH77n/",
    "https://vm.tiktok.com/ZNeouoX6f/",
    "https://vm.tiktok.com/ZNeou4JAn/",
]
for url in urls:
    full_url = get_full_url(url)
    print(full_url.split("?")[0])
