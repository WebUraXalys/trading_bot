import time
import jwt
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from back.dto.user import User
from back.settings import settings


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super().__call__(request=request)
        if credentials:
            if credentials.scheme != "Bearer":
                raise HTTPException(401, detail="Wrong auth scheme")
            try:
                secret = settings.SECRET
                token = jwt.decode(credentials.credentials, secret, algorithms=["HS256"])
            except Exception as e:
                print(e)
                raise HTTPException(401, detail="Corrupted token")
            if int(time.time()) > token['exp']:
                raise HTTPException(401, detail="Expired token")
            else:
                return User(**token)
