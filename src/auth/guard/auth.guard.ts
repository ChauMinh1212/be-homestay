import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExceptionResponse } from '../../util/exception';
import { Role, ROLES_KEY } from '../roles.decorator';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) { super() }

    handleRequest(err, user, info: Error, context: ExecutionContext) {
        if (err || !user) {
            throw new ExceptionResponse(HttpStatus.UNAUTHORIZED, 'Token not found')
        }
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        
        if(requiredRoles) {
            const isRole = requiredRoles.some((role) => user.role == role);
            if(!isRole) throw new ExceptionResponse(HttpStatus.FORBIDDEN, 'Bạn không có quyền thực hiện hành động này')
        }
        return user;
    }
}

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
    handleRequest(err, user, info: Error) {
        if (err || !user) {
            throw new ExceptionResponse(HttpStatus.UNAUTHORIZED, 'Token not found')
        }
        return user;
    }
}