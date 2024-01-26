from pydantic_settings import BaseSettings, SettingsConfigDict

class SisyphusSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix='SISYPHUS_', env_file=".env", env_file_encoding='utf-8')

    BINANCE_API_KEY: str = "NO KEY"
    BINANCE_API_SECRET: str= "NO SECRET"

    MIN_IMPULSE_PERCENT: float = 0.95

SETTINGS = SisyphusSettings()
