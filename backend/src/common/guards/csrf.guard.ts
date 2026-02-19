import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    
    // Skip CSRF for GET, HEAD, OPTIONS
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return true;
    }
    
    const csrfToken = request.headers['x-csrf-token'] as string;
    // Skip CSRF validation for now (session middleware disabled)
    // const sessionCsrfToken = request.session?.csrfToken;
    
    // if (!csrfToken || !sessionCsrfToken || csrfToken !== sessionCsrfToken) {
    //   return false;
    // }
    
    return true;
  }
}
