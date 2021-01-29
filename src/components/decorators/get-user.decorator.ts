import { createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../../user/schemas/user.schemas';

export const GetUser = createParamDecorator(
    (req, data): UserDocument => req.user,
);
