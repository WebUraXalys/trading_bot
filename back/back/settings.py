from pydantic_settings import BaseSettings
from dotenv import load_dotenv


class Settings(BaseSettings):

    class Config:
        env_prefix: str = "TB_"


load_dotenv()
settings = Settings()
