import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocusController } from './locus.controller';
import { LocusService } from './locus.service';
import { Locus, LocusMembers } from './models';

const Entities = [Locus, LocusMembers];

@Module({
  imports: [TypeOrmModule.forFeature([...Entities])],
  controllers: [LocusController],
  providers: [LocusService],
})
export class LocusModule {}
