import time
import random

def get_snippet():
    snippets = [
        "def hello_world():\n    print('Hello, Python!')",
        "x = [i for i in range(10) if i % 2 == 0]",
        "class Developer:\n    def __init__(self, name):\n        self.name = name",
        "import requests\nresponse = requests.get('https://api.github.com')",
        "result = map(lambda x: x * 2, [1, 2, 3, 4, 5])"
    ]
    return random.choice(snippets)

def run_test():
    snippet = get_snippet()
    print("\n" + "="*40)
    print("PYTHON TYPING TEST")
    print("="*40)
    print("\nType the following code precisely:\n")
    print("-" * 20)
    print(snippet)
    print("-" * 20)
    
    print("\nPress ENTER when you are ready to start...")
    input()
    
    start_time = time.time()
    user_input = input("Start typing now:\n")
    end_time = time.time()
    
    duration = end_time - start_time
    
    # Calculate Accuracy
    correct_chars = 0
    min_len = min(len(snippet), len(user_input))
    for i in range(min_len):
        if snippet[i] == user_input[i]:
            correct_chars += 1
            
    accuracy = (correct_chars / len(snippet)) * 100 if len(snippet) > 0 else 0
    
    # Calculate WPM
    words = len(user_input) / 5
    minutes = duration / 60
    wpm = words / minutes if minutes > 0 else 0
    
    print("\n" + "="*40)
    print("RESULTS")
    print("="*40)
    print(f"Time:     {duration:.2f} seconds")
    print(f"WPM:      {wpm:.1f}")
    print(f"Accuracy: {accuracy:.1f}%")
    print("="*40)

if __name__ == "__main__":
    try:
        run_test()
    except KeyboardInterrupt:
        print("\nTest cancelled.")
