import json
import re
import os
import requests
from bs4 import BeautifulSoup

USER_DATA = """
# Products Data

### Page 1
1. Name: 10% Minoxidil Hair growth Solution 60ml
   URL: https://buytretinoin.org/product/10-minoxidil-hair-growth-solution-60ml/
   Image: https://buytretinoin.org/wp-content/uploads/2025/07/Minoxytop-10.webp
2. Name: 20% Azelaic Acid Cream 30G Azelderm
   URL: https://buytretinoin.org/product/20-azelaic-acid-cream-30g-azelderm/
   Image: https://buytretinoin.org/wp-content/uploads/2025/03/azelderm-krem-300x204-1.png
3. Name: 20% Vitamin C+ Vitamin E + Ferulic Acid Serum 30ml (No Box)
   URL: https://buytretinoin.org/product/20-vitamin-c-vitamin-e-ferulic-acid-serum-30ml-no-box/
   Image: https://buytretinoin.org/wp-content/uploads/2026/06/thumbnail-33.jpg
4. Name: 25% Hydrogen Peroxide Professional Teeth Whitening kit
   URL: https://buytretinoin.org/product/25-hydrogen-peroxide-professional-teeth-whitening-kit/
   Image: https://buytretinoin.org/wp-content/uploads/2025/08/Hcdf767c921b74add819d97abfe0c63c1s.jpg

5. Name: 3D Face Lift Anti-Aging Serum 30ml
   URL: https://buytretinoin.org/product/3d-face-lift-anti-aging-serum-30ml/
   Image: https://buytretinoin.org/wp-content/uploads/2025/11/il_1588xN.2810618295_8vqz-scaled-1-300x300-1.jpg
6. Name: 4 In 1Anti-Aging Firmin Lifting Serum 30 ML
   URL: https://buytretinoin.org/product/4-in-1anti-aging-firmin-lifting-serum-30-ml/
   Image: https://buytretinoin.org/wp-content/uploads/2025/11/He31348d5314a4ec29653c9ccfac57d5f3.jpg
7. Name: 42% Urea Cream Cream + Salicylic Acid 2% +Jojoba Oil + Aloe Vera + Hyaluronic Acid + Shea Butter + Aloe Vera + Camellia Seed Oil 100G NO BOX
   URL: https://buytretinoin.org/product/42-urea-cream-cream-salicylic-acid-2-jojoba-oil-aloe-vera-hyaluronic-acid-shea-butter-aloe-vera-camellia-seed-oil-100g-no-box/
   Image: https://buytretinoin.org/wp-content/uploads/2025/10/Hb9dd1faf330a43749d19a7918c27a5d7J.jpg_960x960.webp

8. Name: A-Ret Tretinoin Gel 0.025% Retin-A Gel 20G EXP 03/2027
   URL: https://buytretinoin.org/product/tretinoin-gel-0-025-retin-a-gel-20g/
   Image: https://buytretinoin.org/wp-content/uploads/2025/02/IMG-20230529-WA0008.webp
9. Name: A-Ret Tretinoin Gel 0.05% EXP 08/2027
   URL: https://buytretinoin.org/product/tretinoin-gel-0-05/
   Image: https://buytretinoin.org/wp-content/uploads/2025/02/Tretinoin-gel-A-ret-0.05-verpakking.webp

10. Name: Acne scar removal stretch mark removal Ointment Gel – for Wounds, Cuts and burns keloid Scarring 30G
    URL: https://buytretinoin.org/product/acne-scar-removal-stretch-mark-removal-ointment-gel-for-wounds-cuts-and-burns-keloid-scarring-30g/
    Image: https://buytretinoin.org/wp-content/uploads/2025/11/s-l1600-19-300x300-1.jpg
11. Name: Acnelyse Tretinoin Cream 0.1% 20G EXP 11/28
    URL: https://buytretinoin.org/product/acnelyse-tretinoin-cream-0-1-20g-exp-11-28/
    Image: https://buytretinoin.org/wp-content/uploads/2025/02/384531012_1011155483421289_8978251533579575863_n_0ea11797980048feab5cecba7e35c41a_master-1.webp
12. Name: Adapalene 0.1% Gel 15G 09/2026
    URL: https://buytretinoin.org/product/adapalene-0-1-gel-15g/
    Image: https://buytretinoin.org/wp-content/uploads/2025/03/adapalene.webp


### Page 2
1. Name: Azelaic Acid Cream 20% 15G 07/2026
   URL: https://buytretinoin.org/product/azelaic-acid-cream-20-15g-07-2026/
   Image: https://buytretinoin.org/wp-content/uploads/2025/02/Azelaic-Acid-Cream-20-15G-1.png
2. Name: Azelaic Acid Cream 20% 15G NEW STOCK 07/2027
   URL: https://buytretinoin.org/product/azelaic-acid-cream-20-15g/
   Image: https://buytretinoin.org/wp-content/uploads/2025/02/Azelaic-Acid-Cream-20-15G-1.png
3. Name: Azelaic Acid Gel 20% 20G (Azelax) 06/2027
   URL: https://buytretinoin.org/product/azelaic-acid-cream-20-20g-azelax/
   Image: https://buytretinoin.org/wp-content/uploads/2025/11/WhatsApp-Image-2025-04-21-at-8.28.47-AM-1.jpeg
4. Name: Aziderm Azelaic Acid Gel 20% – 15G Exp 03/2027
   URL: https://buytretinoin.org/product/aziderm-azelaic-acid-gel-20-15g/
   Image: https://buytretinoin.org/wp-content/uploads/2025/09/Azelaic-Acid-Gel-20.jpg

5. Name: Biluma Cream Melasma Pigmentation Skin Lightening Pigmentation Acne Scarring 15g Exp 08/26
   URL: https://buytretinoin.org/product/biluma-cream-melasma-pigmentation-skin-lightening-pigmentation-acne-scarring-15g-exp-08-25/
   Image: https://buytretinoin.org/wp-content/uploads/2025/03/s-l1600-1.jpg
6. Name: Blinq-I-Lash 3ml serum
   URL: https://buytretinoin.org/product/blinq-i-lash-3ml-serum/
   Image: https://buytretinoin.org/wp-content/uploads/2025/02/37315a5a5a53a297de43914e6a28d02d.jpg
7. Name: Careprost Eyelash Growth Serum Drops 1 Bottles 3ml 2 Months Supply 06/2026
   URL: https://buytretinoin.org/product/careprost-eyelash-growth-serum-drops-1-bottle-3ml-2-months-supply-2/
   Image: https://buytretinoin.org/wp-content/uploads/2025/03/images.jpeg
8. Name: Careprost Eyelash Growth Serum Drops 3 Bottles 3ml 6 Months Supply 06/2026 LIMITED STOCK AVAILABLE GET IT BEFOFE IT HAS GONE !!!
   URL: https://buytretinoin.org/product/careprost-eyelash-growth-serum-drops-3-bottles-3ml-6-months-supply/
   Image: https://buytretinoin.org/wp-content/uploads/2025/03/490c040a-0574-9a9a-2f84-7a43159d689b.jpg

9. Name: Demelan Cream 20G EXP 03/2026
   URL: https://buytretinoin.org/product/demelan-cream-20g-exp-03-2026/
   Image: https://buytretinoin.org/wp-content/uploads/2025/03/RELIPROD011-1-1.jpg
10. Name: Eyebliss Under Eye Cream Vitamin C 20% Face Serum 15G
    URL: https://buytretinoin.org/product/eyebliss-under-eye-cream-vitamin-c-20-face-serum-15g/
    Image: https://buytretinoin.org/wp-content/uploads/2025/11/51kKLrEIPuL._AC_UF10001000_QL80_.jpg
11. Name: Hydroquinone Cream 4% Melalite Forte 4% 30G EXP 10/2027
    URL: https://buytretinoin.org/product/hydroquinone-cream-4-melalite-forte-4-30g/
    Image: https://buytretinoin.org/wp-content/uploads/2025/02/Hydroquinone-Cream-4-Melalite-Forte-4-30G-1.png
12. Name: Instafil Gel Instant Wrinkle Filler. Perfect Primer (15 ml) NO BOX X 2
    URL: https://buytretinoin.org/product/instafil-gel-instant-wrinkle-filler-perfect-primer-15-ml-no-box-x-2/
    Image: https://buytretinoin.org/wp-content/uploads/2025/11/shopping-2.webp

### Page 3
1. Name: Kojic Acid & Glutamine Brightening Lightening Soap Bar X 1 150G
   URL: https://buytretinoin.org/product/kojic-acid-glutamine-brightening-lightening-soap-bar-x-1-150g/
2. Name: Kozicare Skin Lightening Cream with built in SPF30 Vitamin C Ascorbic Acid Kojic Acid, Arbutin Glutathione Liquorice Mulberry Niacinamide 15G
   URL: https://buytretinoin.org/product/kozicare-skin-lightening-cream-with-built-in-spf30-vitamin-c-ascorbic-acid-kojic-acid-arbutin-glutathione-liquorice-mulberry-niacinamide-15g/
3. Name: Kozimax Skin Lightening Cream 15G EXP 02/27
   URL: https://buytretinoin.org/product/kozimax-skin-lightening-cream-15g-exp-03-27-copy/
4. Name: LIPIDZ Rapid Barrier Repair Cream 50ML (NO BOX)
   URL: https://buytretinoin.org/product/lipidz-rapid-barrier-repair-cream-50ml-exp-01-2026/
5. Name: Lumigan® Bimatoprost Lash Enhancer 09/2026 3ml
   URL: https://buytretinoin.org/product/lumigan-bimatoprost-lash-enhancer-09-2026-3ml/
6. Name: Melacare Hydroquinone Tretinoin & Mometasone Furoate Cream 25Gm Exp 01/2027
   URL: https://buytretinoin.org/product/93434/
7. Name: Melano-TX Tranexamic Acid Cream 15G EXP 04/27
   URL: https://buytretinoin.org/product/melano-tx-tranexamic-acid-cream-15g-exp-04-26/
8. Name: My Tret Tretinoin Microsphere Gel 0.1% 15G EXP 06/2027
   URL: https://buytretinoin.org/product/my-tret-tretinoin-microsphere-gel-0-1-15g-2/
9. Name: Perfect Pout Lip Plump & Gloss 10Ml-As Seen On Tv
   URL: https://buytretinoin.org/product/perfect-pout-lip-plump-gloss-10ml-as-seen-on-tv/
10. Name: Rapid Hair Growth / Hair Loss Caffeine Shampoo Energizer 100ml
    URL: https://buytretinoin.org/product/rapid-hair-growth-hair-loss-caffeine-shampoo-energizer-100ml/
11. Name: Reti K Premium Pure Micro Capsulized Retinol Anti-Aging Cream with Vitamin C E K1 30G EXP 03/26
    URL: https://buytretinoin.org/product/reti-k-premium-pure-micro-capsulized-retinol-anti-aging-cream-with-vitamin-c-e-k1-30g-exp-01-26/
12. Name: Skin light Hydroquinone + Tretinoin Mometasone Furoate 25G Exp 06/2027
    URL: https://buytretinoin.org/product/skin-light-hydroquinone-tretinoin-mometasone-furoate-25g-exp-01-26/

### Page 4
1. Name: Tazorac Cream (Tazarotene Cream) 0.1% EXP 06/2027
   URL: https://buytretinoin.org/product/tazorac-cream-tazarotene-cream-0-1-20g/
2. Name: Tretimaxx 0.1% Treinoin Cream 20G EXP 02/2027
   URL: https://buytretinoin.org/product/tretimaxx-0-1-treinoin-cream-20g-exp-2027/
3. Name: Tretin Tretinoin Cream 0.05% Large 30G EXP 05/2027
   URL: https://buytretinoin.org/product/tretinoin-cream-0-05-large-30g/
4. Name: Tretinoin 0.025% Tretiheal Cream 20G
   URL: https://buytretinoin.org/product/tretinoin-0-025-tretiheal-cream-20g/
5. Name: Tretinoin 0.05% Tretiheal Cream 20G
   URL: https://buytretinoin.org/product/tretinoin-0-05-tretiheal-cream-20g/
6. Name: Tretinoin 0.1 Cream 20G
   URL: https://buytretinoin.org/product/tretinoin-0-1-cream-20g/
7. Name: Tretinoin 0.1% Microshere 20G Exp 01/2027
   URL: https://buytretinoin.org/product/tretinoin-0-1-microshere-20g-exp-01-2027/
8. Name: Tretinoin Cream 0.025 Large 30g (Tretin ) EXP 08/2027
   URL: https://buytretinoin.org/product/tretinoin-cream-0-025-30g/
9. Name: Tretinoin Gel 0.1 20G Exp 02/2027
   URL: https://buytretinoin.org/product/tretinoin-gel-0-1-20g-exp-08-2026/
10. Name: Tretinoin Gel 0.1 20G Exp 07/2027
    URL: https://buytretinoin.org/product/tretinoin-gel-0-1-20g/
11. Name: Tri-Luma Cream1 Exp 02/2027
    URL: https://buytretinoin.org/product/tri-luma-cream/
12. Name: V34 Effective Violet Colour Corrector Teeth Whitening Toothpaste 30ml
    URL: https://buytretinoin.org/product/v34-effective-violet-colour-corrector-teeth-whitening-toothpaste-30ml/

### Page 5
1. Name: Vitamin C Cleanser – Hyaluronic Acid Glycolic Acid Kokum Butter Aloe Vera Facial Soap Free 70ml
   URL: https://buytretinoin.org/product/vitamin-c-cleanser-hyaluronic-acid-glycolic-facial-soap-70ml/
2. Name: Wrinkle Blur Under Eye Bag Removal & Makeup Primer 30ml (No Box)
   URL: https://buytretinoin.org/product/wrinkle-blur-under-eye-bag-removal-makeup-primer-30ml-no-box/
3. Name: Xtralight Tretinoin 0.05% Azelaic Acid 10% Cream 15G EXP 02/2026
   URL: https://buytretinoin.org/product/xtralight-tretinoin-0-05-azelaic-acid-10-cream-15g-exp-01-26/
4. Name: Z-Block Sunscreen Anti-Aging SPF 50 Water Based Gel 50ml
   URL: https://buytretinoin.org/product/z-block-sunscreen-anti-aging-spf-50-water-based-gel-50ml/
"""

