import csv
import time
from selenium import webdriver
from selenium.webdriver.common.by import By

# Set up browser configuration
driver = webdriver.Chrome() 
url = "https://buytretinoin.org/"
driver.get(url)
time.sleep(5) # Allow the page to load fully

reviews_data = []

# Loop through pagination pages (Update max pages as needed)
max_pages = 10 

for page in range(1, max_pages + 1):
    print(f"Scraping page {page}...")
    
    # Locate individual review container blocks
    # Note: Inspect the elements on your staging environment to adjust exact class targets
    reviews = driver.find_elements(By.CLASS_NAME, "review-item-container") 
    
    for review in reviews:
        try:
            author = review.find_element(By.CLASS_NAME, "reviewer-name").text
            rating = review.find_element(By.CLASS_NAME, "rating-stars").text
            date = review.find_element(By.CLASS_NAME, "review-date").text
            product = review.find_element(By.CLASS_NAME, "product-title").text
            text = review.find_element(By.CLASS_NAME, "review-text").text
            
            reviews_data.append([author, rating, date, product, text])
        except Exception as e:
            continue
            
    # Click next page button
    try:
        next_button = driver.find_element(By.LINK_TEXT, str(page + 1))
        next_button.click()
        time.sleep(3) # Safe buffer for AJAX content to refresh
    except:
        print("Reached the end of pagination or next button missing.")
        break

# Save all scraped reviews to a CSV file
with open('buytretinoin_reviews.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Author', 'Rating', 'Date', 'Product', 'Review Text'])
    writer.writerows(reviews_data)

driver.quit()
print("Scraping completed! File saved as buytretinoin_reviews.csv")