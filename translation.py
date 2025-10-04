import requests
import hashlib
# REMOVED: from app import TranslationCache (Do NOT import it here at the top)

# MyMemory API endpoint
API_URL = "https://api.mymemory.translated.net/get"

# Optional: Register for free at mymemory.translated.net and add your email here
MYMEMORY_EMAIL = None # Example: 'your-email@example.com'

def translate_text(text, target_language='en', source_language='en'):
    """
    Translates text using the MyMemory API with database caching.
    """
    # MOVED a local import here to prevent circular dependency
    from app import TranslationCache 

    if not text or target_language == source_language:
        return text

    # 1. Check the cache first to save API calls
    cached = TranslationCache.get_translation(text, target_language)
    if cached:
        return cached
    
    # 2. If not in cache, call the MyMemory API
    try:
        lang_pair = f"{source_language}|{target_language}"
        
        params = {
            'q': text,
            'langpair': lang_pair
        }
        if MYMEMORY_EMAIL:
            params['de'] = MYMEMORY_EMAIL

        response = requests.get(API_URL, params=params, timeout=10)
        response.raise_for_status() 

        data = response.json()
        
        if data.get('responseStatus') == 200:
            translated_text = data['responseData']['translatedText']
            
            # 3. Store the new translation in the cache for future use
            TranslationCache.add_translation(text, source_language, target_language, translated_text)
            
            return translated_text
        else:
            print(f"MyMemory API Error: {data.get('responseDetails')}")
            return text 

    except requests.exceptions.RequestException as e:
        print(f"Error connecting to MyMemory API: {e}")
        return text 
    except Exception as e:
        print(f"An unexpected error occurred during translation: {e}")
        return text