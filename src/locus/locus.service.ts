import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLE } from 'src/auth/auth.service';
import { In, Repository } from 'typeorm';
import { Locus } from './models';

const LIMIT = 1000;
const MAX_LIMIT = 2000;

const LIMITED_REGION = [86118093, 86696489, 88186467];

export enum LOCUS_SIDELOADING {
  LOCUS_MEMBERS = 'locusMembers',
}

@Injectable()
export class LocusService {
  logger: Logger;

  constructor(
    @InjectRepository(Locus)
    private readonly locusRepository: Repository<Locus>,
  ) {
    this.logger = new Logger(LocusService.name);
  }

  async getLocus({
    id,
    assemblyId,
    regionId,
    membershipStatus,
    sideloading,
    page = 0,
    limit = LIMIT,
    role,
  }: {
    id: number;
    assemblyId: string;
    regionId: number;
    membershipStatus: string;
    sideloading: LOCUS_SIDELOADING;
    page: number;
    limit: number;
    role: ROLE;
  }) {
    this.logger.log(
      'getLocus',
      JSON.stringify({
        id,
        assemblyId,
        regionId,
        membershipStatus,
        sideloading,
        page,
        limit,
        role,
      }),
    );

    if (limit > MAX_LIMIT) {
      limit = MAX_LIMIT;
    }

    if (
      role === ROLE.LIMITED &&
      regionId &&
      !LIMITED_REGION.includes(regionId)
    ) {
      throw new ForbiddenException('You are not allowed to access this region');
    }

    const result = await this.locusRepository.find({
      where: {
        id,
        assemblyId,
        locusMembers: {
          regionId: role === ROLE.LIMITED ? In(LIMITED_REGION) : regionId,
          membershipStatus,
        },
      },
      take: limit,
      skip: page * limit,
      relations:
        role !== ROLE.NORMAL && sideloading ? [sideloading] : undefined,
    });

    return result.map((locus) => ({
      ...locus,
      locusMembers: locus.locusMembers.map((mem) => ({
        locusMemberId: mem.id,
        regionId: mem.regionId,
        locusId: mem.locusId,
        membershipStatus: mem.membershipStatus,
      })),
    }));
  }
}
