import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const UserAuth = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user_data) {
      return request.user_data;
    } else {
      throw new NotFoundException('Usuário não encontrado na requisição');
    }
  },
);
