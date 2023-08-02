from pydantic_settings import BaseSettings
from dotenv import load_dotenv


class Settings(BaseSettings):
    SECRET: str = "DEFAULT"

    class Config:
        env_prefix: str = "TB_"


load_dotenv()
settings = Settings()
