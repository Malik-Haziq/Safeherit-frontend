from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def highlight_element(driver, element):
    # Execute JavaScript to highlight the element
    driver.execute_script("arguments[0].setAttribute('style', 'background: yellow; border: 2px solid red;');", element)
    time.sleep(1)
    # Remove the highlight
    driver.execute_script("arguments[0].setAttribute('style', 'border: 0px;');", element)

def login():
    service = Service(ChromeDriverManager(version="114.0.5735.90").install())  # Specify a valid version
    driver = webdriver.Chrome(service=service)
    wait = WebDriverWait(driver, 8)
    driver.maximize_window()
    try:
        website_url = 'https://testing-safeherit.web.app/'
        driver.get(website_url)
        time.sleep(3)

        # Replace 'YOUR_USERNAME' and 'YOUR_PASSWORD'
        username = "kaylon.darrian@feerock.com"
        password = "Abc12345"

        login_registerbtn = driver.find_element(By.XPATH, "/html/body/div[1]/div/nav/button")
        highlight_element(driver, login_registerbtn)
        login_registerbtn.click()
        time.sleep(5)

        username_input = wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/main/section[1]/div/form/div[1]/label/input")))
        highlight_element(driver, username_input)
        username_input.send_keys(username)

        password_input = driver.find_element(By.XPATH, "/html/body/div[1]/main/section[1]/div/form/div[2]/label/input")
        highlight_element(driver, password_input)
        password_input.send_keys(password)

        remembermecheckbox = driver.find_element(By.XPATH, "/html/body/div[1]/main/section[1]/div/form/div[3]/div/input")
        highlight_element(driver, remembermecheckbox)
        remembermecheckbox.click()

        login_button = driver.find_element(By.XPATH, "/html/body/div[1]/main/section[1]/div/form/button")
        highlight_element(driver, login_button)
        login_button.click()

        # Wait for some time to see if the login was successful
        time.sleep(10)

    except Exception as e:
        print("Error occurred:", e)
    finally:
        driver.quit()

if __name__ == "__main__":
    login()
