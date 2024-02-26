import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'hh-pgsql-public.ebi.ac.uk',
      port: 5432,
      database: 'pfmegrnargs',
      username: 'reader',
      password: 'NWDMCE5xdipIjRrp',
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
