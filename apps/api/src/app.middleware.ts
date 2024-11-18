// import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(
//     private jwtService: JwtService,
//     private configService: ConfigService,
//   ) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     // Excluir las rutas estáticas de la verificación de JWT
//     if (req.url.startsWith('/')) {
//       return next(); // Si la solicitud es para un archivo estático, no proceses el JWT
//     }

//     const token = req.headers['authorization']?.split(' ')[1]; // Obtener token del header 'Authorization: Bearer <token>'

//     if (!token) {
//       return res.redirect('/login'); // Si no hay token, redirigir al login
//     }

//     try {
//       const secret = this.configService.get<string>('JWT_SECRET'); // Obtener la clave secreta desde la configuración

//       // Verificar el token usando el servicio JwtService
//       const decoded = await this.jwtService.verifyAsync(token, {
//         secret: secret, // Usar la clave secreta para la verificación
//       });

//       // Si el token es válido, agregar la información decodificada al objeto req
//       req.user = decoded;

//       next(); // Continuar con la siguiente función de middleware o controlador
//     } catch (error) {
//       // Si el token no es válido o expira, redirigir al login
//       return res.redirect('/login');
//     }
//   }
// }
