from pydantic import BaseModel


class User(BaseModel):
    login: str
    exp: int


class UserSettings(BaseModel):
    api_key: str | None = None
    secret_key: str | None = None