# 1. Parse USER_DATA to get known images and URLs
known_images = {} # url -> image_url
product_urls = {} # name_keywords -> url

lines = USER_DATA.split("\n")
curr_name = None
curr_url = None
curr_image = None
for line in lines:
    line = line.strip()
    if re.search(r'^\d+\.\s*Name:', line):
        curr_name = re.sub(r'^\d+\.\s*Name:', '', line).strip()
        curr_url = None
        curr_image = None
    elif line.startswith("URL:"):
        curr_url = line.replace("URL:", "").strip()
        if curr_name:
            # simple normalization for matching
            norm = curr_name.lower()
            product_urls[norm] = curr_url
    elif line.startswith("Image:"):
        curr_image = line.replace("Image:", "").strip()
        if curr_url and curr_image:
            known_images[curr_url] = curr_image

print(f"Parsed {len(product_urls)} products with URLs, {len(known_images)} with known image URLs.")

# 2. Read products.json to match them
with open('src/data-products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

def find_best_match(p_name):
    p_name_lower = p_name.lower()
    
    # Direct match first
    for k, v in product_urls.items():
        if p_name_lower in k or k in p_name_lower:
            return v
            
    # Fuzzy match by words
    p_words = set(re.findall(r'\w+', p_name_lower))
    best_match = None
    best_score = 0
    for k, v in product_urls.items():
        k_words = set(re.findall(r'\w+', k))
        score = len(p_words.intersection(k_words))
        if score > best_score and score > 2:
            best_score = score
            best_match = v
    return best_match

os.makedirs('public/images/products', exist_ok=True)

mapped_count = 0
for p in data['products']:
    url = find_best_match(p['name'])
    image_url = None
    if url:
        if url in known_images:
            image_url = known_images[url]
        else:
            # fetch the page
            try:
                print(f"Fetching URL for image: {url}")
                r = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
                if r.status_code == 200:
                    soup = BeautifulSoup(r.text, 'html.parser')
                    # Find og:image or first big image
                    og = soup.find('meta', property='og:image')
                    if og and og.get('content'):
                        image_url = og['content']
                    else:
                        img = soup.select_one('.woocommerce-product-gallery__image img')
                        if img and img.get('src'):
                            image_url = img['src']
            except Exception as e:
                print(f"Failed to fetch {url}: {e}")
                
    if image_url:
        ext = image_url.split('.')[-1].split('?')[0]
        if len(ext) > 4: ext = 'jpg'
        out_path = f"public/images/products/{p['id']}.{ext}"
        if not os.path.exists(out_path):
            print(f"Downloading {image_url} -> {out_path}")
            try:
                ir = requests.get(image_url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
                if ir.status_code == 200:
                    with open(out_path, 'wb') as imgf:
                        imgf.write(ir.content)
                    mapped_count += 1
            except Exception as e:
                print(f"Failed to download image: {e}")
        else:
            mapped_count += 1
    else:
        print(f"Could not find image for {p['name']}")

print(f"Total downloaded/mapped: {mapped_count}")

# 3. Update products.ts
files = os.listdir('public/images/products')
product_images_map = {}
for f in files:
    name, ext = os.path.splitext(f)
    product_images_map[name] = ext.replace('.', '')

map_str = "const PRODUCT_IMAGES: Record<string, string> = {\n"
for k, v in product_images_map.items():
    map_str += f'  "{k}": "{v}",\n'
map_str += "};\n"

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the existing PRODUCT_IMAGES mapping
# We'll use regex to find and replace the block
pattern = re.compile(r'const PRODUCT_IMAGES.*?};', re.DOTALL)
new_content = pattern.sub(map_str.strip(), content)

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Updated products.ts!")
