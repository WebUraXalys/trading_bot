from pydantic_settings import BaseSettings, SettingsConfigDict

class SisyphusSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix='SISYPHUS_', env_file=".env", env_file_encoding='utf-8')

    BINANCE_API_KEY: str
    BINANCE_API_SECRET: str

SETTINGS = SisyphusSettings()
