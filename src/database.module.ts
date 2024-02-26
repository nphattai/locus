import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type:
          (configService.get<string>('TYPEORM_CONNECTION') as any) ||
          'postgres',
        port: parseInt(configService.get<string>('TYPEORM_PORT')) || 5432,
        host: configService.get<string>('TYPEORM_HOST'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        synchronize: false,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
