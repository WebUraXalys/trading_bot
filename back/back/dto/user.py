from pydantic import BaseModel


class User(BaseModel):
    id: int
    exp: int
    login: str
    api_key: str | None = None
    secret_key: str | None = None


class UserSettings(BaseModel):
    api_key: str | None = None
    secret_key: str | None = None
