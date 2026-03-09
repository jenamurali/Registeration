from sqlalchemy.ext.asyncio import async_sessionmaker
from app.Repository.user import UserRepository
from app.Models.user import User

class UnitOfWork:
    def __init__(self, session_factory: async_sessionmaker):
        self.session_factory = session_factory

    async def __aenter__(self):
        self.session = self.session_factory()
        # Instantiate repositories and inject the shared session
        self.users = UserRepository(User, self.session)
        return self

    async def __aexit__(self, exc_type, exc_val, traceback):
        if exc_type:
            # Rollback if any exception was raised in the service layer
            await self.session.rollback()
        else:
            # Commit automatically on success
            await self.session.commit()
        
        await self.session.close()