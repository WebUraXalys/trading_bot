import sys
sys.path.insert(0,'/path/to/mod_directory')
from back.back.app import app
import uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
