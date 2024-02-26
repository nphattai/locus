import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocusModule } from './locus/locus.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [LocusModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
