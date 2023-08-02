import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from back.back.app import app
import uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    
