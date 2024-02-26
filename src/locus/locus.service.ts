import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locus } from './models';

const LIMIT = 10;
const MAX_LIMIT = 20;

export enum LOCUS_SIDELOADING {
  LOCUS_MEMBERS = 'locusMembers',
}

@Injectable()
export class LocusService {
  constructor(
    @InjectRepository(Locus)
    private readonly locusRepository: Repository<Locus>,
  ) {}

  async getLocus({
    id,
    assemblyId,
    regionId,
    membershipStatus,
    sideloading,
    page = 0,
    limit = LIMIT,
  }: {
    id: number;
    assemblyId: string;
    regionId: number;
    membershipStatus: string;
    sideloading: LOCUS_SIDELOADING;
    page: number;
    limit: number;
  }) {
    if (limit > MAX_LIMIT) {
      limit = MAX_LIMIT;
    }

    const result = await this.locusRepository.find({
      where: { id, assemblyId, locusMembers: { regionId, membershipStatus } },
      relations: [sideloading],
      take: limit,
      skip: page * limit,
    });

    return result;
  }
}
